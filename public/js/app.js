document.addEventListener('DOMContentLoaded', () => {
  const cfg = (window.APP_CONFIG || {});
  const flags = {
    cdnBase: cfg.CDN_BASE_URL || ""
  };

  var app = Elm.Main.init({
    node: document.getElementById('elm'),
    flags
  });

  let latestY = window.scrollY || 0;
  let ticking = false;

  const navbarLoadTime = 300;
  const sidepanelLoadTime = 300;


  const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  // On iOS, visualViewport.pageTop reflects the real visual top as the bars move.
  function readScrollTop() {
    if (isiOS && window.visualViewport && typeof window.visualViewport.pageTop === 'number') {
      return window.visualViewport.pageTop;
    }
    return window.scrollY || window.pageYOffset || 0;
  }

  function emitScroll() {
    app.ports.onScroll && app.ports.onScroll.send(readScrollTop());
  }

  // Listen to both document scroll and visualViewport changes on iOS.
  window.addEventListener('scroll', emitScroll, { passive: true });
  if (isiOS && window.visualViewport) {
    window.visualViewport.addEventListener('scroll', emitScroll, { passive: true });
    window.visualViewport.addEventListener('resize', emitScroll, { passive: true });
  }

  // Send an initial value after layout settles.
  window.requestAnimationFrame(emitScroll);


  // Copy-to-clipboard
  if (app.ports.copyToClipboard) {
    app.ports.copyToClipboard.subscribe(async (text) => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const el = document.createElement('textarea');
          el.value = text;
          el.setAttribute('readonly', '');
          el.style.position = 'absolute';
          el.style.left = '-9999px';
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }
        console.log('Copied to clipboard:', text);
      } catch (e) {
        console.warn('Clipboard failed:', e);
      }
    });
  }

  // Lock/unlock body scroll only on mobile (<768px), and keep it correct on resize
  (() => {
    if (!app.ports.setBodyScroll) return;

    let scrollYBeforeLock = 0;
    let lastLockRequested = false;   // what Elm last asked for (true=open, false=closed)
    let currentlyLocked = false;     // what we've actually applied

    // const isMobile = () => window.matchMedia('(max-width: 767.98px)').matches;

    function applyLock(shouldLock) {
      if (shouldLock === currentlyLocked) return; // no-op
      if (shouldLock) {
        scrollYBeforeLock = window.scrollY || window.pageYOffset || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollYBeforeLock}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.body.style.overscrollBehavior = 'contain';
        currentlyLocked = true;
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
        window.scrollTo(0, scrollYBeforeLock);
        currentlyLocked = false;
      }
    }

    // Elm asks to lock/unlock; only lock if mobile
    app.ports.setBodyScroll.subscribe((lock) => {
      lastLockRequested = lock;
      applyLock(lock);
    });

    // If user resizes across the md breakpoint while the menu is open/closed,
    // re-apply the correct lock state.
    window.addEventListener('resize', () => {
      applyLock(lastLockRequested);
    });
  })();

  // Smooth-scroll to an element id
  if (app.ports.scrollToId) {
    app.ports.scrollToId.subscribe((id) => {
      const run = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn('scrollToId: element not found', id);
        }
      };
      setTimeout(() => requestAnimationFrame(run), 60);
    });
  }

  // IntersectionObserver for video switch
  // const videoswitchMarker1 = document.getElementById('videoswitch-marker-1');
  // if (videoswitchMarker1) {
  //   let prevIntersecting = false;
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       const currentIntersecting = entry.isIntersecting;
  //       const rect = entry.boundingClientRect;

  //       if (!prevIntersecting && currentIntersecting) {
  //         if (rect.bottom > window.innerHeight - 100) {
  //           app.ports.videoSwitch.send(false);
  //         }
  //       } else if (prevIntersecting && !currentIntersecting) {
  //         if (rect.top >= 0) {
  //           app.ports.videoSwitch.send(true);
  //         }
  //       }

  //       prevIntersecting = currentIntersecting;
  //       console.log('Marker visibility:', entry.isIntersecting);
  //     },
  //     {
  //       root: null,
  //       threshold: 0,
  //       rootMargin: '0px'
  //     }
  //   );
  //   observer.observe(videoswitchMarker1);
  // } else {
  //   console.error('videoswitch-marker-1 element not found');
  // }

  // IntersectionObserver for navbar
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

  (function initNavbar() {
    if (!navbar) return;

    // If we're already past the marker on load, show the navbar immediately.
    let pastMarker = false;
    if (navbarMarker) {
      const r = navbarMarker.getBoundingClientRect();
      pastMarker = r.bottom <= 0; // marker is above viewport → past hero
    }

    navbar.classList.toggle('-translate-y-full', !pastMarker);
    navbar.classList.toggle('translate-y-0', pastMarker);

    setTimeout(() => {
      navbar.dataset.ready = 'true';
    }, navbarLoadTime);
  })();

  const sidepanel = document.getElementById('sidepanel');
  (function initSidepanel() {
    if (!sidepanel) return;

    setTimeout(() => {
      sidepanel.dataset.ready = 'true';
    }, sidepanelLoadTime)
  })();

  // // Video autoplay and switching
  // const video = document.getElementById('myVideo');
  // if (video) {
  //   video.play().catch(error => console.error('Auto-play failed:', error.message));
  //   video.playbackRate = 0.9;
  //   app.ports.changeVideo.subscribe(newSrc => {
  //     const normalizedSrc = new URL(newSrc, window.location.origin).href;
  //     if (video.src !== normalizedSrc) {
  //       console.log('Changing video to:', newSrc);
  //       video.src = newSrc;
  //       video.load();
  //       video.play().catch(error => {
  //         console.error('Video play failed:', error.message);
  //         setTimeout(() => {
  //           video.play().catch(e => console.error('Retry play failed:', e.message));
  //         }, 500);
  //       });
  //     }
  //   });
  // }



  // SEPARATE THESE INTO APP SUBSCRIPTION FILES


  // ==== Marker-based background video switcher (bottom-of-viewport trigger) ====
  // Put one marker *between* each pair of video banners.
  // Example page order:
  // [Video Banner 1] [Content 1] [#videoswitch-marker-1] [Video Banner 2] [Content 2] [#videoswitch-marker-2] [Video Banner 3]

  // // 1) Declare your video chain top→bottom
  // const VIDEO_CHAIN = ['#bg-hero', '#bg-discography', '#bg-metrics', '#bg-gallery']; // add/remove as needed

  // // 2) Declare your marker ids in order they appear top→bottom (one less than videos)
  // const MARKER_IDS  = ['#videoswitch-marker-1', '#videoswitch-marker-2', '#videoswitch-marker-3']; // add/remove to match

  // // Cache videos (ignore missing so you can stage gradually)
  // const videoEls = VIDEO_CHAIN.map(sel => document.querySelector(sel)).filter(Boolean);

  // // Ensure each video has opacity transition in markup:
  // // class="absolute inset-0 w-full h-screen object-cover opacity-0 pointer-events-none transition-opacity duration-300"
  // function prewarm(v) {
  //   if (!v) return;
  //   v.muted = true; v.loop = true; v.playsInline = true;
  //   try { v.playbackRate = 0.9; } catch (_) {}
  //   v.play().catch(() => {}); // ignore autoplay rejections (muted should pass)
  // }
  // videoEls.forEach(prewarm);

  // let activeIndex = null;
  // function showIndex(i) {
  //   if (i === activeIndex || !videoEls[i]) return;
  //   const next = videoEls[i];
  //   const prev = activeIndex != null ? videoEls[activeIndex] : null;

  //   // Turn ON new first → no gray flash
  //   next.classList.remove('opacity-0', 'pointer-events-none');
  //   next.classList.add('opacity-100');
  //   next.play?.().catch(() => {});

  //   // Hide old on next paint
  //   if (prev && prev !== next) {
  //     requestAnimationFrame(() => {
  //       prev.classList.add('opacity-0', 'pointer-events-none');
  //       prev.classList.remove('opacity-100');
  //     });
  //   }
  //   activeIndex = i;
  // }

  // // Compute initial video for current scroll position.
  // // Logic: count how many markers the bottom-of-viewport has passed.
  // function pickInitialIndex() {
  //   let passed = -1;
  //   for (let k = 0; k < MARKER_IDS.length; k++) {
  //     const el = document.querySelector(MARKER_IDS[k]);
  //     if (!el) continue;
  //     const top = el.getBoundingClientRect().top;
  //     if (top <= window.innerHeight) passed = k; // bottom has crossed this marker
  //   }
  //   // before first marker → index 0; after Nth marker → index N
  //   return Math.min(passed + 1, VIDEO_CHAIN.length - 1);
  // }

  // // Set initial state on load (handles reload at deep scroll)
  // showIndex(pickInitialIndex());

  // // Direction-aware IntersectionObserver.
  // // We trigger exactly when the bottom-of-viewport hits a marker by moving the
  // // observer’s bottom edge up by 100% (rootMargin bottom = -100%).
  // const markers = MARKER_IDS
  //       .map((sel, i) => {
  //         const el = document.querySelector(sel);
  //         // marker i sits between video i (above) and video i+1 (below)
  //         return el ? { el, aboveIndex: i, belowIndex: i + 1 } : null;
  //       })
  //       .filter(Boolean);

  // let lastScrollY = window.scrollY || 0;

  // const io = new IntersectionObserver((entries) => {
  //   const nowY = window.scrollY || 0;
  //   const scrollingDown = nowY > lastScrollY;
  //   lastScrollY = nowY;

  //   for (const entry of entries) {
  //     if (!entry.isIntersecting) continue; // we care about the instant of crossing
  //     const m = markers.find(x => x.el === entry.target);
  //     if (!m) continue;
  //     showIndex(scrollingDown ? m.belowIndex : m.aboveIndex);
  //   }
  // }, { root: null, threshold: 0, rootMargin: '0px 0px -100% 0px' });

  // markers.forEach(m => io.observe(m.el));

  // // Keep it correct on resize (re-evaluate which video should show)
  // window.addEventListener('resize', () => {
  //   showIndex(pickInitialIndex());
  // });



  //
  // Dual-video background: pre-play both, swap visibility instantly w/ fade
  // const videoA = document.getElementById('video-herobanner');
  // const videoB = document.getElementById('video-discography');

  // function prewarm(v) {
  //   if (!v) return;
  //   v.muted = true;
  //   v.loop = true;
  //   v.playsInline = true;
  //   // keep same vibe as before
  //   try { v.playbackRate = 0.9; } catch (_) {}
  //   // start playback; ignore promise rejections on Safari/Brave nuance
  //   v.play().catch(e => console.warn('Banner video play failed:', e?.message || e));
  // }

  // // Start both as soon as possible
  // prewarm(videoA);
  // prewarm(videoB);

  // // Helpers to fade between tracks (show new first → hide old)
  // function showVideo(el) {
  //   if (!el) return;
  //   el.classList.remove('opacity-0', 'pointer-events-none');
  //   el.classList.add('opacity-100');
  //   // nudge playback in case a browser paused it
  //   el.play().catch(() => {});
  // }
  // function hideVideo(el) {
  //   if (!el) return;
  //   el.classList.add('opacity-0', 'pointer-events-none');
  //   el.classList.remove('opacity-100');
  // }

  // function swapTo(which) {
  //   const show = which === 'B' ? videoB : videoA;
  //   const hide = which === 'B' ? videoA : videoB;
  //   if (!show || !hide) return;

  //   // Turn ON new first to avoid any gray flash…
  //   showVideo(show);
  //   // …then hide old on next paint so there’s always something visible
  //   requestAnimationFrame(() => hideVideo(hide));
  // }

  // // Listen to Elm's changeVideo port and map the requested src → A/B
  // if (app.ports.changeVideo) {
  //   app.ports.changeVideo.subscribe((newSrc) => {
  //     // heuristic: if the path contains "clid" use B, otherwise A
  //     const use = /clid/i.test(newSrc) ? 'B' : 'A';
  //     console.log('choosing to use', use);
  //     swapTo(use);
  //   });
  // }


  // Send the initial scroll position once so Elm can pick correct background on load
  requestAnimationFrame(() => {
    if (app.ports.onScroll) {
      app.ports.onScroll.send(window.scrollY || 0);
    }
  });

  // Toggle which static <video> is visible (no playback code here)
  if (app.ports.setActiveBg) {
    app.ports.setActiveBg.subscribe((idx) => {
      const vids = document.querySelectorAll('#bg-video-stack .bg-video');
      console.log('setActiveBg with vids:', vids);
      // Turn ON the new one first…
      const next = vids[idx];
      if (!next) return;
      next.classList.remove('opacity-0');
      next.classList.add('opacity-100');

      // …then hide the others on the next paint (prevents any gray flash)
      requestAnimationFrame(() => {
        vids.forEach((v, i) => {
          if (i !== idx) {
            v.classList.add('opacity-0');
            v.classList.remove('opacity-100');
          }
        });
      });
    });
  }

  // END SEPARATE THESE INTO APP SUBSCRIPTION FILES




  // Audio controls and Web Audio API
  const audio = document.getElementById('audioPlayer');
  let audioContext, source, analyser;
  if (audio) {
    audio.crossOrigin = 'anonymous';
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    app.ports.playAudio.subscribe(async ([id, expectedSrc]) => {
      if (!audio || audio.id !== id) {
        app.ports.audioError.send('Audio element not found');
        return;
      }
      if (audioContext && audioContext.state === 'suspended') {
        console.log('context is suspended')
        try { await audioContext.resume(); } catch (e) {
          console.error('AudioContext resume failed:', e);
        }
      }
      audio.crossOrigin = 'anonymous';
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

    app.ports.seekAudio.subscribe(async ([id, time]) => {
      const el = document.getElementById(id);
      if (!el) {
        app.ports.audioError.send('Audio element not found');
        return;
      }

      // Clamp to [0, duration]
      const duration = Number.isFinite(el.duration) ? el.duration : Infinity;
      const clamped = Math.max(0, Math.min(time, duration));
      const wasPaused = el.paused;

      try {
        el.currentTime = clamped;
      } catch (e) {
        console.error('Seek failed:', e);
      }

      // If it was playing, ensure it keeps playing from the new position
      if (!wasPaused) {
        try {
          if (audioContext && audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          await el.play();
        } catch (e) {
          console.error('Resume after seek failed:', e);
        }
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
    const bars = 10;                 // ← was 60
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
