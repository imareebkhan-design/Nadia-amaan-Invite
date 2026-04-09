import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import couplePhoto from '@/assets/couple-photo.jpeg';

const DecorativeDivider = () => (
  <div className="flex items-center justify-center gap-3 md:gap-4 my-6 md:my-8">
    <div className="w-12 md:w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3))' }} />
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none">
      <path d="M12 2 L14 8 L20 10 L14 12 L12 18 L10 12 L4 10 L10 8 Z" fill="#C9A84C" opacity="0.3" />
      <circle cx="12" cy="10" r="2" fill="#C9A84C" opacity="0.4" />
    </svg>
    <div className="w-12 md:w-24 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.3))' }} />
  </div>
);

const CoupleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section
      id="couple"
      ref={ref}
      className="relative py-16 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }}
      />

      {/* Section header */}
      <div className="text-center mb-8 md:mb-10 px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.35em] uppercase mb-2 md:mb-3"
          style={{ color: '#C9A84C' }}
        >
          Amaan &amp; Nadia
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-2xl md:text-4xl lg:text-5xl"
          style={{ color: '#4A7C59' }}
        >
          A Union Blessed
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DecorativeDivider />
        </motion.div>
      </div>

      {/* Couple portrait with parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl lg:max-w-3xl mx-auto mb-14 md:mb-20 px-4 md:px-6"
        style={{ y: imageY, scale: imageScale }}
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="absolute -inset-3 md:-inset-5 rounded-[24px] md:rounded-[28px]"
            style={{
              border: '1px solid rgba(201,168,76,0.12)',
              background: 'linear-gradient(145deg, rgba(201,168,76,0.03), transparent 40%, rgba(201,168,76,0.02))',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.3 }}
            className="absolute -inset-1.5 md:-inset-2.5 rounded-[20px] md:rounded-[24px]"
            style={{ border: '1px solid rgba(201,168,76,0.08)' }}
          />

          {/* Corner decorations - desktop */}
          {[
            { top: -16, left: -16 },
            { top: -16, right: -16 },
            { bottom: -16, left: -16 },
            { bottom: -16, right: -16 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 hidden md:block"
              style={pos as React.CSSProperties}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                {i === 0 && <path d="M0 16 L0 4 Q0 0 4 0 L16 0" stroke="#C9A84C" strokeWidth="1" opacity="0.25" />}
                {i === 1 && <path d="M16 0 L28 0 Q32 0 32 4 L32 16" stroke="#C9A84C" strokeWidth="1" opacity="0.25" />}
                {i === 2 && <path d="M0 16 L0 28 Q0 32 4 32 L16 32" stroke="#C9A84C" strokeWidth="1" opacity="0.25" />}
                {i === 3 && <path d="M16 32 L28 32 Q32 32 32 28 L32 16" stroke="#C9A84C" strokeWidth="1" opacity="0.25" />}
              </svg>
            </motion.div>
          ))}

          <div
            className="rounded-xl md:rounded-3xl overflow-hidden relative"
            style={{ boxShadow: '0 25px 80px rgba(74,124,89,0.12), 0 10px 30px rgba(0,0,0,0.06)' }}
          >
            <motion.img
              src={couplePhoto}
              alt="Amaan and Nadia"
              className="w-full object-cover"
              style={{ height: '320px', objectPosition: 'center top', borderRadius: '12px' }}
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 35%),
                  linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 20%)
                `,
              }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.12) 50%, transparent 60%)' }}
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '200%' } : {}}
              transition={{ duration: 1.8, delay: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Couple names */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-16">
        {[
          { name: 'Amaan', align: 'md:text-right', x: -40, delay: 0.4 },
          { name: 'Nadia', align: 'md:text-left', x: 40, delay: 0.5 },
        ].map((person, idx) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, x: person.x, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: person.delay, ease: [0.22, 1, 0.36, 1] }}
            className={`text-center ${person.align} relative`}
          >
            <div
              className="hidden md:block absolute top-0 w-12 h-px"
              style={{
                background: `linear-gradient(${idx === 0 ? 'to left' : 'to right'}, rgba(201,168,76,0.25), transparent)`,
                ...(idx === 0 ? { right: 0 } : { left: 0 }),
              }}
            />
            <motion.h3
              className="font-display text-2xl md:text-4xl mb-2 md:mb-3"
              style={{ color: '#E06B82' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {person.name}
            </motion.h3>
          </motion.div>
        ))}
      </div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="max-w-2xl mx-auto mt-12 md:mt-16 px-6 text-center"
      >
        <h3 className="font-sub text-lg md:text-2xl mb-4 md:mb-6" style={{ color: '#4A7C59' }}>
          A Union Blessed
        </h3>
        <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: '#888' }}>
          Mr. Afzal Mustafa & Mrs. Abida Afzal cordially invite you to the Waleema — Wedding Reception of their beloved son Amaan Afzal.
        </p>
        <p className="font-body text-sm md:text-base leading-relaxed mt-4" style={{ color: '#888' }}>
          Grandson of Late Mr. AS Mustafa & Late Mrs. Zubaida Mustafa.
        </p>
        <p className="font-body text-sm md:text-base leading-relaxed mt-4" style={{ color: '#888' }}>
          Together with Nadia Fatima, daughter of Late Mr. Mohd. Sulaiman Khan & Mrs. Naseem Bano — two families, one beautiful beginning.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-12 md:mt-16"
      >
        <DecorativeDivider />
      </motion.div>
    </section>
  );
};

export default CoupleSection;
