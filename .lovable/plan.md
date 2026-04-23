

## Fix auto-scroll on smartphones

### Problem (UX gap)
On mobile, the auto-scroll never gets a chance to run because the touch listeners are too aggressive:

1. **`touchstart` fires on any tap** — even a finger resting on the screen to read content cancels auto-scroll instantly, before any actual user-driven scroll happens.
2. **`touchmove` fires during programmatic scroll on iOS Safari** — when `window.scrollTo()` moves the page, the browser sometimes dispatches synthetic touch events, which makes the controller cancel its own scroll the moment it starts.
3. **The initial tap that opens the envelope** propagates into the new auto-scroll session, immediately tripping the cancel logic before the 4.5s idle timer even completes.
4. **No distinction between "passive touch" and "intentional scroll gesture"** — desktop has a clear `wheel` event that means "user is scrolling", but mobile needs a real movement threshold.

### Fix

**File: `src/lib/smoothScroll.ts`**

1. **Remove `touchstart` as a cancellation trigger.** A tap is not a scroll. Only treat touch as cancellation when the finger actually *moves*.
2. **Add a movement threshold to `touchmove`.** Track the starting Y position on `touchstart` (without cancelling), and only cancel auto-scroll when the finger has moved more than ~10px — a real swipe, not a jitter.
3. **Ignore touch events that occur while auto-scroll is actively writing to `window.scrollY`.** Use a short "self-scroll guard" flag set right before each `window.scrollTo()` call and cleared on the next frame, so synthetic iOS touch/scroll events triggered by our own programmatic scroll don't cancel us.
4. **Delay attaching touch listeners by ~300ms after controller creation**, so the envelope-opening tap can't bleed into the new session.
5. **Listen on `document` instead of `window`** for touch events on iOS — `window`-level touch listeners can be unreliable in some mobile browsers.

**File: `src/hooks/useAutoScroll.ts`**

6. Pass `enabled` correctly so the controller only mounts after the envelope opens (already done — verify no regression).

**File: `src/index.css`**

7. Ensure no `overflow: hidden` or `touch-action: none` on `html`/`body`/`main` is blocking programmatic scroll on mobile. Add `touch-action: pan-y` explicitly to the main scroll container so the browser permits vertical scrolling driven by JS.

### Validation
- On a real smartphone (iOS Safari + Android Chrome): open invitation, wait 4.5s without touching → page begins smooth auto-scroll.
- Resting a finger on the screen does *not* cancel auto-scroll.
- A real swipe immediately stops auto-scroll, and it resumes 6s after the swipe ends.
- Section pauses still work correctly.
- No regression on desktop.

