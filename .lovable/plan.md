
Goal: eliminate the auto-scroll stutter by reducing per-frame work during programmatic scrolling and removing the most expensive visual effects that are being recomposited while the page moves.

Implementation plan

1. Refactor the auto-scroll controller in `src/lib/smoothScroll.ts`
- Replace repeated section DOM lookups during every animation frame with cached section measurements.
- Precompute each tracked section’s top offset once on start, then refresh that cache on `resize`, `orientationchange`, image load completion, and after the invitation opens.
- Track the current auto-scroll position in a local variable and write it with `window.scrollTo` without re-reading layout-heavy values more than necessary.
- Add a small section-threshold buffer so the pause logic does not repeatedly stop/restart near boundaries.
- Throttle or coalesce user-interaction resets so wheel/touch bursts do not constantly tear down and restart the scroll state.

2. Reduce scroll-linked React re-renders in `src/components/wedding/FloatingNav.tsx`
- Replace the current raw `scroll` listener that calls `setVisible` and `setActive` on almost every scroll event with a lighter strategy:
  - either `requestAnimationFrame` throttling, or
  - preferably `IntersectionObserver` for section activation.
- Only update state when the next value is actually different from the current one.
- Keep the nav visible logic from toggling repeatedly around its threshold.

3. Remove expensive blur effects from elements that sit above animated scrolling content
- Update `src/components/wedding/FloatingNav.tsx`
- Update `src/components/wedding/MusicToggle.tsx`
- Update `src/components/wedding/EventsSection.tsx`
- Replace `backdropFilter` / `WebkitBackdropFilter` glassmorphism on floating controls and the festivities card with cheaper styling:
  - more opaque backgrounds
  - subtle borders
  - soft box shadows
  - optional text-shadow for readability instead of background blur
- This directly targets the known performance hotspot where background blur is recomputed while the page is moving.

4. Trim continuous animation cost in the busiest sections
- Review `src/components/wedding/EventsSection.tsx`, `src/components/wedding/CountdownSection.tsx`, and `src/components/wedding/ContinuousFlowers.tsx`.
- Reduce always-running infinite animations during auto-scroll, especially large blurred glow layers and pulsing decorative motion.
- Keep the visual design, but prefer:
  - static gradients over animated blurred blobs where possible
  - fewer simultaneous infinite animations
  - `transform`/`opacity` only animations for anything that remains animated
- Ensure decorative layers use `pointer-events: none` and avoid unnecessary stacking/context churn.

5. Smooth the interplay between manual smooth scrolling and auto-scroll
- In `src/lib/smoothScroll.ts`, make manual section jumps and passive auto-scroll share the same cancellation rules so they do not fight each other.
- Prevent overlapping scroll animations if the user taps nav links while auto-scroll is active.
- Keep one active scroll controller at a time.

6. Verify section wiring in `src/pages/Index.tsx`
- Confirm every section used by auto-scroll has a stable ID and consistent order.
- Add missing wrapper IDs if needed so section detection does not depend on mixed inner/outer containers.
- Keep the hook unconditional, but ensure it only initializes after the invitation is opened and the DOM is ready.

Technical details
- Most likely bottlenecks in the current code:
  - `backdropFilter` on the floating nav, music button, and festivities glass card
  - `FloatingNav` calling state updates from a raw scroll listener
  - repeated `document.getElementById` and `offsetTop` reads inside the auto-scroll animation loop
  - multiple infinite blur/glow animations running while the page is scrolling
- Main files to change:
  - `src/lib/smoothScroll.ts`
  - `src/components/wedding/FloatingNav.tsx`
  - `src/components/wedding/MusicToggle.tsx`
  - `src/components/wedding/EventsSection.tsx`
  - possibly `src/components/wedding/ContinuousFlowers.tsx`
  - possibly `src/pages/Index.tsx`

Expected result
- Auto-scroll moves continuously without visible hitching.
- Section pauses still happen, but without micro-stops or jitter.
- The floating controls remain elegant while becoming much lighter to render.
- Older mobile devices should see the biggest improvement.

Validation after implementation
- Test idle-start auto-scroll from top to bottom.
- Test section pause/resume behavior at each major section.
- Test wheel, touch, and keyboard interruption.
- Test nav click scrolling while auto-scroll is active.
- Confirm there is no visual regression in the festivities card, floating nav, or music control.
