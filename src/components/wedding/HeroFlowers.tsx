import { motion } from 'framer-motion';

/* ── Soft watercolor peony (layered round petals) ── */
const SoftPeony = ({ size, delay, x, y, rotate }: {
  size: number; delay: number; x: string; y: string; rotate: number;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{
      opacity: 1,
      scale: [1, 1.05, 0.97, 1.03, 1],
      rotate: [rotate, rotate + 4, rotate - 3, rotate + 2, rotate],
    }}
    transition={{
      opacity: { duration: 2, delay, ease: 'easeOut' },
      scale: { duration: 10, delay, ease: 'easeInOut', repeat: Infinity },
      rotate: { duration: 14, delay, ease: 'easeInOut', repeat: Infinity },
    }}
  >
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      {/* Large outer petals */}
      <circle cx="60" cy="38" r="28" fill="#E8A0B0" opacity="0.35" />
      <circle cx="38" cy="65" r="28" fill="#E8A0B0" opacity="0.3" />
      <circle cx="82" cy="65" r="28" fill="#E8A0B0" opacity="0.3" />
      <circle cx="60" cy="80" r="26" fill="#E8A0B0" opacity="0.28" />
      {/* Mid petals */}
      <circle cx="48" cy="50" r="22" fill="#E8899A" opacity="0.4" />
      <circle cx="72" cy="50" r="22" fill="#E8899A" opacity="0.38" />
      <circle cx="60" cy="68" r="22" fill="#E8899A" opacity="0.35" />
      {/* Inner glow */}
      <circle cx="60" cy="58" r="16" fill="#D4758A" opacity="0.35" />
      {/* Yellow center */}
      <circle cx="60" cy="58" r="12" fill="#F5E0A0" opacity="0.7" />
      <circle cx="60" cy="58" r="8" fill="#EDD580" opacity="0.6" />
    </svg>
  </motion.div>
);

/* ── Small soft flower (pink, simpler) ── */
const SmallSoftFlower = ({ size, delay, x, y, rotate }: {
  size: number; delay: number; x: string; y: string; rotate: number;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{
      opacity: 0.9,
      scale: [1, 1.08, 0.95, 1.04, 1],
      rotate: [rotate, rotate - 5, rotate + 4, rotate],
    }}
    transition={{
      opacity: { duration: 1.8, delay, ease: 'easeOut' },
      scale: { duration: 8, delay, ease: 'easeInOut', repeat: Infinity },
      rotate: { duration: 12, delay, ease: 'easeInOut', repeat: Infinity },
    }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <circle cx="40" cy="22" r="16" fill="#F0B0C0" opacity="0.4" />
      <circle cx="22" cy="42" r="16" fill="#F0B0C0" opacity="0.38" />
      <circle cx="58" cy="42" r="16" fill="#F0B0C0" opacity="0.38" />
      <circle cx="30" cy="56" r="15" fill="#F0B0C0" opacity="0.35" />
      <circle cx="50" cy="56" r="15" fill="#F0B0C0" opacity="0.35" />
      {/* center */}
      <circle cx="40" cy="40" r="10" fill="#F5E0A0" opacity="0.65" />
      <circle cx="40" cy="40" r="6" fill="#EDD580" opacity="0.5" />
    </svg>
  </motion.div>
);

/* ── Scalloped green flower ── */
const GreenScallop = ({ size, delay, x, y, rotate }: {
  size: number; delay: number; x: string; y: string; rotate: number;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{
      opacity: 0.85,
      scale: [1, 1.06, 0.96, 1.03, 1],
      rotate: [rotate, rotate + 6, rotate - 4, rotate],
    }}
    transition={{
      opacity: { duration: 1.6, delay, ease: 'easeOut' },
      scale: { duration: 9, delay, ease: 'easeInOut', repeat: Infinity },
      rotate: { duration: 13, delay, ease: 'easeInOut', repeat: Infinity },
    }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      {/* Scalloped petals around edge */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <circle
          key={i}
          cx={40 + Math.cos((a * Math.PI) / 180) * 18}
          cy={40 + Math.sin((a * Math.PI) / 180) * 18}
          r="12"
          fill="#B8D4B0"
          opacity={0.4 + (i % 3) * 0.05}
        />
      ))}
      {/* Inner fill */}
      <circle cx="40" cy="40" r="14" fill="#C8DCC0" opacity="0.5" />
      {/* Yellow center */}
      <circle cx="40" cy="40" r="8" fill="#F5E0A0" opacity="0.65" />
      <circle cx="40" cy="40" r="5" fill="#EDD580" opacity="0.5" />
    </svg>
  </motion.div>
);

