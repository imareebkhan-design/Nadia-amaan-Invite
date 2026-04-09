import { useEffect, useRef, useCallback } from 'react';

/**
 * Ultra-smooth auto-scroll with section-aware pausing.
 * 
 * - Starts after `idleDelay` ms of no user interaction
 * - Pauses `sectionPause` ms when a new section enters the viewport
 * - Any touch/wheel/mouse/key stops auto-scroll; resumes after `idleDelay` of inactivity
 * - Uses sub-pixel accumulation for Apple-level smoothness
 */

const SECTION_IDS = ['hero', 'countdown', 'couple', 'events', 'venue', 'rsvp'];

export function useAutoScroll(
  enabled: boolean,
  idleDelay = 4500,
  pxPerSecond = 28,
  sectionPause = 3500,
) {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const lastTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const pausedUntilRef = useRef<number>(0);
  const visitedSectionsRef = useRef<Set<string>>(new Set());

  const stopAutoScroll = useCallback(() => {
    scrollingRef.current = false;
    isAutoScrollingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const checkSectionPause = useCallback((scrollY: number) => {
    const viewportMid = scrollY + window.innerHeight * 0.5;

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      // Check if the viewport center is within this section
      if (viewportMid >= top && viewportMid <= bottom) {
        if (!visitedSectionsRef.current.has(id)) {
          visitedSectionsRef.current.add(id);
          return true; // Pause for this new section
        }
        break;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const startAutoScroll = () => {
      if (scrollingRef.current) return;
      scrollingRef.current = true;
      isAutoScrollingRef.current = true;
      lastTimeRef.current = 0;
      accumulatedRef.current = window.scrollY;
      visitedSectionsRef.current = new Set();

      // Mark the current section as already visited so we don't pause immediately
      const viewportMid = window.scrollY + window.innerHeight * 0.5;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (viewportMid >= el.offsetTop && viewportMid <= el.offsetTop + el.offsetHeight) {
          visitedSectionsRef.current.add(id);
          break;
        }
      }

      const step = (timestamp: number) => {
        if (!scrollingRef.current) return;

        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        // If we're in a section pause, skip scrolling but keep the loop alive
        if (timestamp < pausedUntilRef.current) {
          lastTimeRef.current = timestamp;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        const delta = Math.min(timestamp - lastTimeRef.current, 32);
        lastTimeRef.current = timestamp;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (accumulatedRef.current >= maxScroll) {
          stopAutoScroll();
          return;
        }

        // Check if we've entered a new section
        if (checkSectionPause(accumulatedRef.current)) {
          pausedUntilRef.current = timestamp + sectionPause;
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        // Sub-pixel smooth scrolling
        accumulatedRef.current += (pxPerSecond * delta) / 1000;

        // Use window.scrollTo with plain number — maximum mobile compatibility
        window.scrollTo(0, accumulatedRef.current);

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

    // Only direct user input events — not 'scroll' (our own scrollTo triggers it)
    const events = ['touchstart', 'touchmove', 'touchend', 'mousemove', 'mousedown', 'keydown', 'wheel'] as const;

    // For touch: immediately stop auto-scroll
    const handleUserInteraction = () => {
      if (isAutoScrollingRef.current) {
        stopAutoScroll();
      }
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(startAutoScroll, idleDelay);
    };

    events.forEach(e => window.addEventListener(e, handleUserInteraction, { passive: true }));

    // Start initial idle timer
    timerRef.current = setTimeout(startAutoScroll, idleDelay);

    return () => {
      stopAutoScroll();
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, handleUserInteraction));
    };
  }, [enabled, idleDelay, pxPerSecond, sectionPause, stopAutoScroll, checkSectionPause]);
}
