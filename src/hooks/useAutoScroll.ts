import { useEffect } from 'react';
import { createAutoScrollController } from '@/lib/smoothScroll';

const SECTION_IDS = ['hero', 'countdown', 'couple', 'events', 'venue', 'blessings'];

export function useAutoScroll(
  enabled: boolean,
  idleDelay = 4500,
  pxPerSecond = 50,
  sectionPause = 3500,
) {
  useEffect(() => {
    if (!enabled) return;

    const cleanup = createAutoScrollController({
      sectionIds: SECTION_IDS,
      speed: pxPerSecond,
      initialIdleDelay: idleDelay,
      resumeIdleDelay: 6000,
      sectionPause,
    });

    return cleanup;
  }, [enabled, idleDelay, pxPerSecond, sectionPause]);
}
