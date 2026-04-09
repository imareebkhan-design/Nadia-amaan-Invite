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
