import { motion } from 'framer-motion';
import { NameLetterStagger } from './HeroAnimations';

const HeroSection = () => {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full min-h-screen py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        className="max-w-3xl mx-auto flex flex-col items-center relative z-10"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1.2 } },
        }}
        initial="hidden"
        animate="visible"
      >

        {/* Invite line */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20, }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } } }}
          className="font-body text-[12px] sm:text-[13px] uppercase tracking-[0.35em]"
          style={{ color: '#C9A84C' }}
        >
          You are invited to the Waleema
        </motion.p>

        {/* Gold divider with diamond */}
        <motion.div
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: 'easeOut' } } }}
          className="flex items-center gap-3 mt-6"
          style={{ width: '260px' }}
        >
          <div style={{ width: '120px', height: '1px', background: 'rgba(74,124,89,0.25)' }} />
          <div className="w-2.5 h-2.5 rotate-45" style={{ border: '1px solid rgba(74,124,89,0.3)' }} />
          <div style={{ width: '120px', height: '1px', background: 'rgba(74,124,89,0.25)' }} />
        </motion.div>

        {/* Names */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 40, }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: 'easeOut' } } }}
          className="flex flex-col items-center -space-y-2 sm:-space-y-4 mt-8"
        >
          <h1 className="font-display text-[64px] sm:text-[100px]" style={{ color: '#E06B82', lineHeight: 1.05 }}>
            <NameLetterStagger name="Amaan" />
          </h1>
          <span className="font-display text-3xl sm:text-4xl" style={{ color: '#E06B82', opacity: 0.5 }}>&amp;</span>
          <h1 className="font-display text-[64px] sm:text-[100px]" style={{ color: '#E06B82', lineHeight: 1.05 }}>
            <NameLetterStagger name="Nadia" />
          </h1>
        </motion.div>

        {/* Lotus / floral motif */}
        <motion.svg
          variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
          width="36" height="22" viewBox="0 0 32 20" fill="none" className="mt-6"
        >
          <path d="M16 0C16 0 13 4 13 8C13 10 14.5 12 16 12C17.5 12 19 10 19 8C19 4 16 0 16 0Z" fill="#4A7C59" opacity="0.9" />
          <path d="M10 4C10 4 7 8 8 11C8.5 13 10.5 13.5 12 12C13.5 10.5 13 7 10 4Z" fill="#4A7C59" opacity="0.6" />
          <path d="M22 4C22 4 25 8 24 11C23.5 13 21.5 13.5 20 12C18.5 10.5 19 7 22 4Z" fill="#4A7C59" opacity="0.6" />
          <path d="M6 8C6 8 3 11 4 14C4.5 15.5 7 16 9 14C11 12 9 9 6 8Z" fill="#4A7C59" opacity="0.35" />
          <path d="M26 8C26 8 29 11 28 14C27.5 15.5 25 16 23 14C21 12 23 9 26 8Z" fill="#4A7C59" opacity="0.35" />
        </motion.svg>

        {/* Request text */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 15, }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } } }}
          className="font-sub text-[12px] sm:text-[14px] tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-5"
          style={{ color: 'rgba(74,124,89,0.6)' }}
        >
          Waleema — Wedding Reception
        </motion.p>

        {/* Date */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20, }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } } }}
          className="font-display font-medium tracking-[0.25em] mt-8 text-[24px] sm:text-[36px]"
          style={{ color: '#4A7C59' }}
        >
          17 · May · 2026
        </motion.p>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
          className="font-body text-[13px] sm:text-[15px] mt-2"
          style={{ fontWeight: 300, color: '#2D2D2D' }}
        >
          7:00 PM · L'Elegant Banquet Hall, Delhi
        </motion.p>

        {/* Venue */}
        <motion.h3
          variants={{ hidden: { opacity: 0, y: 20, }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } } }}
          className="font-sub text-[24px] sm:text-[32px] mt-5"
          style={{ color: '#4A7C59', fontWeight: 300 }}
        >
          L'Elegant Banquet Hall
        </motion.h3>

        {/* Bottom divider */}
        <motion.div
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: 'easeOut' } } }}
          className="flex items-center gap-3 mt-8"
          style={{ width: '260px' }}
        >
          <div style={{ width: '120px', height: '1px', background: 'rgba(74,124,89,0.25)' }} />
          <div className="w-2.5 h-2.5 rotate-45" style={{ border: '1px solid rgba(74,124,89,0.3)' }} />
          <div style={{ width: '120px', height: '1px', background: 'rgba(74,124,89,0.25)' }} />
        </motion.div>

        {/* Scroll indicator */}
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
          className="flex flex-col items-center mt-8"
          style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
        >
          <span className="font-sub text-[10px] tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>Scroll</span>
          <span style={{ color: '#C9A84C', fontSize: '20px' }}>↓</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
