/**
 * Premium smooth scroll — scrolls to a target element over a given duration
 * using an easeInOutCubic curve.
 * Returns a cancel function.
 */
export function smoothScrollTo(
  targetId: string,
  duration = 3000
): () => void {
  const target = document.getElementById(targetId);
  if (!target) return () => {};

  const start = window.scrollY;
  const targetRect = target.getBoundingClientRect();
  const end = start + targetRect.top;
  const distance = end - start;
  let startTime: number | null = null;
  let rafId: number;
  let cancelled = false;

  const ease = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (cancelled) return;
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * ease(progress));

    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    }
  };

  rafId = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/**
 * Smart auto-scroll controller.
 * - Starts slow continuous scroll after `idleDelay` ms of no user interaction
 * - Pauses for `sectionPause` ms when reaching a new section
 * - Any user interaction (wheel/touch/key) cancels and resets the idle timer
 * - Call the returned cleanup function to tear everything down
 */
export function createAutoScrollController(options: {
  /** Section element IDs in order */
  sectionIds: string[];
  /** Scroll speed in pixels per second */
  speed?: number;
  /** Ms of inactivity before auto-scroll starts (first time) */
  initialIdleDelay?: number;
  /** Ms of inactivity before auto-scroll resumes after user stops */
  resumeIdleDelay?: number;
  /** Ms to pause when reaching a new section */
  sectionPause?: number;
}): () => void {
  const {
    sectionIds,
    speed = 50,
    initialIdleDelay = 4500,
    resumeIdleDelay = 6000,
    sectionPause = 3500,
  } = options;

  let rafId: number | null = null;
  let lastTime: number | null = null;
  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  let pauseTimer: ReturnType<typeof setTimeout> | null = null;
  let isScrolling = false;
  let destroyed = false;
  let lastPassedSectionIndex = -1;
  let hasStartedOnce = false;

  const getCurrentSectionIndex = (): number => {
    const scrollPos = window.scrollY + window.innerHeight * 0.6;
    let current = -1;
    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollPos) {
        current = i;
      }
    }
    return current;
  };

  const stopScrolling = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    isScrolling = false;
    lastTime = null;
  };

  const scrollStep = (timestamp: number) => {
    if (destroyed || !isScrolling) return;
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    if (currentScroll >= maxScroll) {
      stopScrolling();
      return;
    }

    // Check if we've entered a new section
    const currentSectionIdx = getCurrentSectionIndex();
    if (currentSectionIdx > lastPassedSectionIndex && lastPassedSectionIndex >= 0) {
      lastPassedSectionIndex = currentSectionIdx;
      stopScrolling();
      pauseTimer = setTimeout(() => {
        if (!destroyed) startScrolling();
      }, sectionPause);
      return;
    }
    lastPassedSectionIndex = currentSectionIdx;

    const px = (speed * delta) / 1000;
    window.scrollTo(0, currentScroll + px);

    rafId = requestAnimationFrame(scrollStep);
  };

  const startScrolling = () => {
    if (destroyed || isScrolling) return;
    lastPassedSectionIndex = getCurrentSectionIndex();
    isScrolling = true;
    lastTime = null;
    rafId = requestAnimationFrame(scrollStep);
  };

  const scheduleAutoScroll = (delay: number) => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!destroyed) startScrolling();
    }, delay);
  };

  const handleUserInteraction = () => {
    if (destroyed) return;
    stopScrolling();
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    if (idleTimer) clearTimeout(idleTimer);
    hasStartedOnce = true;
    scheduleAutoScroll(resumeIdleDelay);
  };

  const wheelHandler = () => handleUserInteraction();
  const touchHandler = () => handleUserInteraction();
  const keyHandler = (e: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp", "Home", "End"].includes(e.code)) {
      handleUserInteraction();
    }
  };

  window.addEventListener("wheel", wheelHandler, { passive: true });
  window.addEventListener("touchstart", touchHandler, { passive: true });
  window.addEventListener("touchmove", touchHandler, { passive: true });
  window.addEventListener("keydown", keyHandler);

  scheduleAutoScroll(initialIdleDelay);

  return () => {
    destroyed = true;
    stopScrolling();
    if (idleTimer) clearTimeout(idleTimer);
    if (pauseTimer) clearTimeout(pauseTimer);
    window.removeEventListener("wheel", wheelHandler);
    window.removeEventListener("touchstart", touchHandler);
    window.removeEventListener("touchmove", touchHandler);
    window.removeEventListener("keydown", keyHandler);
  };
}
