import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import { smoothScrollTo } from '@/lib/smoothScroll';

const WEDDING_DATE = new Date('2026-05-09T02:30:00Z').getTime(); // 8:00 AM IST

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (): TimeLeft => {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const FlipDigit = ({ value }: { value: string }) => (
  <AnimatePresence mode="popLayout">
    <motion.span
      key={value}
      initial={{ y: -8, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 8, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="inline-block"
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

const TimeCard = ({ value, label, index }: { value: number; label: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const display = String(value).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-[64px] h-[80px] md:w-[100px] md:h-[116px] rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(168deg, rgba(74,124,89,0.08) 0%, rgba(74,124,89,0.04) 100%)',
          border: '1px solid rgba(74,124,89,0.15)',
          boxShadow: '0 4px 20px rgba(74,124,89,0.08)',
        }}
      >
        <span
          className="text-3xl md:text-[44px] font-semibold relative z-10"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em', color: '#4A7C59' }}
        >
          <FlipDigit value={display} />
        </span>
      </div>

      <div className="mt-2 md:mt-3">
        <span
          className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase"
          style={{ color: 'rgba(74,124,89,0.45)' }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
};

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Min' },
    { key: 'seconds', label: 'Sec' },
  ];

  return (
    <section
      ref={ref}
      className="relative py-14 md:py-24 flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Soft radial glow behind the date */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '300px',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(224,107,130,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Decorative arch — sits at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mb-2 md:mb-4"
      >
        <svg viewBox="0 0 360 80" className="w-[200px] md:w-[320px] mx-auto" fill="none">
          <path d="M30 75 Q30 18 180 10 Q330 18 330 75" stroke="#E06B82" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
          <path d="M50 75 Q50 30 180 22 Q310 30 310 75" stroke="#4A7C59" strokeWidth="0.6" strokeLinecap="round" strokeDasharray="4 3" fill="none" opacity="0.15" />
          <path d="M70 75 Q70 40 180 34 Q290 40 290 75" stroke="#E06B82" strokeWidth="0.4" strokeLinecap="round" fill="none" opacity="0.1" />
          {/* Center ornament */}
          <circle cx="180" cy="8" r="3" fill="#E06B82" opacity="0.25" />
          <circle cx="180" cy="8" r="5.5" stroke="#E06B82" strokeWidth="0.6" fill="none" opacity="0.15" />
        </svg>
      </motion.div>

      {/* Save the Date label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.35em] uppercase mb-3 md:mb-4"
        style={{ color: '#4A7C59', opacity: 0.6 }}
      >
        Save the Date
      </motion.p>

      {/* Glowing date */}
      <style>{`
        @keyframes softPinkGlow {
          0%, 100% {
            text-shadow: 0 0 12px rgba(224,107,130,0.25), 0 0 30px rgba(224,107,130,0.1);
            filter: brightness(1);
          }
          50% {
            text-shadow: 0 0 20px rgba(224,107,130,0.45), 0 0 50px rgba(224,107,130,0.2), 0 0 80px rgba(224,107,130,0.08);
            filter: brightness(1.05);
          }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-2 md:mb-4"
      >
        {/* Background glow circle */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(224,107,130,0.08) 0%, transparent 70%)',
            transform: 'scale(2.5)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <h3
          className="font-display text-3xl md:text-[56px] tracking-[0.12em] relative z-10"
          style={{
            color: '#E06B82',
            fontWeight: 400,
            animation: 'softPinkGlow 3s ease-in-out infinite',
            lineHeight: 1.2,
          }}
        >
          09 · May · 2026
        </h3>
      </motion.div>

      {/* Thin divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center gap-2.5 mb-6 md:mb-8"
      >
        <div className="w-10 md:w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(74,124,89,0.2))' }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#E06B82', opacity: 0.3 }} />
        <div className="w-10 md:w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(74,124,89,0.2))' }} />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="font-sub text-sm md:text-lg text-center mb-6 md:mb-10 px-4"
        style={{ color: '#4A7C59', fontWeight: 300, opacity: 0.7 }}
      >
        The auspicious moment arrives in…
      </motion.p>

      {/* Countdown cards */}
      <div className="flex gap-3 md:gap-5">
        {units.map((u, i) => (
          <TimeCard key={u.key} value={timeLeft[u.key]} label={u.label} index={i} />
        ))}
      </div>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 md:mt-14 flex items-center gap-3"
      >
        <div className="w-6 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(224,107,130,0.2))' }} />
        <div className="w-1 h-1 rounded-full" style={{ background: '#E06B82', opacity: 0.25 }} />
        <div className="w-6 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(224,107,130,0.2))' }} />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-6 md:mt-10 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => smoothScrollTo('couple', 2500)}
      >
        <span className="text-[9px] md:text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(74,124,89,0.35)' }}>
          Explore more
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronsDown className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'rgba(224,107,130,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
