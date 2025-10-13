document.addEventListener('DOMContentLoaded', () => {
  var app = Elm.Main.init({ node: document.getElementById('elm') });

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


  // function onScrollRAF() {
  //   latestY = window.scrollY || window.pageYOffset || 0;
  //   if (!ticking) {
  //     requestAnimationFrame(() => {
  //       app.ports.onScroll.send(latestY);
  //       ticking = false;
  //     });
  //     ticking = true;
  //   }
  // }
  // window.addEventListener('scroll', onScrollRAF, { passive: true });



  // Smoothly scroll the horizontal video reel by ~one viewport width
  // ===== DEBUGGED & HARDENED: reel scroll port =====
  console.log('test 1');
  if (app.ports.scrollReel) {
    console.info('[reel] subscribing to scrollReel');
    app.ports.scrollReel.subscribe(payload => {
      try {
        console.groupCollapsed('[reel] scrollReel fired', payload);
        // Elm sends tuples as JS arrays: [id, dir]
        const [id, dirRaw] = Array.isArray(payload) ? payload : [payload?.[0], payload?.[1]];
        const dir = (dirRaw || 1) >= 0 ? 1 : -1;

        const el = document.getElementById(id);
        if (!el) {
          console.warn('[reel] element not found:', id);
          console.groupEnd();
          return;
        }

        // sanity: confirm THIS element actually scrolls horizontally
        const before = {
          scrollLeft: el.scrollLeft,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          canScroll: el.scrollWidth > el.clientWidth
        };
        console.log('[reel] before:', before);

        if (!before.canScroll) {
          console.warn('[reel] container cannot scroll (scrollWidth <= clientWidth). ' +
                       'Is the inner track wider than the reel?');
        }

        const delta = Math.round(el.clientWidth * 0.85) * dir;
        const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + delta));
        console.log('[reel] dir:', dir, 'delta:', delta, 'target:', target);

        const supportsSmooth =
              'scrollBehavior' in document.documentElement.style &&
              typeof el.scrollBy === 'function';

        // 1) Try element.scrollBy (with smooth) — most reliable on elements
        if (supportsSmooth) {
          console.log('[reel] trying el.scrollBy({behavior:"smooth"})');
          el.scrollBy({ left: delta, behavior: 'smooth' });
          // verify movement a tick later
          setTimeout(() => {
            console.log('[reel] after scrollBy:', { scrollLeft: el.scrollLeft });
            // If nothing changed, drop to fallback tween
            if (Math.abs(el.scrollLeft - before.scrollLeft) < 2 && delta !== 0) {
              console.log('[reel] scrollBy had no effect — falling back to RAF tween');
              rafTween(el, target, 280);
            }
            console.groupEnd();
          }, 120);
          return;
        }

        // 2) Fallback: scrollTo (no smooth support here)
        if (typeof el.scrollTo === 'function') {
          console.log('[reel] trying el.scrollTo(left=target)');
          el.scrollTo({ left: target });
          setTimeout(() => {
            console.log('[reel] after scrollTo:', { scrollLeft: el.scrollLeft });
            if (Math.abs(el.scrollLeft - before.scrollLeft) < 2 && delta !== 0) {
              console.log('[reel] scrollTo had no effect — falling back to RAF tween');
              rafTween(el, target, 280);
            }
            console.groupEnd();
          }, 60);
          return;
        }

        // 3) Last resort: directly set scrollLeft
        console.log('[reel] setting el.scrollLeft directly to target');
        el.scrollLeft = target;
        setTimeout(() => {
          console.log('[reel] after direct set:', { scrollLeft: el.scrollLeft });
          console.groupEnd();
        }, 60);
      } catch (e) {
        console.error('[reel] handler error:', e);
        console.groupEnd?.();
      }
    });

    function rafTween(el, targetLeft, durationMs) {
      const startLeft = el.scrollLeft;
      const change = targetLeft - startLeft;
      if (change === 0) return;

      const t0 = performance.now();
      const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

      function step(now) {
        const t = Math.min(1, (now - t0) / durationMs);
        el.scrollLeft = startLeft + change * ease(t);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }


  // if (app.ports.scrollReel) {
  //   app.ports.scrollReel.subscribe(([id, dir]) => {
  //     const el = document.getElementById(id);
  //     if (!el) return;

  //     const amount = Math.round(el.clientWidth * 0.85) * (dir || 1);

  //     // Prefer smooth scroll; fall back if needed
  //     try {
  //       el.scrollBy({ left: amount, behavior: 'smooth' });
  //     } catch {
  //       el.scrollLeft += amount;
  //     }
  //   });
  // }


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

