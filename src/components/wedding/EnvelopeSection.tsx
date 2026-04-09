import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnvelopeSectionProps {
  onOpen: () => void;
  guestName?: string;
}

/* ── Tiny botanical SVG leaves for corners ── */
const LeafCorner = ({ flip = false, rotate = 0 }: { flip?: boolean; rotate?: number }) => (
  <svg
    viewBox="0 0 40 40"
    className="w-8 h-8 md:w-10 md:h-10"
    fill="none"
    style={{ transform: `${flip ? 'scaleX(-1)' : ''} rotate(${rotate}deg)` }}
  >
    <path d="M4 36 Q4 20 12 12 Q20 4 36 4" stroke="#4A7C59" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M8 32 Q10 18 18 12 Q26 6 36 8" stroke="#4A7C59" strokeWidth="0.5" fill="none" opacity="0.25" />
    <path d="M14 28 C14 20 20 14 28 14" stroke="#E06B82" strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="36" cy="4" r="1.5" fill="#E06B82" opacity="0.3" />
  </svg>
);

/* ── Floating petal particle ── */
const FloatingPetal = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size * 0.6,
      background: 'radial-gradient(ellipse, rgba(224,107,130,0.15), rgba(224,107,130,0.05))',
      left: `${x}%`,
      top: '-5%',
    }}
    animate={{
      y: ['0vh', '110vh'],
      x: [0, Math.sin(delay) * 30],
      rotate: [0, 360],
      opacity: [0, 0.6, 0.4, 0],
    }}
    transition={{
      duration: 8 + delay * 2,
      delay: delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

const CONFETTI_COLORS = ['#F4A7B4','#E06B82','#F5D97A','#4A7C59','#A8C5A0','#C8CFC0','#F08040'];

const EnvelopeSection = ({ onOpen, guestName }: EnvelopeSectionProps) => {
  const [stage, setStage] = useState<"sealed" | "breaking" | "opening" | "rising" | "done">("sealed");
  const isMobile = useIsMobile();
  const inviteText = useMemo(() => guestName ? `Dear ${guestName}, you are invited` : 'You have been invited', [guestName]);

  const handleSealClick = () => {
    if (stage !== "sealed") return;
    setStage("breaking");
    setTimeout(() => setStage("opening"), 900);
    setTimeout(() => setStage("rising"), 2200);
    setTimeout(() => setStage("done"), 3800);
    setTimeout(() => onOpen(), 4800);
  };

  if (stage === "done") {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ pointerEvents: "none", backgroundColor: '#EDEEE8' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    );
  }

  const ENV_W = isMobile ? 300 : 440;
  const ENV_H = isMobile ? 210 : 300;
  const HALF_W = ENV_W / 2;
  const FLAP_H = ENV_H * 0.42;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#EDEEE8' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft ambient background petals */}
      {[0, 1.2, 2.5, 3.8, 5].map((d, i) => (
        <FloatingPetal key={i} delay={d} x={10 + i * 18} size={6 + i * 2} />
      ))}

      {/* Large soft glow behind envelope */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isMobile ? 350 : 550,
          height: isMobile ? 350 : 550,
          background: 'radial-gradient(circle, rgba(224,107,130,0.06) 0%, rgba(74,124,89,0.03) 40%, transparent 70%)',
        }}
        animate={
          stage === "rising"
            ? { scale: 3, opacity: 0 }
            : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }
        }
        transition={
          stage === "rising"
            ? { duration: 1.5, ease: "easeOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Top text */}
      <AnimatePresence>
        {stage === "sealed" && (
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ top: isMobile ? '14%' : '18%' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: '#4A7C59', opacity: 0.5, fontFamily: "'DM Sans', sans-serif" }}
            >
              {inviteText}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 md:w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(224,107,130,0.3))' }} />
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#E06B82', opacity: 0.4 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="w-8 md:w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(224,107,130,0.3))' }} />
            </div>
            <p
              className="mt-3 text-[10px] md:text-xs tracking-[0.2em]"
              style={{ color: '#7A9070', fontFamily: "'DM Sans', sans-serif" }}
            >
              Tap the seal to reveal
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope wrapper */}
      <motion.div
        className="relative"
        style={{ width: ENV_W, height: ENV_H, perspective: 1200 }}
        animate={
          stage === "rising"
            ? { scale: 0.8, y: 50, opacity: 0 }
            : stage === "breaking"
            ? { scale: 1.03 }
            : {}
        }
        transition={
          stage === "rising"
            ? { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.3 }
        }
      >
        {/* ENVELOPE BACK — sage green body */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background: '#C8CFC0',
            border: '1.5px solid rgba(74,124,89,0.12)',
            boxShadow: '0 8px 40px rgba(80,100,70,0.18), 0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Subtle linen texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }} />
        </div>

        {/* Botanical corner decorations */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-[2]">
          <LeafCorner rotate={0} />
        </div>
        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-[2]">
          <LeafCorner flip rotate={0} />
        </div>
        <div className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 z-[2]" style={{ transform: 'rotate(180deg) scaleX(-1)' }}>
          <LeafCorner />
        </div>
        <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 z-[2]" style={{ transform: 'rotate(180deg)' }}>
          <LeafCorner />
        </div>

        {/* Thin inner decorative border */}
        <div
          className="absolute rounded-lg z-[2]"
          style={{
            inset: isMobile ? 10 : 16,
            border: '0.5px solid rgba(74,124,89,0.08)',
          }}
        />

        {/* ── LETTER CARD (rises out) ── */}
        <motion.div
          className="absolute rounded-lg flex flex-col items-center justify-center z-[5]"
          style={{
            left: isMobile ? 18 : 28,
            right: isMobile ? 18 : 28,
            top: isMobile ? 14 : 20,
            height: ENV_H - (isMobile ? 28 : 40),
            background: 'linear-gradient(170deg, #FFFFFF 0%, #FFF9F5 50%, #FFF5EF 100%)',
            border: '0.5px solid rgba(224,107,130,0.12)',
            boxShadow: '0 2px 12px rgba(74,124,89,0.06)',
          }}
          animate={
            stage === "rising"
              ? { y: -300, scale: 1.06, opacity: 0, rotateX: -5 }
              : { y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tiny leaf motif top */}
          <svg viewBox="0 0 40 12" className="w-8 md:w-10 mb-1.5 md:mb-2" fill="none">
            <path d="M20 10 C16 6 10 4 4 6" stroke="#4A7C59" strokeWidth="0.6" fill="none" opacity="0.3" />
            <path d="M20 10 C24 6 30 4 36 6" stroke="#4A7C59" strokeWidth="0.6" fill="none" opacity="0.3" />
            <circle cx="20" cy="10" r="1" fill="#E06B82" opacity="0.4" />
          </svg>

          <p
            className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase"
            style={{ color: '#4A7C59', opacity: 0.45, fontFamily: "'DM Sans', sans-serif" }}
          >
            You are cordially invited
          </p>

          <p
            className="font-display mt-1 md:mt-2"
            style={{ color: '#E06B82', fontSize: isMobile ? 26 : 36, lineHeight: 1.1 }}
          >
            Amaan & Nadia
          </p>

          <div className="flex items-center gap-2 my-1.5 md:my-2.5">
            <div className="w-6 md:w-8 h-px" style={{ background: 'rgba(74,124,89,0.15)' }} />
            <div className="w-1 h-1 rotate-45" style={{ background: '#E06B82', opacity: 0.3 }} />
            <div className="w-6 md:w-8 h-px" style={{ background: 'rgba(74,124,89,0.15)' }} />
          </div>

          <p
            className="text-[9px] md:text-xs tracking-[0.15em]"
            style={{ color: '#4A7C59', opacity: 0.55, fontFamily: "'DM Sans', sans-serif" }}
          >
            Sunday, 17th May 2026
          </p>
          <p
            className="text-[7px] md:text-[9px] mt-0.5 tracking-wider"
            style={{ color: '#4A7C59', opacity: 0.35, fontFamily: "'DM Sans', sans-serif" }}
          >
            L'Elegant Banquet Hall, Delhi
          </p>

          {/* Tiny leaf motif bottom */}
          <svg viewBox="0 0 40 12" className="w-8 md:w-10 mt-1.5 md:mt-2 rotate-180" fill="none">
            <path d="M20 10 C16 6 10 4 4 6" stroke="#4A7C59" strokeWidth="0.6" fill="none" opacity="0.3" />
            <path d="M20 10 C24 6 30 4 36 6" stroke="#4A7C59" strokeWidth="0.6" fill="none" opacity="0.3" />
            <circle cx="20" cy="10" r="1" fill="#E06B82" opacity="0.4" />
          </svg>
        </motion.div>

        {/* ── ENVELOPE FRONT BOTTOM ── */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-xl"
          style={{
            height: '56%',
            background: '#C8CFC0',
            zIndex: 10,
          }}
        />

        {/* Left fold */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: 0, height: 0,
            borderLeft: `${HALF_W}px solid #B0BAA8`,
            borderTop: `${ENV_H * 0.56}px solid transparent`,
            zIndex: 11, borderBottomLeftRadius: 10,
          }}
        />

        {/* Right fold */}
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: 0, height: 0,
            borderRight: `${HALF_W}px solid #B0BAA8`,
            borderTop: `${ENV_H * 0.56}px solid transparent`,
            zIndex: 11, borderBottomRightRadius: 10,
          }}
        />

        {/* Fold edge highlight */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '56%',
            zIndex: 12,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 20%)',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />

        {/* Subtle vine pattern on front */}
        <svg
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[60%] md:w-[55%] opacity-[0.08]"
          style={{ zIndex: 12, pointerEvents: 'none' }}
          viewBox="0 0 200 30"
          fill="none"
        >
          <path d="M10 20 Q50 5 100 15 Q150 25 190 10" stroke="#FFF8F4" strokeWidth="0.8" />
          <path d="M30 18 Q40 10 50 14" stroke="#FFF8F4" strokeWidth="0.5" />
          <path d="M80 14 Q90 8 100 12" stroke="#FFF8F4" strokeWidth="0.5" />
          <path d="M140 18 Q150 10 165 15" stroke="#FFF8F4" strokeWidth="0.5" />
        </svg>

        {/* ── ENVELOPE FLAP ── */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            top: 0,
            zIndex: stage === "opening" || stage === "rising" ? 4 : 20,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          animate={stage === "opening" || stage === "rising" ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            style={{
              width: 0, height: 0,
              borderLeft: `${HALF_W}px solid transparent`,
              borderRight: `${HALF_W}px solid transparent`,
              borderTop: `${FLAP_H}px solid #B8C4AE`,
              filter: "drop-shadow(0 2px 3px rgba(74,124,89,0.15))",
            }}
          />
          {/* Flap inner gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderLeft: `${HALF_W}px solid transparent`,
              borderRight: `${HALF_W}px solid transparent`,
              borderTop: `${FLAP_H}px solid rgba(255,255,255,0.05)`,
            }}
          />
        </motion.div>

        {/* ── WAX SEAL ── */}
        <AnimatePresence>
          {(stage === "sealed" || stage === "breaking") && (
            <motion.button
              className="absolute z-30 cursor-pointer focus:outline-none"
              style={{
                left: "50%",
                top: "34%",
                marginLeft: isMobile ? -26 : -34,
                marginTop: isMobile ? -26 : -34,
              }}
              onClick={handleSealClick}
              whileHover={stage === "sealed" ? { scale: 1.08 } : {}}
              whileTap={stage === "sealed" ? { scale: 0.92 } : {}}
              animate={
                stage === "breaking"
                  ? { scale: [1, 1.4, 0], rotate: [0, 25, -20], opacity: [1, 0.7, 0] }
                  : {}
              }
              exit={{ scale: 0, opacity: 0 }}
              transition={stage === "breaking" ? { duration: 0.9, ease: "easeInOut" } : {}}
            >
              {/* Outer glow ring */}
              {stage === "sealed" && (
                <>
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: -8,
                      background: 'radial-gradient(circle, rgba(224,107,130,0.1) 0%, transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: -4, border: '1.5px solid rgba(224,107,130,0.2)' }}
                    animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </>
              )}

              {/* Seal body */}
              <div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  width: isMobile ? 52 : 68,
                  height: isMobile ? 52 : 68,
                  background: 'radial-gradient(circle at 35% 35%, #EE8A9E, #E06B82 50%, #B84D6A)',
                  boxShadow: '0 3px 14px rgba(200,80,110,0.38), inset 0 1px 2px rgba(255,255,255,0.2)',
                }}
              >
                {/* Inner rings */}
                <div className="absolute rounded-full" style={{ inset: isMobile ? 3 : 4, border: '1px solid rgba(255,200,210,0.25)' }} />
                <div className="absolute rounded-full" style={{ inset: isMobile ? 7 : 9, border: '0.5px solid rgba(255,200,210,0.15)' }} />

                {/* Monogram */}
                <span
                  className="font-display relative z-10"
                  style={{
                    fontSize: isMobile ? 16 : 22,
                    color: 'rgba(255,240,244,0.85)',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                  }}
                >
                  A & N
                </span>

                {/* Wax texture highlight */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: '12%', left: '18%',
                    width: '35%', height: '25%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom text */}
      <AnimatePresence>
        {stage === "sealed" && (
          <motion.p
            className="absolute text-[9px] md:text-[10px] tracking-[0.2em]"
            style={{
              bottom: isMobile ? '16%' : '20%',
              color: '#7A9070',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: isMobile ? 11 : 13,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            17th May 2026 · Delhi
          </motion.p>
        )}
      </AnimatePresence>

      {/* Burst particles on open */}
      <AnimatePresence>
        {(stage === "opening" || stage === "rising") && (
          <>
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 14;
              const dist = isMobile ? 50 : 90 + Math.random() * 50;
              const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    background: color,
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1.3, delay: 0.15 + i * 0.04, ease: "easeOut" }}
                />
              );
            })}
            {/* Soft light burst */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 200, height: 200,
                left: '50%', top: '50%',
                marginLeft: -100, marginTop: -100,
                background: 'radial-gradient(circle, rgba(224,107,130,0.15) 0%, transparent 60%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnvelopeSection;
