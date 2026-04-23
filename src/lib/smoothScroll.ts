/**
 * Premium smooth scroll — scrolls to a target element over a given duration
 * using an easeInOutCubic curve.
 *
 * Module-level "active controller" so manual jumps and auto-scroll
 * never animate the page at the same time.
 */

let activeCancel: (() => void) | null = null;

function cancelActiveScroll() {
  if (activeCancel) {
    try { activeCancel(); } catch {}
    activeCancel = null;
  }
}

export function smoothScrollTo(
  targetId: string,
  duration = 3000
): () => void {
  const target = document.getElementById(targetId);
  if (!target) return () => {};

  cancelActiveScroll();

  const start = window.scrollY;
  const end = start + target.getBoundingClientRect().top;
  const distance = end - start;
  let startTime: number | null = null;
  let rafId = 0;
  let cancelled = false;

  const ease = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (cancelled) return;
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      activeCancel = null;
    }
  };

  rafId = requestAnimationFrame(step);

  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
  activeCancel = cancel;
  return cancel;
}

/**
 * Smart auto-scroll controller — buttery smooth.
 * - Caches section offsets, only refreshes on resize / image-load.
 * - No DOM reads inside the rAF loop.
 * - Coalesces user-interaction resets so wheel/touch bursts don't thrash.
 */
export function createAutoScrollController(options: {
  sectionIds: string[];
  speed?: number;
  initialIdleDelay?: number;
  resumeIdleDelay?: number;
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
  let interactionCoalesce: ReturnType<typeof setTimeout> | null = null;
  let isScrolling = false;
  let destroyed = false;
  let lastPassedSectionIndex = -1;
  let virtualY = 0;

  // Cached layout
  let sectionTops: number[] = [];
  let maxScroll = 0;

  const measure = () => {
    sectionTops = sectionIds.map((id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
    });
    maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  };

  const getSectionIndexAt = (scrollY: number): number => {
    const probe = scrollY + window.innerHeight * 0.6;
    let current = -1;
    for (let i = 0; i < sectionTops.length; i++) {
      if (sectionTops[i] <= probe) current = i;
      else break;
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
    if (lastTime === null) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    if (virtualY >= maxScroll) {
      stopScrolling();
      return;
    }

    const currentSectionIdx = getSectionIndexAt(virtualY);
    if (
      currentSectionIdx > lastPassedSectionIndex &&
      lastPassedSectionIndex >= 0
    ) {
      lastPassedSectionIndex = currentSectionIdx;
      stopScrolling();
      pauseTimer = setTimeout(() => {
        if (!destroyed) startScrolling();
      }, sectionPause);
      return;
    }
    lastPassedSectionIndex = currentSectionIdx;

    virtualY += (speed * delta) / 1000;
    if (virtualY > maxScroll) virtualY = maxScroll;
    window.scrollTo(0, virtualY);

    rafId = requestAnimationFrame(scrollStep);
  };

  const startScrolling = () => {
    if (destroyed || isScrolling) return;
    // Resync from real scroll position (user may have scrolled)
    virtualY = window.scrollY;
    lastPassedSectionIndex = getSectionIndexAt(virtualY);
    isScrolling = true;
    lastTime = null;
    rafId = requestAnimationFrame(scrollStep);
  };

  const scheduleAutoScroll = (delay: number) => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!destroyed) {
        measure();
        startScrolling();
      }
    }, delay);
  };

  // Coalesce bursts of wheel/touch events into a single reset
  const handleUserInteraction = () => {
    if (destroyed) return;
    if (isScrolling) stopScrolling();
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    if (interactionCoalesce) clearTimeout(interactionCoalesce);
    interactionCoalesce = setTimeout(() => {
      interactionCoalesce = null;
      if (!destroyed) scheduleAutoScroll(resumeIdleDelay);
    }, 120);
  };

  const wheelHandler = () => handleUserInteraction();
  const touchHandler = () => handleUserInteraction();
  const keyHandler = (e: KeyboardEvent) => {
    if (
      [
        "ArrowDown",
        "ArrowUp",
        "Space",
        "PageDown",
        "PageUp",
        "Home",
        "End",
      ].includes(e.code)
    ) {
      handleUserInteraction();
    }
  };

  const onResize = () => {
    measure();
  };

  const onLoad = () => {
    measure();
  };

  window.addEventListener("wheel", wheelHandler, { passive: true });
  window.addEventListener("touchstart", touchHandler, { passive: true });
  window.addEventListener("touchmove", touchHandler, { passive: true });
  window.addEventListener("keydown", keyHandler);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.addEventListener("load", onLoad);

  // Initial measure (DOM may still be settling — re-measure right before start too)
  measure();
  // Re-measure after fonts/images likely loaded
  setTimeout(measure, 600);
  setTimeout(measure, 1500);

  scheduleAutoScroll(initialIdleDelay);

  return () => {
    destroyed = true;
    stopScrolling();
    if (idleTimer) clearTimeout(idleTimer);
    if (pauseTimer) clearTimeout(pauseTimer);
    if (interactionCoalesce) clearTimeout(interactionCoalesce);
    window.removeEventListener("wheel", wheelHandler);
    window.removeEventListener("touchstart", touchHandler);
    window.removeEventListener("touchmove", touchHandler);
    window.removeEventListener("keydown", keyHandler);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.removeEventListener("load", onLoad);
  };
}
