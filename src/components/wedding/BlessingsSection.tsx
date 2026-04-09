import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const duas = [
  {
    arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    translation: 'May Allah bless you and shower His blessings upon you, and may He unite you both in goodness.',
  },
  {
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
    translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes.',
  },
];

const BlessingsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="blessings"
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: '#FFF8F4', padding: '72px 24px 80px' }}
    >
      {/* Top ornament */}
      <div className="flex items-center gap-3 mb-6">
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 6, height: 6, background: '#C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
      </div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-body text-[10px] font-medium uppercase text-center mb-3"
        style={{ letterSpacing: '0.22em', color: '#C9A84C' }}
      >
        SEND WITH DUAS
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl font-normal text-center mb-3"
        style={{ color: '#4A7C59', lineHeight: 1.2 }}
      >
        Blessings &amp; Prayers
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-sub italic text-[15px] text-center mb-10"
        style={{ color: '#2D2D2D' }}
      >
        Your heartfelt duas mean the world to us
      </motion.p>

      {/* Duas */}
      <div className="flex flex-col items-center gap-10 w-full" style={{ maxWidth: 460 }}>
        {duas.map((dua, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }}
            className="text-center"
          >
            {/* Arabic text */}
            <p
              className="text-[22px] sm:text-[26px] leading-relaxed mb-4"
              style={{
                fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                color: '#4A7C59',
                direction: 'rtl',
              }}
            >
              {dua.arabic}
            </p>
            {/* Translation */}
            <p
              className="font-sub italic text-[14px] sm:text-[15px]"
              style={{ color: '#2D2D2D', lineHeight: 1.7, maxWidth: 360, margin: '0 auto' }}
            >
              {dua.translation}
            </p>

            {/* Small divider after each dua */}
            {i < duas.length - 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
                <div style={{ width: 5, height: 5, border: '1px solid #C9A84C', transform: 'rotate(45deg)' }} />
                <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Closing message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="text-center mt-12"
        style={{ maxWidth: 360 }}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
          <div style={{ width: 5, height: 5, border: '1px solid #C9A84C', transform: 'rotate(45deg)' }} />
          <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
        </div>
        <p className="font-sub italic text-[15px]" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
          We humbly request your presence and prayers as two souls begin this blessed journey together.
        </p>
        <p className="font-sub italic text-[14px] mt-4" style={{ color: '#C9A84C', letterSpacing: '0.08em' }}>
          JazakAllah Khair
        </p>
      </motion.div>
    </section>
  );
};

export default BlessingsSection;
