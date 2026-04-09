import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import eventsImage from "@/assets/events-banquet.jpg";

const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center"
      style={{ background: "transparent", paddingTop: "52px", paddingBottom: "48px" }}
    >
      <p className="uppercase" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em", marginBottom: "12px" }}>
        An Evening of Celebration
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: "#4A7C59", fontWeight: 400, marginBottom: "8px" }}>
        The Festivities
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", color: "#999" }}>
        Sunday, 17th May 2026 · L'Elegant Banquet Hall, Delhi
      </p>
      <div className="flex items-center justify-center gap-3 mt-6">
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
        <div className="rotate-45" style={{ width: "6px", height: "6px", background: "#C9A84C" }} />
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
      </div>
    </motion.div>
  );
};

interface TimelineItemProps {
  time: string;
  label: string;
  delay: number;
  isInView: boolean;
}

const TimelineItem = ({ time, label, delay, isInView }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 relative"
  >
    <div
      className="shrink-0 relative z-10"
      style={{
        width: "11px",
        height: "11px",
        borderRadius: "50%",
        border: "1.5px solid rgba(168,197,160,0.7)",
        background: "rgba(168,197,160,0.2)",
        boxShadow: "0 0 6px rgba(168,197,160,0.3)",
      }}
    />
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "#A8C5A0", minWidth: "70px" }}>
      {time}
    </span>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,248,244,0.8)" }}>
      {label}
    </span>
  </motion.div>
);

interface PillProps {
  text: string;
}

const GlassPill = ({ text }: PillProps) => (
    <div
      className="flex items-center gap-2"
      style={{
        padding: "6px 14px",
        borderRadius: "40px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "0.5px solid rgba(255,255,255,0.25)",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #A8C5A0, #6BA368)",
          boxShadow: "0 0 4px rgba(168,197,160,0.5)",
          flexShrink: 0,
        }}
      />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,248,244,0.85)" }}>
        {text}
      </span>
    </div>
);

/* Animated liquid glass blob */
const LiquidBlob = ({ className, style }: { className?: string; style: React.CSSProperties }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className || ""}`}
    style={{
      filter: "blur(60px)",
      ...style,
    }}
    animate={{
      scale: [1, 1.2, 0.95, 1.1, 1],
      x: [0, 15, -10, 8, 0],
      y: [0, -12, 8, -5, 0],
      opacity: [0.4, 0.6, 0.35, 0.55, 0.4],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const WaleemaBlock = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "580px" }}
    >
      {/* Background image */}
      <img
        src={eventsImage}
        alt="Elegant banquet hall"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle gradient overlay — no blur so image stays sharp */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.15) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 40%)",
        }}
      />

      {/* Liquid glass blobs — lighter blur for dreamy glow */}
      <LiquidBlob
        style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(74,124,89,0.3) 0%, rgba(106,163,104,0.12) 60%, transparent 100%)",
          filter: "blur(40px)",
          top: "8%",
          right: "8%",
        }}
      />
      <LiquidBlob
        className="hidden md:block"
        style={{
          width: "160px",
          height: "160px",
          background: "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
          bottom: "12%",
          right: "22%",
        }}
      />
      <LiquidBlob
        style={{
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(74,124,89,0.25) 0%, transparent 70%)",
          filter: "blur(35px)",
          top: "55%",
          right: "38%",
        }}
      />

      {/* Content panel — glass card on the right */}
      <div
        className="relative md:absolute md:inset-y-0 md:right-0 flex flex-col justify-center w-full md:w-[52%] p-6 sm:p-8 md:p-10 pt-48 md:pt-10"
      >
        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(40px) saturate(1.8) brightness(1.1)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8) brightness(1.1)",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.1), 0 0 0 0.5px rgba(255,255,255,0.2)",
            padding: "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner shimmer highlight */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "-20%",
              width: "140%",
              height: "60%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              borderRadius: "50%",
            }}
            animate={{
              opacity: [0.2, 0.35, 0.2],
              rotate: [0, 2, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <p
            className="uppercase relative z-10"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              color: "#A8C5A0",
              letterSpacing: "0.22em",
              marginBottom: "12px",
            }}
          >
            Waleema — Wedding Reception
          </p>

          <h3
            className="text-[32px] md:text-[40px] relative z-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFF8F4",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            The<br />Celebration
          </h3>

          <p
            className="relative z-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "rgba(255,248,244,0.7)",
              maxWidth: "300px",
              marginBottom: "28px",
              lineHeight: 1.5,
            }}
          >
            An evening of joy, gratitude, and celebration as two families come together in love and blessings.
          </p>

          <div className="flex flex-wrap gap-2 mb-7 relative z-10">
            <GlassPill text="7:00 PM Onwards" />
            <GlassPill text="L'Elegant Banquet Hall, Delhi" />
          </div>

          <div className="relative flex flex-col gap-4 z-10" style={{ paddingLeft: "5px" }}>
            <div className="absolute" style={{ left: "5px", top: "6px", bottom: "6px", width: "0.5px", background: "rgba(168,197,160,0.3)" }} />
            <TimelineItem time="07:00 PM" label="Doors open & welcome" delay={0} isInView={isInView} />
            <TimelineItem time="08:00 PM" label="Dinner & celebrations" delay={0.15} isInView={isInView} />
            <TimelineItem time="09:00 PM" label="Blessings & festivities" delay={0.3} isInView={isInView} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 flex items-start gap-3 relative z-10"
            style={{ paddingLeft: "2px" }}
          >
            <div
              className="shrink-0 mt-1"
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "10px" }}>✨</span>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: "#A8C5A0", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px" }}>Attire</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "14px", color: "rgba(255,248,244,0.6)", lineHeight: 1.5, maxWidth: "280px" }}>
                Formal & festive — dress to celebrate ✦
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Dress Code Visual Guide ── */
const DressCodeGuide = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const swatches = [
    { color: '#2D4A3E', label: 'Emerald' },
    { color: '#C9A84C', label: 'Gold' },
    { color: '#1A1A2E', label: 'Navy' },
    { color: '#8B2252', label: 'Burgundy' },
    { color: '#F4E8D1', label: 'Ivory' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center"
      style={{ background: "transparent", padding: "40px 24px 52px" }}
    >
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "12px" }}>
        Suggested Palette
      </p>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#4A7C59", fontWeight: 400, marginBottom: "8px" }}>
        What to Wear
      </h3>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "15px", color: "#999", marginBottom: "28px", maxWidth: "320px", marginLeft: "auto", marginRight: "auto" }}>
        Formal & festive — here are some tones that complement the evening
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {swatches.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="rounded-full"
              style={{
                width: 44,
                height: 44,
                background: s.color,
                border: '2px solid rgba(201,168,76,0.2)',
                boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
              }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
        <div className="rotate-45" style={{ width: "6px", height: "6px", background: "#C9A84C" }} />
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
      </div>
    </motion.div>
  );
};

const EventsSection = () => {
  return (
    <section id="events" className="relative overflow-hidden">
      <SectionHeader />
      <WaleemaBlock />
      
    </section>
  );
};

export default EventsSection;
