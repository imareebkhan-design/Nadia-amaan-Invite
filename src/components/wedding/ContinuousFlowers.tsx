import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   Continuous Flower Overlay
   Pastel pink + pastel green on cream/beige
   Grand entrance bloom → continuous gentle breathing
   Seamless edge-to-edge, hero to footer
   ═══════════════════════════════════════════════════════════ */

/* ── Palette ── */
const PASTEL_PINK = '#F2B5C1';
const PASTEL_PINK_LIGHT = '#F7CDD5';
const PASTEL_PINK_DEEP = '#E9A0AF';
const PASTEL_GREEN = '#B5D8B2';
const PASTEL_GREEN_LIGHT = '#CCEAC8';
const PASTEL_GREEN_DEEP = '#95C490';
const CENTER_GOLD = '#F5E6B8';
const CENTER_GOLD_DEEP = '#EDDA9A';

/* ── Grand entrance: flowers bloom in with staggered delay ── */
const bloomIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0, filter: 'blur(8px)' },
  whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  viewport: { once: true, margin: '200px' } as const,
  transition: {
    opacity: { duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] },
    scale: { duration: 2.2, delay, ease: [0.22, 1, 0.36, 1] },
    filter: { duration: 2, delay, ease: 'easeOut' },
  },
});

/* ── Continuous breathing keyframes ── */
const breathe = (delay: number, rotate: number) => ({
  animate: {
    scale: [1, 1.04, 0.97, 1.02, 1],
    rotate: [rotate, rotate + 3, rotate - 2, rotate + 1.5, rotate],
  },
  transition: {
    scale: { duration: 10 + (delay % 4) * 2, ease: 'easeInOut', repeat: Infinity, delay: delay * 0.3 },
    rotate: { duration: 14 + (delay % 3) * 2, ease: 'easeInOut', repeat: Infinity, delay: delay * 0.2 },
  },
});

/* ═══ FLOWER COMPONENTS ═══ */

/* ── Large pastel peony — layered circular petals ── */
const PastelPeony = ({ size, delay, x, y, rotate, pink = true }: {
  size: number; delay: number; x: string; y: string; rotate: number; pink?: boolean;
}) => {
  const outer = pink ? PASTEL_PINK : PASTEL_GREEN;
  const mid = pink ? PASTEL_PINK_DEEP : PASTEL_GREEN_DEEP;
  const inner = pink ? '#DB8A9C' : '#7DB578';
  const b = breathe(delay, rotate);

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: x, top: y, width: size, height: size }}
      {...bloomIn(delay)}
    >
      <motion.div className="w-full h-full" {...b}>
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Outer petals — soft, overlapping circles */}
          <circle cx="60" cy="35" r="30" fill={outer} opacity="0.35" />
          <circle cx="35" cy="62" r="30" fill={outer} opacity="0.32" />
          <circle cx="85" cy="62" r="30" fill={outer} opacity="0.32" />
          <circle cx="45" cy="82" r="28" fill={outer} opacity="0.28" />
          <circle cx="75" cy="82" r="28" fill={outer} opacity="0.28" />
          {/* Mid ring */}
          <circle cx="48" cy="50" r="22" fill={mid} opacity="0.35" />
          <circle cx="72" cy="50" r="22" fill={mid} opacity="0.33" />
          <circle cx="60" cy="70" r="22" fill={mid} opacity="0.3" />
          {/* Inner glow */}
          <circle cx="60" cy="58" r="15" fill={inner} opacity="0.25" />
          {/* Center */}
          <circle cx="60" cy="58" r="11" fill={CENTER_GOLD} opacity="0.75" />
          <circle cx="60" cy="58" r="7" fill={CENTER_GOLD_DEEP} opacity="0.55" />
          {/* Stamen dots */}
          <circle cx="56" cy="55" r="2" fill={CENTER_GOLD_DEEP} opacity="0.4" />
          <circle cx="64" cy="56" r="1.8" fill={CENTER_GOLD_DEEP} opacity="0.35" />
          <circle cx="60" cy="63" r="1.5" fill={CENTER_GOLD_DEEP} opacity="0.3" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

/* ── Small five-petal flower ── */
const SmallBloom = ({ size, delay, x, y, rotate, pink = true }: {
  size: number; delay: number; x: string; y: string; rotate: number; pink?: boolean;
}) => {
  const color = pink ? PASTEL_PINK_LIGHT : PASTEL_GREEN_LIGHT;
  const colorDeep = pink ? PASTEL_PINK : PASTEL_GREEN;
  const b = breathe(delay, rotate);

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: x, top: y, width: size, height: size }}
      {...bloomIn(delay + 0.15)}
    >
      <motion.div className="w-full h-full" {...b}>
        <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
          <circle cx="40" cy="20" r="16" fill={color} opacity="0.45" />
          <circle cx="22" cy="38" r="15" fill={color} opacity="0.4" />
          <circle cx="58" cy="38" r="15" fill={color} opacity="0.4" />
          <circle cx="28" cy="56" r="14" fill={colorDeep} opacity="0.3" />
          <circle cx="52" cy="56" r="14" fill={colorDeep} opacity="0.3" />
          <circle cx="40" cy="40" r="9" fill={CENTER_GOLD} opacity="0.7" />
          <circle cx="40" cy="40" r="5.5" fill={CENTER_GOLD_DEEP} opacity="0.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

