import { useState, useCallback, useMemo } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import EnvelopeSection from '@/components/wedding/EnvelopeSection';
import HeroSection from '@/components/wedding/HeroSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import CoupleSection from '@/components/wedding/CoupleSection';
import EventsSection from '@/components/wedding/EventsSection';
import VenueSection from '@/components/wedding/VenueSection';
import RsvpSection from '@/components/wedding/RsvpSection';
import ThankYouSection from '@/components/wedding/ThankYouSection';
import MusicToggle from '@/components/wedding/MusicToggle';
import FloatingNav from '@/components/wedding/FloatingNav';

import SectionDivider from '@/components/wedding/SectionDivider';
import ContinuousFlowers from '@/components/wedding/ContinuousFlowers';

const SEAL_OPENED_KEY = "wedding_seal_opened";

const Index = () => {
  const [searchParams] = useSearchParams();
  const guestName = useMemo(() => searchParams.get('guest') || undefined, [searchParams]);

  const [envelopeOpened, setEnvelopeOpened] = useState(() => {
    try {
      return sessionStorage.getItem(SEAL_OPENED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleEnvelopeOpen = useCallback(() => {
    setEnvelopeOpened(true);
    try {
      sessionStorage.setItem(SEAL_OPENED_KEY, "true");
    } catch {}
  }, []);

  useAutoScroll(envelopeOpened, 4000, 0.8);

  return (
    <main className="scroll-smooth">
      <AnimatePresence mode="wait">
        {!envelopeOpened && (
          <EnvelopeSection key="envelope" onOpen={handleEnvelopeOpen} guestName={guestName} />
        )}
      </AnimatePresence>

      {envelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
        <div className="relative" style={{ backgroundColor: 'hsl(var(--wedding-cream))' }}>
          <ContinuousFlowers />
          <FloatingNav />
          
          <MusicToggle autoStart={true} />
          <div id="hero" className="relative z-[1]"><HeroSection /></div>
          <div id="countdown" className="relative z-[1]"><CountdownSection /></div>
          <div className="relative z-[1]"><CoupleSection /></div>
          <div className="relative z-[1]"><SectionDivider variant="light" /></div>
          <div className="relative z-[1]"><EventsSection /></div>
          <div className="relative z-[1]"><SectionDivider variant="light" /></div>
          <div className="relative z-[1]"><VenueSection /></div>
          <div className="relative z-[1]"><SectionDivider variant="light" /></div>
          <div id="rsvp" className="relative z-[1]"><RsvpSection /></div>
          <div className="relative z-[1]"><ThankYouSection /></div>
        </div>
        </motion.div>
      )}
    </main>
  );
};

export default Index;
