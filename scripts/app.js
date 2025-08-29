document.addEventListener('DOMContentLoaded', () => {
  var app = Elm.Main.init({ node: document.getElementById('elm') });
  let scrollTimeout;
  const debounceScroll = (callback, wait) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(callback, wait);
  };
  window.addEventListener('scroll', () => {
    debounceScroll(() => {
      app.ports.onScroll.send(window.scrollY);
    }, 100);
  });

  // IntersectionObserver for video switch
  const marker = document.getElementById('marker');
  if (marker) {
    let prevIntersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentIntersecting = entry.isIntersecting;
        const rect = entry.boundingClientRect;

        if (!prevIntersecting && currentIntersecting) {
          if (rect.bottom > window.innerHeight - 100) {
            app.ports.videoSwitch.send(false);
          }
        } else if (prevIntersecting && !currentIntersecting) {
          if (rect.top >= 0) {
            app.ports.videoSwitch.send(true);
          }
        }

        prevIntersecting = currentIntersecting;
        console.log('Marker visibility:', entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px'
      }
    );
    observer.observe(marker);
  } else {
    console.error('Marker element not found');
  }

  // Video autoplay and switching
  const video = document.getElementById('myVideo');
  if (video) {
    video.play().catch(error => console.error('Auto-play failed:', error.message));
    video.playbackRate = 0.9;
    app.ports.changeVideo.subscribe(newSrc => {
      const normalizedSrc = new URL(newSrc, window.location.origin).href;
      if (video.src !== normalizedSrc) {
        console.log('Changing video to:', newSrc);
        video.src = newSrc;
        video.load();
        video.play().catch(error => {
          console.error('Video play failed:', error.message);
          setTimeout(() => {
            video.play().catch(e => console.error('Retry play failed:', e.message));
          }, 500);
        });
      }
    });
  }

  // Audio controls and Web Audio API
  const audio = document.getElementById('audioPlayer');
  let audioContext, source, analyser;
  if (audio) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    app.ports.playAudio.subscribe(([id, expectedSrc]) => {
      if (!audio || audio.id !== id) {
        app.ports.audioError.send('Audio element not found');
        return;
      }
      const normalizedExpectedSrc = new URL(expectedSrc, window.location.origin).href;
      if (audio.src !== normalizedExpectedSrc) {
        audio.src = expectedSrc;
      }
      const playAudio = () => {
        audio.play().catch(error => {
          console.error('Audio play failed:', error.message);
          app.ports.audioError.send(error.message);
        });
      };
      if (audio.readyState >= 1) {
        playAudio();
      } else {
        const onLoadedMetadata = () => {
          audio.removeEventListener('loadedmetadata', onLoadedMetadata);
          playAudio();
        };
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.load();
      }
    });
    app.ports.pauseAudio.subscribe(() => {
      audio.pause();
    });
    app.ports.seekAudio.subscribe(([id, time]) => {
      if (audio && audio.id === id) {
        audio.currentTime = time;
      }
    });
    audio.addEventListener('timeupdate', () => {
      app.ports.timeUpdate.send([audio.currentTime, audio.duration || 0]);
    });
    audio.addEventListener('ended', () => {
      app.ports.songEnded.send(null);
    });
    audio.addEventListener('error', () => {
      const errorMessage = audio.error ? audio.error.message : 'Unknown audio error';
      app.ports.audioError.send(errorMessage);
    });
  }

  // Waveform with Web Audio API
  const canvas = document.getElementById('waveform');
  const ctx = canvas.getContext('2d');
  if (canvas && ctx && analyser) {
    const bars = 60;
    const barWidth = canvas.width / bars;
    const barHeight = canvas.height;
    const sendFrequencyData = () => {
      if (audio && !audio.paused) {
        const freqData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freqData);
        app.ports.frequencyData.send(Array.from(freqData));
      }
      requestAnimationFrame(sendFrequencyData);
    };
    sendFrequencyData();
    app.ports.drawWaveform.subscribe(barHeights => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      barHeights.forEach((height, i) => {
        ctx.fillRect(i * barWidth, (barHeight - height) / 2, barWidth - 2, height);
      });
    });
    app.ports.updateWaveform.subscribe((isPlaying) => {
      if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < bars; i++) {
          const height = barHeight * 0.25;
          ctx.fillRect(i * barWidth, (barHeight - height) / 2, barWidth - 2, height);
        }
      }
    });
  }

  let masonry;
  let resizeTimeout;

  app.ports.sendImages.subscribe((images) => {
  const grid = document.getElementById('masonry-grid');
  grid.innerHTML = ''; // Clear existing content
  const imageElements = [];

  images.forEach(image => {
    const div = document.createElement('div');
    div.className = 'overflow-hidden rounded-lg';
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.style.objectFit = 'cover';

    // Get image dimensions and calculate based on 256px multiples
    const imgElement = new Image();
    imgElement.src = image.src;
    imgElement.onload = () => {
      const originalWidth = imgElement.width;
      const originalHeight = imgElement.height;
      const baseDimension = 256;
      const verticalGap = 10; // Gap to subtract from image height

      // Calculate dimensions in 256px multiples based on aspect ratio
      const aspectRatio = originalWidth / originalHeight;
      let widthInUnits = Math.ceil(originalWidth / baseDimension) * baseDimension;
      let heightInUnits = Math.ceil(originalHeight / baseDimension) * baseDimension;

      // Adjust to maintain aspect ratio within 256px multiples
      if (widthInUnits / heightInUnits !== aspectRatio) {
        if (widthInUnits > heightInUnits * aspectRatio) {
          widthInUnits = Math.round(heightInUnits * aspectRatio / baseDimension) * baseDimension;
        } else {
          heightInUnits = Math.round(widthInUnits / aspectRatio / baseDimension) * baseDimension;
        }
      }

      // Set styles
      div.style.width = `${widthInUnits}px`;
      div.style.height = `${heightInUnits}px`;
      img.style.width = `${widthInUnits}px`;
      img.style.height = `${heightInUnits - verticalGap}px`; // Subtract gap from image height

      div.appendChild(img);
      grid.appendChild(div);
      imageElements.push(img); // Track loaded images

      // Trigger layout when all images are loaded
      if (imageElements.length === images.length) {
        imagesLoaded(grid, () => {
          if (masonry) masonry.layout();
        });
      }
    };
  });

  masonry = new Masonry(grid, {
    itemSelector: 'div',
    columnWidth: 'div', // Dynamic based on item width
    gutter: 10,
    fitWidth: true
  });
});

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (masonry) {
        masonry.layout();
      }
    }, 100);
  });
});
