/**
 * Premium smooth scroll — scrolls to a target element over a given duration
 * using an easeInOutCubic curve.
 *
 * Module-level "active controller" so manual jumps and auto-scroll
 * never animate the page at the same time.
 */

let activeCancel: (() => void) | null = null;
const PROGRAMMATIC_SCROLL_CLASS = "programmatic-scroll-active";

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
  document.documentElement.classList.add(PROGRAMMATIC_SCROLL_CLASS);

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
    window.scrollTo({ top: start + distance * ease(progress), left: 0, behavior: "auto" });
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      activeCancel = null;
      document.documentElement.classList.remove(PROGRAMMATIC_SCROLL_CLASS);
    }
  };

  rafId = requestAnimationFrame(step);

  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    document.documentElement.classList.remove(PROGRAMMATIC_SCROLL_CLASS);
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
  let userInterrupted = false;
  let lastPassedSectionIndex = -1;
  let virtualY = 0;
  let sectionEntryLock = -1;
  const SECTION_THRESHOLD_BUFFER = 36;
  // Mobile gesture tracking
  let touchStartY = 0;
  let touchActive = false;
  const TOUCH_MOVE_THRESHOLD = 10; // px before a touch becomes a "scroll gesture"
  // Self-scroll guard: ignore events caused by our own scrollTo
  let selfScrollUntil = 0;
  let touchListenersAttached = false;

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
    document.documentElement.classList.remove(PROGRAMMATIC_SCROLL_CLASS);
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
      lastPassedSectionIndex >= 0 &&
      currentSectionIdx !== sectionEntryLock &&
      virtualY + window.innerHeight * 0.6 >= sectionTops[currentSectionIdx] + SECTION_THRESHOLD_BUFFER
    ) {
      lastPassedSectionIndex = currentSectionIdx;
      sectionEntryLock = currentSectionIdx;
      stopScrolling();
      pauseTimer = setTimeout(() => {
        if (!destroyed) startScrolling();
      }, sectionPause);
      return;
    }
    lastPassedSectionIndex = currentSectionIdx;

    virtualY += (speed * delta) / 1000;
    if (virtualY > maxScroll) virtualY = maxScroll;
    selfScrollUntil = performance.now() + 100; // ignore touch/scroll events for ~100ms
    window.scrollTo({ top: virtualY, left: 0, behavior: "auto" });

    rafId = requestAnimationFrame(scrollStep);
  };

  const startScrolling = () => {
    if (destroyed || isScrolling) return;
    // Resync from real scroll position (user may have scrolled)
    virtualY = window.scrollY;
    lastPassedSectionIndex = getSectionIndexAt(virtualY);
    isScrolling = true;
    userInterrupted = false;
    document.documentElement.classList.add(PROGRAMMATIC_SCROLL_CLASS);
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
    if (performance.now() < selfScrollUntil) return;
    userInterrupted = true;
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

  const scrollHandler = () => {
    if (destroyed) return;
    if (performance.now() < selfScrollUntil) return;
    if (isScrolling && Math.abs(window.scrollY - virtualY) > 18) {
      handleUserInteraction();
    }
  };

  const touchStartHandler = (e: TouchEvent) => {
    if (destroyed) return;
    // Don't react to events triggered by our own programmatic scroll
    if (performance.now() < selfScrollUntil) return;
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    }
  };

  const touchMoveHandler = (e: TouchEvent) => {
    if (destroyed || !touchActive) return;
    if (performance.now() < selfScrollUntil) return;
    if (e.touches.length === 0) return;
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dy > TOUCH_MOVE_THRESHOLD) {
      touchActive = false; // only fire once per gesture
      handleUserInteraction();
    }
  };

  const touchEndHandler = () => {
    touchActive = false;
  };

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
  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("keydown", keyHandler);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.addEventListener("load", onLoad);

  // Delay touch listeners so the envelope-opening tap doesn't bleed into this session.
  // Listen on document for better iOS Safari reliability.
  const touchAttachTimer = setTimeout(() => {
    if (destroyed) return;
    document.addEventListener("touchstart", touchStartHandler, { passive: true });
    document.addEventListener("touchmove", touchMoveHandler, { passive: true });
    document.addEventListener("touchend", touchEndHandler, { passive: true });
    document.addEventListener("touchcancel", touchEndHandler, { passive: true });
    touchListenersAttached = true;
  }, 350);

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
    clearTimeout(touchAttachTimer);
    window.removeEventListener("wheel", wheelHandler);
    window.removeEventListener("scroll", scrollHandler);
    window.removeEventListener("keydown", keyHandler);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.removeEventListener("load", onLoad);
    if (touchListenersAttached) {
      document.removeEventListener("touchstart", touchStartHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("touchcancel", touchEndHandler);
    }
  };
}
