import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function NameLetterStagger({ name }: { name: string }) {
  return (
    <span>
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.055,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function CoupleParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -70]);

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
}
