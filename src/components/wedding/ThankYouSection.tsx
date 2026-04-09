import { motion } from "framer-motion";
import { Heart } from "lucide-react";


const ThankYouSection = () => {
  return (
    <footer className="relative py-16 md:py-32 text-center overflow-hidden" style={{ backgroundColor: "transparent" }}>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--wedding-gold) / 0.06) 0%, transparent 50%)" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 max-w-lg mx-auto px-4 md:px-6">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
          className="text-sm md:text-lg italic leading-relaxed mb-6 md:mb-10 font-sub" style={{ color: "hsl(var(--wedding-green) / 0.5)" }}>
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </motion.p>

        <div className="w-12 h-px mx-auto mb-6 md:mb-10" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--wedding-gold) / 0.3), transparent)" }} />

        <motion.p className="text-4xl md:text-7xl mb-3 md:mb-4 font-display" style={{ color: "hsl(var(--wedding-deep-pink))" }}
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}>
          Ramya & Kishan
        </motion.p>
        <motion.p className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase mb-8 md:mb-10 font-body" style={{ color: "hsl(var(--wedding-green) / 0.5)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
          9 · 05 · 2026 · Bangalore
        </motion.p>

        <div className="w-20 h-px mx-auto mb-6 md:mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--wedding-gold) / 0.2), transparent)" }} />

        <motion.p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase mb-2 font-body" style={{ color: "hsl(var(--wedding-gold) / 0.6)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }}>
          #RamyaWedsKishan
        </motion.p>

        <motion.a href="https://shaadi.digital" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 mt-10 md:mt-14 group cursor-pointer"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }}>
          <p className="text-[10px] md:text-[11px] tracking-wider font-body" style={{ color: "hsl(var(--wedding-green) / 0.3)" }}>Made with</p>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <Heart className="w-3 h-3" style={{ color: "hsl(349, 60%, 65%, 0.5)" }} fill="hsl(349, 60%, 65%, 0.5)" />
          </motion.div>
          <p className="text-[10px] md:text-[11px] tracking-wider font-body" style={{ color: "hsl(var(--wedding-green) / 0.3)" }}>by</p>
          <span className="text-[11px] md:text-xs font-semibold tracking-wide font-body" style={{ color: "hsl(var(--wedding-gold) / 0.6)" }}>shaadi.digital</span>
        </motion.a>
      </motion.div>
    </footer>
  );
};

export default ThankYouSection;
