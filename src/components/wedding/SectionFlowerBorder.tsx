import { motion } from 'framer-motion';

const PINK = '#F4A7B4';
const LIGHT_PINK = '#F8C8D0';
const GREEN = '#A8C5A0';

const RoundPeonySmall = ({ color, size, className, delay = 0 }: {
  color: string; size: number; className?: string; delay?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '50px' }}
    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.6" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.55" transform="rotate(45 60 60)" />
      <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.6" transform="rotate(90 60 60)" />
      <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.55" transform="rotate(135 60 60)" />
      <circle cx="60" cy="60" r="8" fill="#F5D97A" opacity="0.8" />
      <circle cx="58" cy="58" r="2.5" fill="#E8C84A" opacity="0.6" />
    </svg>
  </motion.div>
);

const DaisySmall = ({ color, size, className, delay = 0 }: {
  color: string; size: number; className?: string; delay?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 0.7, scale: 1 }}
    viewport={{ once: true, margin: '50px' }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <ellipse cx="40" cy="40" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="40" rx="10" ry="18" fill={color} opacity="0.55" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="10" ry="18" fill={color} opacity="0.6" transform="rotate(120 40 40)" />
      <circle cx="40" cy="40" r="6" fill="#F5D97A" opacity="0.8" />
    </svg>
  </motion.div>
);

const LeafSmall = ({ className, delay = 0, flip = false }: {
  className?: string; delay?: number; flip?: boolean;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={{ width: 28, height: 46, transform: flip ? 'scaleX(-1)' : undefined }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 0.6, scale: 1 }}
    viewport={{ once: true, margin: '50px' }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <svg viewBox="0 0 60 100" className="w-full h-full" fill="none">
      <path d="M30 95 Q30 50 15 20 Q10 10 20 5 Q35 0 40 15 Q50 35 30 95Z" fill="#4A7C59" opacity="0.7" />
      <path d="M30 90 Q30 55 22 30" stroke="#3A6349" strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  </motion.div>
);

interface SectionFlowerBorderProps {
  position: 'top' | 'bottom' | 'both';
  variant?: number;
}

const TopBorder = ({ variant = 0 }: { variant?: number }) => {
  const colors = [
    [PINK, GREEN, LIGHT_PINK],
    [LIGHT_PINK, PINK, GREEN],
    [GREEN, LIGHT_PINK, PINK],
  ][variant % 3];

  return (
    <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-0 overflow-hidden">
      <RoundPeonySmall color={colors[0]} size={55} className="-left-3 -top-3 md:left-2 md:-top-2" delay={0.1} />
      <DaisySmall color={colors[1]} size={28} className="left-10 top-5 md:left-16 md:top-3" delay={0.3} />
      <LeafSmall className="left-1 top-10 md:left-8 md:top-11" delay={0.2} />
      <RoundPeonySmall color={colors[2]} size={48} className="-right-2 -top-2 md:right-4 md:-top-1" delay={0.2} />
      <DaisySmall color={colors[0]} size={24} className="right-12 top-4 md:right-20 md:top-2" delay={0.4} />
      <LeafSmall className="right-2 top-10 md:right-10 md:top-10" delay={0.3} flip />
    </div>
  );
};

const BottomBorder = ({ variant = 0 }: { variant?: number }) => {
  const colors = [
    [PINK, GREEN, LIGHT_PINK],
    [GREEN, PINK, LIGHT_PINK],
    [LIGHT_PINK, GREEN, PINK],
  ][variant % 3];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-0 overflow-hidden">
      <RoundPeonySmall color={colors[0]} size={50} className="-left-2 -bottom-3 md:left-4 md:-bottom-2" delay={0.1} />
      <DaisySmall color={colors[1]} size={26} className="left-10 bottom-4 md:left-18 md:bottom-2" delay={0.3} />
      <LeafSmall className="left-2 bottom-10 md:left-10 md:bottom-9" delay={0.2} />
      <RoundPeonySmall color={colors[2]} size={44} className="-right-1 -bottom-2 md:right-6 md:-bottom-1" delay={0.15} />
      <DaisySmall color={colors[0]} size={22} className="right-10 bottom-5 md:right-20 md:bottom-3" delay={0.35} />
      <LeafSmall className="right-3 bottom-10 md:right-12 md:bottom-10" delay={0.25} flip />
    </div>
  );
};

const SectionFlowerBorder = ({ position, variant = 0 }: SectionFlowerBorderProps) => (
  <>
    {(position === 'top' || position === 'both') && <TopBorder variant={variant} />}
    {(position === 'bottom' || position === 'both') && <BottomBorder variant={variant} />}
  </>
);

export default SectionFlowerBorder;
