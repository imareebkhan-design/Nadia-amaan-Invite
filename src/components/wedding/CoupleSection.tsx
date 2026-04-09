import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import couplePhoto from '@/assets/couple-photo.jpeg';

const SmallDivider = () => (
  <div className="flex items-center justify-center gap-2" style={{ margin: '4px 0 20px' }}>
    <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
    <div style={{ width: 5, height: 5, border: '1px solid #C9A84C', transform: 'rotate(45deg)' }} />
    <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
  </div>
);

const PeonyFloral = ({ mirror = false }: { mirror?: boolean }) => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {mirror ? (
      <>
        <ellipse cx="36" cy="26" rx="14" ry="8" fill="#F4A7B4" opacity="0.85" transform="rotate(20 36 26)" />
        <ellipse cx="36" cy="26" rx="14" ry="8" fill="#E06B82" opacity="0.65" transform="rotate(-25 36 26)" />
        <ellipse cx="36" cy="26" rx="11" ry="6" fill="#F9C5CF" opacity="0.8" transform="rotate(-70 36 26)" />
        <circle cx="36" cy="26" r="5" fill="#F5D97A" />
        <circle cx="36" cy="26" r="3" fill="#D4A820" />
        <path d="M52 38 Q38 46 22 50 Q32 40 48 39Z" fill="#4A7C59" opacity="0.7" />
      </>
    ) : (
      <>
        <ellipse cx="16" cy="26" rx="14" ry="8" fill="#F4A7B4" opacity="0.85" transform="rotate(-20 16 26)" />
        <ellipse cx="16" cy="26" rx="14" ry="8" fill="#E06B82" opacity="0.65" transform="rotate(25 16 26)" />
        <ellipse cx="16" cy="26" rx="11" ry="6" fill="#F9C5CF" opacity="0.8" transform="rotate(70 16 26)" />
        <circle cx="16" cy="26" r="5" fill="#F5D97A" />
        <circle cx="16" cy="26" r="3" fill="#D4A820" />
        <path d="M0 14 Q14 6 30 2 Q20 12 4 13Z" fill="#4A7C59" opacity="0.7" />
      </>
    )}
  </svg>
);

const CoupleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="couple"
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: '#FFF8F4', padding: '72px 24px 80px' }}
    >
      {/* Top ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 6, height: 6, background: '#C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.22em',
          color: '#C9A84C',
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        THE MUSTAFA FAMILY INVITES YOU
      </motion.p>

      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36,
          fontWeight: 400,
          color: '#2D2D2D',
          textAlign: 'center',
          marginBottom: 8,
          lineHeight: 1.2,
        }}
      >
        A Union Blessed
      </motion.h2>

      {/* Bismillah */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 15,
          color: '#4A7C59',
          textAlign: 'center',
          letterSpacing: '0.06em',
          marginBottom: 40,
          opacity: 0.8,
        }}
      >
        In the Name of Allah, the Most Beneficent, the Most Merciful
      </motion.p>

      {/* Photo frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          width: '100%',
          maxWidth: 420,
          padding: 10,
          background: 'white',
          borderRadius: 20,
          boxShadow: '0 2px 0 #F4A7B4, 0 4px 0 rgba(244,167,180,0.4), 0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {/* Top-left floral */}
        <div style={{ position: 'absolute', top: -18, left: -18, pointerEvents: 'none' }}>
          <PeonyFloral />
        </div>
        {/* Bottom-right floral */}
        <div style={{ position: 'absolute', bottom: -18, right: -18, pointerEvents: 'none' }}>
          <PeonyFloral mirror />
        </div>

        {/* Inner photo */}
        <div style={{ width: '100%', height: 340, borderRadius: 13, overflow: 'hidden', position: 'relative' }}>
          <img
            src={couplePhoto}
            alt="Amaan & Nadia"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            loading="lazy"
          />
          {/* Bottom gradient overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to top, rgba(255,248,244,0.6), transparent)',
              borderRadius: '0 0 13px 13px',
            }}
          />
        </div>

        {/* Names row */}
        <div className="flex items-center justify-center" style={{ padding: '16px 20px 8px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#E06B82', letterSpacing: '0.02em' }}>
            Amaan
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, color: '#4A7C59', margin: '0 12px', marginTop: -2 }}>
            &amp;
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: '#E06B82', letterSpacing: '0.02em' }}>
            Nadia
          </span>
        </div>
      </motion.div>

      {/* Story / Lineage block */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center"
        style={{ maxWidth: 400, marginTop: 36 }}
      >
        {/* Host paragraph */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 15,
          color: '#888',
          textAlign: 'center',
          lineHeight: 1.7,
          marginBottom: 20,
        }}>
          Mr. Afzal Mustafa &amp; Mrs. Abida Afzal<br />
          cordially invite you to the Waleema —<br />
          Wedding Reception of their beloved son
        </p>

        <SmallDivider />

        {/* Groom lineage */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#E06B82', fontWeight: 400, display: 'block', marginBottom: 4 }}>
            Amaan Afzal
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#AAA', letterSpacing: '0.04em', lineHeight: 1.6 }}>
            Grandson of Late Mr. AS Mustafa<br />
            &amp; Late Mrs. Zubaida Mustafa
          </span>
        </div>

        <SmallDivider />

        {/* Bride lineage */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#E06B82', fontWeight: 400, display: 'block', marginBottom: 4 }}>
            Nadia Fatima
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#AAA', letterSpacing: '0.04em', lineHeight: 1.6 }}>
            D/O Late Mr. Mohd. Sulaiman Khan<br />
            &amp; Mrs. Naseem Bano
          </span>
        </div>

        {/* Closing line */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 14,
          color: '#C9A84C',
          textAlign: 'center',
          letterSpacing: '0.08em',
          marginTop: 8,
        }}>
          two families, one beautiful beginning
        </p>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
