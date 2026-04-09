import { useEffect, useRef, useCallback } from 'react';

/**
 * Ultra-smooth auto-scroll — Apple-grade fluidity.
 *
 * Key optimisations:
 * 1. Section positions are cached once at start (no per-frame DOM reads)
 * 2. Uses window.scrollTo(0, y) but with a rock-steady rAF loop
 *    that never does any DOM measurement inside the hot path
 * 3. Delta is clamped to 33ms so frame drops don't cause jumps
 * 4. Eased resume after section pauses (cubic ease-in) to avoid jarring starts
 */

const SECTION_IDS = ['hero', 'countdown', 'couple', 'events', 'venue', 'blessings'];

interface SectionBound {
  id: string;
  top: number;
  bottom: number;
}

export function useAutoScroll(
  enabled: boolean,
  idleDelay = 4500,
  pxPerSecond = 28,
  sectionPause = 3500,
) {
  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const lastTimeRef = useRef(0);
  const posRef = useRef(0);
  const pausedUntilRef = useRef(0);
  const visitedRef = useRef<Set<string>>(new Set());
  const sectionsRef = useRef<SectionBound[]>([]);
  const maxScrollRef = useRef(0);
  // For eased resume after pause
  const resumeStartRef = useRef(0);
  const EASE_DURATION = 600; // ms to ramp back to full speed

  const stopAutoScroll = useCallback(() => {
    scrollingRef.current = false;
    isAutoScrollingRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  /** Cache all section positions — call once before starting scroll */
  const cacheSections = useCallback(() => {
    const bounds: SectionBound[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      bounds.push({ id, top, bottom: top + el.offsetHeight });
    }
    sectionsRef.current = bounds;
    maxScrollRef.current = document.documentElement.scrollHeight - window.innerHeight;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const startAutoScroll = () => {
      if (scrollingRef.current) return;

      // Cache layout info ONCE, outside the rAF loop
      cacheSections();

      scrollingRef.current = true;
      isAutoScrollingRef.current = true;
      lastTimeRef.current = 0;
      posRef.current = window.scrollY;
      pausedUntilRef.current = 0;
      resumeStartRef.current = 0;
      visitedRef.current = new Set();

      // Mark current section visited
      const mid = posRef.current + window.innerHeight * 0.5;
      for (const s of sectionsRef.current) {
        if (mid >= s.top && mid <= s.bottom) {
          visitedRef.current.add(s.id);
          break;
        }
      }

      const step = (now: number) => {
        if (!scrollingRef.current) return;

        // First frame — just record time
        if (!lastTimeRef.current) {
          lastTimeRef.current = now;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        // Section pause — keep loop alive but don't scroll
        if (now < pausedUntilRef.current) {
          lastTimeRef.current = now;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        // If we just exited a pause, start easing in
        if (resumeStartRef.current === 0 && pausedUntilRef.current > 0 && now >= pausedUntilRef.current) {
          resumeStartRef.current = now;
        }

        const rawDelta = now - lastTimeRef.current;
        // Clamp to ~30fps floor — prevents jumps after tab-switch / long frame
        const delta = Math.min(rawDelta, 33);
        lastTimeRef.current = now;

        // End check
        if (posRef.current >= maxScrollRef.current) {
          stopAutoScroll();
          return;
        }

        // Check new section entry (uses cached bounds, zero DOM reads)
        const viewMid = posRef.current + window.innerHeight * 0.5;
        for (const s of sectionsRef.current) {
          if (viewMid >= s.top && viewMid <= s.bottom) {
            if (!visitedRef.current.has(s.id)) {
              visitedRef.current.add(s.id);
              pausedUntilRef.current = now + sectionPause;
              resumeStartRef.current = 0; // reset ease
              lastTimeRef.current = now;
              rafRef.current = requestAnimationFrame(step);
              return;
            }
            break;
          }
        }

        // Compute speed with ease-in after pause
        let speedMultiplier = 1;
        if (resumeStartRef.current > 0) {
          const elapsed = now - resumeStartRef.current;
          if (elapsed < EASE_DURATION) {
            // Cubic ease-in: starts very slow, ramps to full
            const t = elapsed / EASE_DURATION;
            speedMultiplier = t * t * t;
          } else {
            resumeStartRef.current = 0; // ease complete
          }
        }

        const advance = (pxPerSecond * delta * speedMultiplier) / 1000;
        posRef.current = Math.min(posRef.current + advance, maxScrollRef.current);

        // Single scrollTo — the only DOM write per frame
        window.scrollTo(0, posRef.current);

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const handleUserInteraction = () => {
      if (isAutoScrollingRef.current) {
        stopAutoScroll();
      }
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(startAutoScroll, idleDelay);
    };

    const events = ['touchstart', 'touchmove', 'touchend', 'mousemove', 'mousedown', 'keydown', 'wheel'] as const;
    events.forEach(e => window.addEventListener(e, handleUserInteraction, { passive: true }));

    // Initial idle timer
    timerRef.current = setTimeout(startAutoScroll, idleDelay);

    return () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, handleUserInteraction));
    };
  }, [enabled, idleDelay, pxPerSecond, sectionPause, stopAutoScroll, cacheSections]);
}