/* ── Soft teardrop leaf ── */
const SoftLeaf = ({ x, y, rotate, delay, size = 60, flip = false }: {
  x: string; y: string; rotate: number; delay: number; size?: number; flip?: boolean;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: x, top: y, width: size, height: size * 1.6, transform: flip ? 'scaleX(-1)' : undefined }}
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{
      opacity: 0.7,
      scale: [1, 1.04, 0.97, 1],
      rotate: [rotate, rotate + 5, rotate - 3, rotate],
    }}
    transition={{
      opacity: { duration: 1.6, delay },
      scale: { duration: 11, delay, ease: 'easeInOut', repeat: Infinity },
      rotate: { duration: 15, delay, ease: 'easeInOut', repeat: Infinity },
    }}
  >
    <svg viewBox="0 0 60 100" className="w-full h-full" fill="none">
      <path d="M30 5 Q50 30 48 55 Q45 80 30 95 Q15 80 12 55 Q10 30 30 5Z"
        fill="#C0D8B8" opacity="0.55" />
      <path d="M30 5 Q45 28 44 50 Q42 72 30 88 Q18 72 16 50 Q14 28 30 5Z"
        fill="#B0CCA8" opacity="0.35" />
    </svg>
  </motion.div>
);

/* ── Drifting petal ── */
const DriftingPetal = ({ color, delay, startX, startY }: {
  color: string; delay: number; startX: string; startY: string;
}) => (
  <motion.div
    className="absolute pointer-events-none will-change-transform"
    style={{ left: startX, top: startY, width: 16, height: 22 }}
    animate={{
      opacity: [0, 0.45, 0.4, 0.25, 0],
      y: [0, 45, 100, 160, 220],
      x: [0, 14, -10, 16, 6],
      rotate: [0, 30, 60, 100, 150],
    }}
    transition={{ duration: 11, delay, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}
  >
    <svg viewBox="0 0 18 24" className="w-full h-full" fill="none">
      <ellipse cx="9" cy="12" rx="7" ry="10" fill={color} opacity="0.4" />
    </svg>
  </motion.div>
);

const HeroFlowers = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* ── Top-left cluster ── */}
    <SoftPeony size={170} delay={0.2} x="-40px" y="-35px" rotate={5} />
    <SmallSoftFlower size={65} delay={0.6} x="90px" y="15px" rotate={-10} />
    <SoftLeaf x="60px" y="80px" rotate={25} delay={0.4} size={45} />
    <GreenScallop size={50} delay={0.8} x="30px" y="110px" rotate={12} />

    {/* ── Top-right cluster ── */}
    <SoftPeony size={140} delay={0.4} x="calc(100% - 80px)" y="-30px" rotate={-8} />
    <GreenScallop size={55} delay={0.7} x="calc(100% - 65px)" y="75px" rotate={20} />
    <SoftLeaf x="calc(100% - 120px)" y="10px" rotate={-30} delay={0.5} size={50} flip />
    <SmallSoftFlower size={50} delay={0.9} x="calc(100% - 140px)" y="80px" rotate={15} />

    {/* ── Bottom-left cluster ── */}
    <SoftPeony size={155} delay={0.5} x="-30px" y="calc(100% - 100px)" rotate={-6} />
    <GreenScallop size={48} delay={0.9} x="85px" y="calc(100% - 55px)" rotate={-15} />
    <SoftLeaf x="75px" y="calc(100% - 130px)" rotate={-20} delay={0.7} size={42} />

    {/* ── Bottom-right cluster ── */}
    <SoftPeony size={130} delay={0.6} x="calc(100% - 75px)" y="calc(100% - 85px)" rotate={12} />
    <SmallSoftFlower size={55} delay={0.85} x="calc(100% - 140px)" y="calc(100% - 50px)" rotate={-8} />
    <SoftLeaf x="calc(100% - 155px)" y="calc(100% - 120px)" rotate={35} delay={0.75} size={40} flip />

    {/* ── Scattered middle accents ── */}
    <SmallSoftFlower size={40} delay={1.0} x="20%" y="35%" rotate={20} />
    <GreenScallop size={35} delay={1.1} x="75%" y="45%" rotate={-10} />
    <SoftLeaf x="50%" y="25%" rotate={15} delay={0.9} size={35} />

    {/* ── Drifting petals ── */}
    <DriftingPetal color="#F0B0C0" delay={0} startX="15%" startY="3%" />
    <DriftingPetal color="#C0D8B8" delay={2.5} startX="80%" startY="2%" />
    <DriftingPetal color="#F0B0C0" delay={4} startX="45%" startY="0%" />
    <DriftingPetal color="#C0D8B8" delay={6} startX="65%" startY="5%" />
    <DriftingPetal color="#F0B0C0" delay={1.5} startX="30%" startY="1%" />
    <DriftingPetal color="#C0D8B8" delay={7.5} startX="55%" startY="7%" />
  </div>
);

export default HeroFlowers;
