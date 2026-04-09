import { useEffect, useRef } from 'react';

/**
 * Auto-scroll: if user is idle (no scroll/touch/mouse) for `idleDelay` ms,
 * slowly scroll the page down. Any user interaction pauses and resets the timer.
 */
export function useAutoScroll(enabled: boolean, idleDelay = 4000, speed = 0.8) {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const stopAutoScroll = () => {
      scrollingRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    const startAutoScroll = () => {
      if (scrollingRef.current) return;
      scrollingRef.current = true;

      const step = () => {
        if (!scrollingRef.current) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll) {
          scrollingRef.current = false;
          return;
        }
        window.scrollBy(0, speed);
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const resetTimer = () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(startAutoScroll, idleDelay);
    };

    const events = ['scroll', 'touchstart', 'touchmove', 'mousemove', 'mousedown', 'keydown', 'wheel'] as const;
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));

    // Start initial timer
    timerRef.current = setTimeout(startAutoScroll, idleDelay);

    return () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [enabled, idleDelay, speed]);
}