/* ── Scalloped green rosette ── */
const GreenRosette = ({ size, delay, x, y, rotate }: {
  size: number; delay: number; x: string; y: string; rotate: number;
}) => {
  const b = breathe(delay, rotate);
  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: x, top: y, width: size, height: size }}
      {...bloomIn(delay + 0.2)}
    >
      <motion.div className="w-full h-full" {...b}>
        <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <circle key={i}
              cx={40 + Math.cos((a * Math.PI) / 180) * 17}
              cy={40 + Math.sin((a * Math.PI) / 180) * 17}
              r="11" fill={PASTEL_GREEN} opacity={0.38 + (i % 3) * 0.04}
            />
          ))}
          <circle cx="40" cy="40" r="13" fill={PASTEL_GREEN_LIGHT} opacity="0.45" />
          <circle cx="40" cy="40" r="7.5" fill={CENTER_GOLD} opacity="0.65" />
          <circle cx="40" cy="40" r="4.5" fill={CENTER_GOLD_DEEP} opacity="0.45" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

/* ── Teardrop leaf ── */
const Leaf = ({ x, y, rotate, delay, size = 50, flip = false }: {
  x: string; y: string; rotate: number; delay: number; size?: number; flip?: boolean;
}) => {
  const b = breathe(delay, rotate);
  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{ left: x, top: y, width: size, height: size * 1.6, transform: flip ? 'scaleX(-1)' : undefined }}
      {...bloomIn(delay + 0.1)}
    >
      <motion.div className="w-full h-full" {...b}>
        <svg viewBox="0 0 60 100" className="w-full h-full" fill="none">
          <path d="M30 5 Q52 28 48 55 Q44 82 30 95 Q16 82 12 55 Q8 28 30 5Z"
            fill={PASTEL_GREEN} opacity="0.45" />
          <path d="M30 10 Q45 30 43 52 Q40 75 30 88 Q20 75 17 52 Q15 30 30 10Z"
            fill={PASTEL_GREEN_LIGHT} opacity="0.3" />
          {/* Vein */}
          <path d="M30 18 Q30 50 30 85" stroke={PASTEL_GREEN_DEEP} strokeWidth="0.7" opacity="0.3" fill="none" />
          <path d="M30 40 Q38 35 42 28" stroke={PASTEL_GREEN_DEEP} strokeWidth="0.5" opacity="0.2" fill="none" />
          <path d="M30 55 Q22 50 18 42" stroke={PASTEL_GREEN_DEEP} strokeWidth="0.5" opacity="0.2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

/* ── Drifting petal — gentle infinite fall ── */
const DriftingPetal = ({ color, delay, startX, startY, size = 14 }: {
  color: string; delay: number; startX: string; startY: string; size?: number;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: startX, top: startY, width: size, height: size * 1.4 }}
    animate={{
      opacity: [0, 0.5, 0.45, 0.3, 0],
      y: [0, 55, 120, 190, 260],
      x: [0, 14, -10, 16, 4],
      rotate: [0, 35, 70, 115, 165],
    }}
    transition={{ duration: 13, delay, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
  >
    <svg viewBox="0 0 16 22" className="w-full h-full" fill="none">
      <ellipse cx="8" cy="11" rx="6.5" ry="9.5" fill={color} opacity="0.45" />
    </svg>
  </motion.div>
);

/* ── Soft glow dot ── */
const GlowDot = ({ color, x, y, delay, size = 5 }: {
  color: string; x: string; y: string; delay: number; size?: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x, top: y, width: size, height: size, background: color,
      boxShadow: `0 0 ${size * 3}px ${color}50`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: [0.2, 0.5, 0.2], scale: [0.85, 1.2, 0.85] }}
    viewport={{ once: true, margin: '100px' }}
    transition={{ duration: 6, delay, ease: 'easeInOut', repeat: Infinity }}
  />
);

/* ═══════════════════════════════════════════════════
   Flower Cluster — rich botanical grouping
   ═══════════════════════════════════════════════════ */
