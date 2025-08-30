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

  // NEW: IntersectionObserver for navbar
  const navbarMarker = document.getElementById('navbar-marker');
  const navbar = document.getElementById('navbar');
  if (navbarMarker && navbar) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Marker is in view (hero banner still visible), slide navbar up
          navbar.classList.add('-translate-y-full');
          navbar.classList.remove('translate-y-0');
        } else {
          // Marker is out of view (past hero banner), slide navbar down
          navbar.classList.remove('-translate-y-full');
          navbar.classList.add('translate-y-0');
        }
      },
      {
        root: null,
        threshold: 0, // Trigger when any part of the marker is out of view
        rootMargin: '-1px 0px 0px 0px' // Trigger just before the marker leaves the top
      }
    );
    observer.observe(navbarMarker);
  } else {
    console.error('Navbar marker or navbar element not found');
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
});



// document.addEventListener('DOMContentLoaded', () => {
//   var app = Elm.Main.init({ node: document.getElementById('elm') });
//   let scrollTimeout;
//   const debounceScroll = (callback, wait) => {
//     clearTimeout(scrollTimeout);
//     scrollTimeout = setTimeout(callback, wait);
//   };
//   window.addEventListener('scroll', () => {
//     debounceScroll(() => {
//       app.ports.onScroll.send(window.scrollY);
//     }, 100);
//   });

//   // IntersectionObserver for video switch
//   const marker = document.getElementById('marker');
//   if (marker) {
//     let prevIntersecting = false;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         const currentIntersecting = entry.isIntersecting;
//         const rect = entry.boundingClientRect;

//         if (!prevIntersecting && currentIntersecting) {
//           if (rect.bottom > window.innerHeight - 100) {
//             app.ports.videoSwitch.send(false);
//           }
//         } else if (prevIntersecting && !currentIntersecting) {
//           if (rect.top >= 0) {
//             app.ports.videoSwitch.send(true);
//           }
//         }

//         prevIntersecting = currentIntersecting;
//         console.log('Marker visibility:', entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0,
//         rootMargin: '0px'
//       }
//     );
//     observer.observe(marker);
//   } else {
//     console.error('Marker element not found');
//   }

//   // Video autoplay and switching
//   const video = document.getElementById('myVideo');
//   if (video) {
//     video.play().catch(error => console.error('Auto-play failed:', error.message));
//     video.playbackRate = 0.9;
//     app.ports.changeVideo.subscribe(newSrc => {
//       const normalizedSrc = new URL(newSrc, window.location.origin).href;
//       if (video.src !== normalizedSrc) {
//         console.log('Changing video to:', newSrc);
//         video.src = newSrc;
//         video.load();
//         video.play().catch(error => {
//           console.error('Video play failed:', error.message);
//           setTimeout(() => {
//             video.play().catch(e => console.error('Retry play failed:', e.message));
//           }, 500);
//         });
//       }
//     });
//   }

//   // Audio controls and Web Audio API
//   const audio = document.getElementById('audioPlayer');
//   let audioContext, source, analyser;
//   if (audio) {
//     audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     source = audioContext.createMediaElementSource(audio);
//     analyser = audioContext.createAnalyser();
//     analyser.fftSize = 2048;
//     source.connect(analyser);
//     analyser.connect(audioContext.destination);
//     app.ports.playAudio.subscribe(([id, expectedSrc]) => {
//       if (!audio || audio.id !== id) {
//         app.ports.audioError.send('Audio element not found');
//         return;
//       }
//       const normalizedExpectedSrc = new URL(expectedSrc, window.location.origin).href;
//       if (audio.src !== normalizedExpectedSrc) {
//         audio.src = expectedSrc;
//       }
//       const playAudio = () => {
//         audio.play().catch(error => {
//           console.error('Audio play failed:', error.message);
//           app.ports.audioError.send(error.message);
//         });
//       };
//       if (audio.readyState >= 1) {
//         playAudio();
//       } else {
//         const onLoadedMetadata = () => {
//           audio.removeEventListener('loadedmetadata', onLoadedMetadata);
//           playAudio();
//         };
//         audio.addEventListener('loadedmetadata', onLoadedMetadata);
//         audio.load();
//       }
//     });
//     app.ports.pauseAudio.subscribe(() => {
//       audio.pause();
//     });
//     app.ports.seekAudio.subscribe(([id, time]) => {
//       if (audio && audio.id === id) {
//         audio.currentTime = time;
//       }
//     });
//     audio.addEventListener('timeupdate', () => {
//       app.ports.timeUpdate.send([audio.currentTime, audio.duration || 0]);
//     });
//     audio.addEventListener('ended', () => {
//       app.ports.songEnded.send(null);
//     });
//     audio.addEventListener('error', () => {
//       const errorMessage = audio.error ? audio.error.message : 'Unknown audio error';
//       app.ports.audioError.send(errorMessage);
//     });
//   }

//   // Waveform with Web Audio API
//   const canvas = document.getElementById('waveform');
//   const ctx = canvas.getContext('2d');
//   if (canvas && ctx && analyser) {
//     const bars = 60;
//     const barWidth = canvas.width / bars;
//     const barHeight = canvas.height;
//     const sendFrequencyData = () => {
//       if (audio && !audio.paused) {
//         const freqData = new Uint8Array(analyser.frequencyBinCount);
//         analyser.getByteFrequencyData(freqData);
//         app.ports.frequencyData.send(Array.from(freqData));
//       }
//       requestAnimationFrame(sendFrequencyData);
//     };
//     sendFrequencyData();
//     app.ports.drawWaveform.subscribe(barHeights => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = '#ffffff';
//       barHeights.forEach((height, i) => {
//         ctx.fillRect(i * barWidth, (barHeight - height) / 2, barWidth - 2, height);
//       });
//     });
//     app.ports.updateWaveform.subscribe((isPlaying) => {
//       if (!isPlaying) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = '#ffffff';
//         for (let i = 0; i < bars; i++) {
//           const height = barHeight * 0.25;
//           ctx.fillRect(i * barWidth, (barHeight - height) / 2, barWidth - 2, height);
//         }
//       }
//     });
//   }
// });
