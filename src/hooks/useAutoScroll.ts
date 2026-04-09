import { useEffect, useRef } from 'react';

/**
 * Auto-scroll: if user is idle for `idleDelay` ms,
 * smoothly scroll the page down at a comfortable reading pace.
 * Any user interaction (touch, wheel, mouse, key) pauses and resets the timer.
 */
export function useAutoScroll(enabled: boolean, idleDelay = 4000, pxPerSecond = 60) {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const stopAutoScroll = () => {
      scrollingRef.current = false;
      isAutoScrollingRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    const startAutoScroll = () => {
      if (scrollingRef.current) return;
      scrollingRef.current = true;
      isAutoScrollingRef.current = true;
      lastTimeRef.current = 0;

      const step = (timestamp: number) => {
        if (!scrollingRef.current) return;

        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        const delta = timestamp - lastTimeRef.current;
        lastTimeRef.current = timestamp;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll) {
          stopAutoScroll();
          return;
        }

        // Time-based scrolling for consistent speed regardless of frame rate
        const px = (pxPerSecond * delta) / 1000;
        window.scrollBy(0, px);

        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const resetTimer = () => {
      // Ignore scroll events triggered by our own auto-scroll
      if (isAutoScrollingRef.current) return;

      stopAutoScroll();
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(startAutoScroll, idleDelay);
    };

    // Don't listen to 'scroll' — our own scrollBy triggers it and creates a loop.
    // Instead listen only to direct user input events.
    const events = ['touchstart', 'touchmove', 'mousemove', 'mousedown', 'keydown', 'wheel'] as const;
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));

    // Start initial timer
    timerRef.current = setTimeout(startAutoScroll, idleDelay);

    return () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [enabled, idleDelay, pxPerSecond]);
}
