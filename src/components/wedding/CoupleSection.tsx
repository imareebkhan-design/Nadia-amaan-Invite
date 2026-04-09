import { motion } from 'framer-motion';
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CoupleSection = () => {
  return (
    <section
      id="couple"
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: '#FFF8F4', padding: '72px 24px 80px' }}
    >
      {/* Top ornament */}
      <motion.div
        variants={fadeUp}
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
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="font-body text-[10px] font-medium uppercase text-center mb-2.5"
        style={{ letterSpacing: '0.22em', color: '#C9A84C' }}
      >
        THE MUSTAFA FAMILY INVITES YOU
      </motion.p>

      {/* Section title */}
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl font-normal text-center mb-2"
        style={{ color: '#2D2D2D', lineHeight: 1.2 }}
      >
        A Union Blessed
      </motion.h2>

      {/* Bismillah */}
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="font-sub italic text-[15px] text-center mb-10"
        style={{ color: '#4A7C59', letterSpacing: '0.06em', opacity: 0.8 }}
      >
        In the Name of Allah, the Most Beneficent, the Most Merciful
      </motion.p>

      {/* Photo frame */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 1 }}
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
          <span className="font-display text-[28px] font-normal" style={{ color: '#E06B82', letterSpacing: '0.02em' }}>
            Amaan
          </span>
          <span className="font-sub italic text-[22px]" style={{ color: '#4A7C59', margin: '0 12px', marginTop: -2 }}>
            &amp;
          </span>
          <span className="font-display text-[28px] font-normal" style={{ color: '#E06B82', letterSpacing: '0.02em' }}>
            Nadia
          </span>
        </div>
      </motion.div>

      {/* Story / Lineage block */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
        style={{ maxWidth: 400, marginTop: 36 }}
      >
        {/* Host paragraph */}
        <p className="font-sub italic text-[15px] text-center" style={{ color: '#888', lineHeight: 1.7, marginBottom: 20 }}>
          Mr. Afzal Mustafa &amp; Mrs. Abida Afzal<br />
          cordially invite you to the Waleema —<br />
          Wedding Reception of their beloved son
        </p>

        <SmallDivider />

        {/* Groom lineage */}
        <div className="text-center mb-5">
          <span className="font-display text-[18px] font-normal block mb-1" style={{ color: '#E06B82' }}>
            Amaan Afzal
          </span>
          <span className="font-body text-[12px]" style={{ color: '#AAA', letterSpacing: '0.04em', lineHeight: 1.6 }}>
            Grandson of Late Mr. AS Mustafa<br />
            &amp; Late Mrs. Zubaida Mustafa
          </span>
        </div>

        <SmallDivider />

        {/* Bride lineage */}
        <div className="text-center mb-5">
          <span className="font-display text-[18px] font-normal block mb-1" style={{ color: '#E06B82' }}>
            Nadia Fatima
          </span>
          <span className="font-body text-[12px]" style={{ color: '#AAA', letterSpacing: '0.04em', lineHeight: 1.6 }}>
            D/O Late Mr. Mohd. Sulaiman Khan<br />
            &amp; Mrs. Naseem Bano
          </span>
        </div>

        {/* Closing line */}
        <p className="font-sub italic text-[14px] text-center" style={{ color: '#C9A84C', letterSpacing: '0.08em', marginTop: 8 }}>
          two families, one beautiful beginning
        </p>
      </motion.div>
    </motion.section>
  );
};

export default CoupleSection;
