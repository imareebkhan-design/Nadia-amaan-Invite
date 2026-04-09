import { useRef } from "react";
import { motion, useInView } from "framer-motion";


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
      <p
        className="uppercase"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          color: "#C9A84C",
          letterSpacing: "0.22em",
          marginBottom: "12px",
        }}
      >
        An Evening of Celebration
      </p>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "36px",
          color: "#2D2D2D",
          fontWeight: 400,
          marginBottom: "8px",
        }}
      >
        The Festivities
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "16px",
          color: "#999",
        }}
      >
        Sunday, 17th May 2026 · L'Elegant Banquet Hall, Delhi
      </p>
      {/* Ornament divider */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
        <div
          className="rotate-45"
          style={{ width: "6px", height: "6px", background: "#C9A84C" }}
        />
        <div style={{ width: "60px", height: "0.5px", background: "#E0C8B0" }} />
      </div>
    </motion.div>
  );
};

interface TimelineItemProps {
  time: string;
  label: string;
  dotColor: string;
  timeColor: string;
  labelColor: string;
  fillColor: string;
  delay: number;
  isInView: boolean;
  isLast?: boolean;
}

const TimelineItem = ({ time, label, dotColor, timeColor, labelColor, fillColor, delay, isInView }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 relative"
    style={{ paddingLeft: "0px" }}
  >
    <div
      className="shrink-0 relative z-10"
      style={{
        width: "11px",
        height: "11px",
        borderRadius: "50%",
        border: `1.5px solid ${dotColor}`,
        background: fillColor,
      }}
    />
    <span
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        color: timeColor,
        minWidth: "70px",
      }}
    >
      {time}
    </span>
    <span
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        color: labelColor,
      }}
    >
      {label}
    </span>
  </motion.div>
);

interface PillProps {
  text: string;
  bg: string;
  border: string;
  color: string;
  dotColor: string;
}

const Pill = ({ text, bg, border, color, dotColor }: PillProps) => (
  <div
    className="flex items-center gap-2"
    style={{
      padding: "6px 14px",
      borderRadius: "40px",
      background: bg,
      border: `0.5px solid ${border}`,
    }}
  >
    <div
      style={{
        width: "11px",
        height: "11px",
        borderRadius: "50%",
        background: dotColor,
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px",
        color,
      }}
    >
      {text}
    </span>
  </div>
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
      style={{ minHeight: "560px" }}
    >
      <img
        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80"
        alt="Elegant banquet hall"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay — desktop: right gradient */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: "linear-gradient(to left, rgba(20,35,25,0.95) 42%, rgba(20,35,25,0.55) 70%, transparent 100%)",
        }}
      />
      {/* Mobile overlay */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(20,35,25,0.3) 0%, rgba(20,35,25,0.92) 40%)",
        }}
      />

      {/* Content */}
      <div
        className="relative md:absolute md:inset-y-0 md:right-0 flex flex-col justify-center w-full md:w-[52%] p-6 sm:p-8 md:p-10 pt-48 md:pt-10"
      >
        <p
          className="uppercase"
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
          className="text-[32px] md:text-[42px]"
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
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "17px",
            color: "rgba(255,248,244,0.75)",
            maxWidth: "300px",
            marginBottom: "28px",
            lineHeight: 1.5,
          }}
        >
          An evening of joy, gratitude, and celebration as two families come together in love and blessings.
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          <Pill
            text="7:00 PM Onwards"
            bg="rgba(168,197,160,0.15)"
            border="rgba(168,197,160,0.4)"
            color="#A8C5A0"
            dotColor="#A8C5A0"
          />
          <Pill
            text="L'Elegant Banquet Hall, Kalindi Kunj, Delhi"
            bg="rgba(168,197,160,0.15)"
            border="rgba(168,197,160,0.4)"
            color="#A8C5A0"
            dotColor="#A8C5A0"
          />
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-4" style={{ paddingLeft: "5px" }}>
          <div
            className="absolute"
            style={{
              left: "5px",
              top: "6px",
              bottom: "6px",
              width: "0.5px",
              background: "rgba(168,197,160,0.3)",
            }}
          />
          <TimelineItem time="07:00 PM onwards" label="Doors open & welcome" dotColor="#A8C5A0" timeColor="#A8C5A0" labelColor="rgba(255,248,244,0.8)" fillColor="transparent" delay={0} isInView={isInView} />
          <TimelineItem time="08:00 PM onwards" label="Dinner & celebrations" dotColor="#A8C5A0" timeColor="#A8C5A0" labelColor="rgba(255,248,244,0.8)" fillColor="transparent" delay={0.15} isInView={isInView} />
          <TimelineItem time="09:00 PM onwards" label="Blessings & festivities" dotColor="#A8C5A0" timeColor="#A8C5A0" labelColor="rgba(255,248,244,0.8)" fillColor="transparent" delay={0.3} isInView={isInView} isLast />
        </div>

        {/* Attire */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 flex items-start gap-3"
          style={{ paddingLeft: "2px" }}
        >
          <div
            className="shrink-0 mt-1"
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "4px",
              background: "rgba(168,197,160,0.12)",
              border: "0.5px solid rgba(168,197,160,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "10px" }}>✨</span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#A8C5A0",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Attire
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "rgba(255,248,244,0.65)",
                lineHeight: 1.5,
                maxWidth: "280px",
              }}
            >
              Formal & festive — dress to celebrate ✦
            </p>
          </div>
        </motion.div>
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