const FlowerCluster = ({ yPercent, side, variant }: {
  yPercent: number; side: 'left' | 'right'; variant: number;
}) => {
  const isLeft = side === 'left';
  const isPink = variant % 2 === 0;
  const d = variant * 0.12;

  return (
    <div className="absolute left-0 right-0 pointer-events-none" style={{ top: `${yPercent}%` }}>
      {/* Primary large peony */}
      <PastelPeony
        pink={isPink}
        size={95 + (variant % 4) * 18}
        x={isLeft ? '-28px' : 'calc(100% - 68px)'}
        y="-38px"
        delay={d}
        rotate={6 + variant * 14}
      />
      {/* Secondary small bloom */}
      <SmallBloom
        pink={!isPink}
        size={38 + (variant % 3) * 8}
        x={isLeft ? '50px' : 'calc(100% - 80px)'}
        y="18px"
        delay={d + 0.15}
        rotate={-12 + variant * 9}
      />
      {/* Green rosette accent */}
      <GreenRosette
        size={32 + (variant % 2) * 10}
        x={isLeft ? '28px' : 'calc(100% - 55px)'}
        y="52px"
        delay={d + 0.3}
        rotate={18 + variant * 7}
      />
      {/* Leaf tucked behind */}
      <Leaf
        x={isLeft ? '-8px' : 'calc(100% - 32px)'}
        y="-52px"
        rotate={isLeft ? 12 + variant * 4 : -12 - variant * 4}
        delay={d + 0.08}
        size={28 + (variant % 3) * 6}
        flip={!isLeft}
      />
      {/* Extra bloom on wider screens */}
      <div className="hidden sm:block">
        <SmallBloom
          pink={isPink}
          size={26 + (variant % 2) * 6}
          x={isLeft ? '72px' : 'calc(100% - 95px)'}
          y="68px"
          delay={d + 0.45}
          rotate={40 + variant * 5}
        />
        <Leaf
          x={isLeft ? '58px' : 'calc(100% - 75px)'}
          y="-10px"
          rotate={isLeft ? -25 : 25}
          delay={d + 0.35}
          size={22}
          flip={isLeft}
        />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Main Overlay — full page, hero to footer
   ═══════════════════════════════════════════════════ */
const ContinuousFlowers = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ height: '100%' }}>

    {/* ── 20 flower clusters, alternating left/right ── */}
    {[1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96].map((y, i) => (
      <FlowerCluster key={y} yPercent={y} side={i % 2 === 0 ? 'left' : 'right'} variant={i} />
    ))}

    {/* ── Drifting petals — pink and green throughout ── */}
    {[
      { c: PASTEL_PINK, x: '10%', y: '0%', d: 0 },
      { c: PASTEL_GREEN_LIGHT, x: '80%', y: '1%', d: 2 },
      { c: PASTEL_PINK_LIGHT, x: '35%', y: '0%', d: 4.5 },
      { c: PASTEL_GREEN, x: '60%', y: '3%', d: 7 },
      { c: PASTEL_PINK, x: '22%', y: '12%', d: 1 },
      { c: PASTEL_GREEN_LIGHT, x: '75%', y: '15%', d: 3.5 },
      { c: PASTEL_PINK_LIGHT, x: '50%', y: '20%', d: 6 },
      { c: PASTEL_GREEN, x: '15%', y: '30%', d: 2.5 },
      { c: PASTEL_PINK, x: '68%', y: '35%', d: 5 },
      { c: PASTEL_GREEN_LIGHT, x: '42%', y: '42%', d: 8 },
      { c: PASTEL_PINK, x: '85%', y: '50%', d: 1.5 },
      { c: PASTEL_GREEN, x: '28%', y: '55%', d: 4 },
      { c: PASTEL_PINK_LIGHT, x: '58%', y: '62%', d: 6.5 },
      { c: PASTEL_GREEN_LIGHT, x: '18%', y: '70%', d: 3 },
      { c: PASTEL_PINK, x: '72%', y: '75%', d: 5.5 },
      { c: PASTEL_GREEN, x: '45%', y: '82%', d: 9 },
      { c: PASTEL_PINK_LIGHT, x: '30%', y: '88%', d: 2 },
      { c: PASTEL_GREEN_LIGHT, x: '65%', y: '92%', d: 7.5 },
    ].map((p, i) => (
      <DriftingPetal key={`p-${i}`} color={p.c} delay={p.d} startX={p.x} startY={p.y}
        size={12 + (i % 4) * 2} />
    ))}

    {/* ── Glow dots — magical sparkle ── */}
    {[
      { c: PASTEL_PINK, x: '20%', y: '5%' },
      { c: PASTEL_GREEN, x: '82%', y: '9%' },
      { c: PASTEL_PINK_LIGHT, x: '48%', y: '14%' },
      { c: PASTEL_GREEN_LIGHT, x: '12%', y: '22%' },
      { c: PASTEL_PINK, x: '72%', y: '28%' },
      { c: PASTEL_GREEN, x: '38%', y: '35%' },
      { c: PASTEL_PINK, x: '85%', y: '42%' },
      { c: PASTEL_GREEN_LIGHT, x: '25%', y: '48%' },
      { c: PASTEL_PINK_LIGHT, x: '62%', y: '55%' },
      { c: PASTEL_GREEN, x: '15%', y: '62%' },
      { c: PASTEL_PINK, x: '75%', y: '68%' },
      { c: PASTEL_GREEN_LIGHT, x: '42%', y: '75%' },
      { c: PASTEL_PINK, x: '55%', y: '82%' },
      { c: PASTEL_GREEN, x: '30%', y: '88%' },
      { c: PASTEL_PINK_LIGHT, x: '80%', y: '94%' },
    ].map((d, i) => (
      <GlowDot key={`g-${i}`} color={d.c} x={d.x} y={d.y}
        delay={(i % 5) * 0.4} size={4 + (i % 3) * 1.5} />
    ))}
  </div>
);

export default ContinuousFlowers;
