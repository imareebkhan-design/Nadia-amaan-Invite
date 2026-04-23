import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { smoothScrollTo } from "@/lib/smoothScroll";

const sections = [
  { id: "hero", label: "Home" },
  { id: "countdown", label: "Date" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "blessings", label: "Duas" },
];

const FloatingNav = () => {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const tickingRef = useRef(false);
  const visibleRef = useRef(false);
  const activeRef = useRef("hero");

  useEffect(() => {
    // Cache section offsets — refresh on resize
    let offsets: { id: string; top: number }[] = [];
    const measure = () => {
      offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el
            ? { id: s.id, top: el.getBoundingClientRect().top + window.scrollY }
            : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
    };
    measure();
    const remeasure = () => measure();
    setTimeout(measure, 600);
    setTimeout(measure, 1500);

    const update = () => {
      tickingRef.current = false;
      const y = window.scrollY;
      const vh = window.innerHeight;

      const nextVisible = y > vh * 0.8;
      if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }

      const probe = y + vh / 3;
      let next = activeRef.current;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i].top <= probe) {
          next = offsets[i].id;
          break;
        }
      }
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("orientationchange", remeasure, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("orientationchange", remeasure);
    };
  }, []);

  const scrollTo = (id: string) => {
    smoothScrollTo(id, 1600);
    setMobileOpen(false);
  };

  // Opaque cream background (no backdrop-filter) — much cheaper to composite
  const panelBg = "hsl(var(--wedding-cream))";

  if (isMobile) {
    return (
      <AnimatePresence>
        {visible && (
          <>
            <motion.button
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: panelBg,
                border: "1px solid hsl(var(--wedding-gold) / 0.25)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" style={{ color: "hsl(var(--wedding-green))" }} />
              ) : (
                <Menu className="w-4 h-4" style={{ color: "hsl(var(--wedding-green))" }} />
              )}
            </motion.button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-16 left-4 z-50 rounded-2xl p-2 flex flex-col gap-0.5"
                  style={{
                    background: panelBg,
                    border: "1px solid hsl(var(--wedding-gold) / 0.25)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                    minWidth: 140,
                  }}
                >
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="relative px-4 py-2.5 rounded-xl text-xs tracking-[0.1em] uppercase transition-colors cursor-pointer text-left font-body"
                      style={{
                        color: active === s.id ? "white" : "hsl(var(--wedding-green))",
                        background:
                          active === s.id
                            ? "linear-gradient(135deg, hsl(var(--wedding-green)), hsl(var(--wedding-dark-green)))"
                            : "transparent",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: panelBg,
            border: "1px solid hsl(var(--wedding-gold) / 0.25)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="relative px-3 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors cursor-pointer font-body"
              style={{
                color: active === s.id ? "white" : "hsl(var(--wedding-green))",
              }}
            >
              {active === s.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--wedding-green)), hsl(var(--wedding-dark-green)))",
                    boxShadow: "0 2px 8px hsl(var(--wedding-green) / 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
