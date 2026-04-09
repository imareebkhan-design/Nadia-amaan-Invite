import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "light" | "dark" | "dark-to-light" | "light-to-dark";
}

const SectionDivider = ({ variant = "light" }: SectionDividerProps) => {
  const bgFrom = variant === "dark" || variant === "dark-to-light"
    ? "hsl(152, 35%, 15%)"
    : "hsl(var(--wedding-cream))";
  const bgTo = variant === "dark" || variant === "light-to-dark"
    ? "hsl(152, 35%, 15%)"
    : "hsl(var(--wedding-cream))";

  return (
    <div className="relative py-8 overflow-hidden" style={{ background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})` }}>
      <div className="flex items-center justify-center gap-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 md:w-28 h-px origin-right"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--wedding-gold) / 0.3))" }}
        />
        <motion.svg
          viewBox="0 0 32 32"
          className="w-5 h-5"
          fill="none"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <path d="M16 2 L18 12 L28 14 L18 16 L16 26 L14 16 L4 14 L14 12 Z" fill="hsl(var(--wedding-gold))" opacity="0.25" />
          <circle cx="16" cy="14" r="2" fill="hsl(var(--wedding-gold))" opacity="0.35" />
        </motion.svg>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 md:w-28 h-px origin-left"
          style={{ background: "linear-gradient(to left, transparent, hsl(var(--wedding-gold) / 0.3))" }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
