import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import venuePhoto from "@/assets/venue-photo.webp";


const VenueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="venue" ref={ref} className="relative py-20 md:py-36 overflow-hidden" style={{ backgroundColor: "transparent" }}>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--wedding-gold) / 0.04) 0%, transparent 60%)" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-10 md:mb-14 px-6">
        <p className="text-xs md:text-sm tracking-[0.25em] uppercase mb-3 font-body" style={{ color: "hsl(var(--wedding-gold))" }}>Join Us Here</p>
        <h2 className="text-2xl md:text-4xl font-display" style={{ color: "hsl(var(--wedding-green))" }}>The Venue</h2>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8">
        {/* Venue hero photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative overflow-hidden"
          style={{ borderRadius: '12px', marginBottom: '24px' }}
        >
          <img
            src={venuePhoto}
            alt="L'Elegant Banquet Hall"
            style={{ height: '200px' }}
            className="w-full object-cover sm:h-[240px] md:h-[300px]"
            loading="lazy"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255,248,244,0.8) 100%)' }}
          />
        </motion.div>
        <div className="max-w-lg mx-auto">

          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(145deg, white, hsl(var(--wedding-light-green) / 0.15))", border: "1px solid hsl(var(--wedding-green) / 0.12)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
            <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: "hsl(var(--wedding-green))" }}>The Waleema</h3>
            <p className="font-sub text-base" style={{ color: "hsl(var(--wedding-green))" }}>L'Elegant Banquet Hall, Delhi</p>
            <p className="font-body text-xs mt-2" style={{ color: "#999" }}>Kalindi Kunj, Delhi 110076</p>
            <p className="font-body text-xs mt-1 italic" style={{ color: "hsl(var(--wedding-gold))" }}>Evening Reception · Formal Setup</p>
            <p className="font-body text-sm mt-3 font-medium" style={{ color: "hsl(var(--wedding-green))" }}>7:00 PM Onwards, Sunday 17th May 2026</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl md:rounded-3xl overflow-hidden relative" style={{ boxShadow: "0 24px 64px hsl(var(--wedding-gold) / 0.08)", border: "1px solid hsl(var(--wedding-gold) / 0.15)" }}>
          <iframe src="https://maps.google.com/maps?q=L'Elegant+Banquet+Hall+Kalindi+Kunj+Delhi&output=embed" className="w-full h-[250px] md:h-[350px]" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="L'Elegant Banquet Hall Location" />
          <div className="p-5 md:p-8 bg-white relative">
            <motion.h3 className="font-display text-xl md:text-2xl mb-2" style={{ color: "hsl(var(--wedding-green))" }} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
              L'Elegant Banquet Hall
            </motion.h3>
            <motion.p className="font-body text-xs md:text-sm leading-relaxed mb-5 md:mb-6 max-w-2xl" style={{ color: "#999" }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}>
              An elegant banquet venue perfect for a beautiful evening of celebration and blessings.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }}>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                href="https://share.google/3a8JpXaaGKD8WNKhF" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium font-body transition-all"
                style={{ background: "linear-gradient(135deg, hsl(var(--wedding-green)), hsl(var(--wedding-dark-green)))", color: "white", boxShadow: "0 6px 20px hsl(var(--wedding-green) / 0.3)" }}>
                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" /> Get Directions
              </motion.a>
              <span className="flex items-center gap-2 text-xs md:text-sm font-body" style={{ color: "#999" }}>
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" style={{ color: "hsl(var(--wedding-green))" }} />
                Kalindi Kunj, Delhi 110076
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
