import { useEffect, useRef } from 'react';

/**
 * Ultra-smooth auto-scroll inspired by Apple's butter-smooth animations.
 * Uses sub-pixel accumulation and requestAnimationFrame for 120Hz+ fluidity.
 */
export function useAutoScroll(enabled: boolean, idleDelay = 4000, pxPerSecond = 55) {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const lastTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

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
      accumulatedRef.current = window.scrollY;

      const step = (timestamp: number) => {
        if (!scrollingRef.current) return;

        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        const delta = Math.min(timestamp - lastTimeRef.current, 32); // cap at ~30fps min to avoid jumps
        lastTimeRef.current = timestamp;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (accumulatedRef.current >= maxScroll) {
          stopAutoScroll();
          return;
        }

        // Sub-pixel accumulation for butter-smooth scrolling
        accumulatedRef.current += (pxPerSecond * delta) / 1000;
        
        // Use scrollTo with the precise accumulated position
        window.scrollTo({
          top: accumulatedRef.current,
          behavior: 'instant' as ScrollBehavior,
        });

        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const resetTimer = () => {
      if (isAutoScrollingRef.current) return;
      stopAutoScroll();
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(startAutoScroll, idleDelay);
    };

    const events = ['touchstart', 'touchmove', 'mousemove', 'mousedown', 'keydown', 'wheel'] as const;
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));

    timerRef.current = setTimeout(startAutoScroll, idleDelay);

    return () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [enabled, idleDelay, pxPerSecond]);
}
