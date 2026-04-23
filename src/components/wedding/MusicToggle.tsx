import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  autoStart?: boolean;
}

const MusicToggle = ({ autoStart = false }: MusicToggleProps) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (autoStart && !startedRef.current && audioRef.current) {
      startedRef.current = true;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [autoStart]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      onClick={toggle}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "hsl(var(--wedding-cream))",
        border: "1px solid hsl(var(--wedding-gold) / 0.3)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Mute music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
            <Volume2 className="w-4 h-4" style={{ color: "hsl(var(--wedding-green))" }} />
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
            <VolumeX className="w-4 h-4" style={{ color: "hsl(var(--wedding-green) / 0.5)" }} />
          </motion.div>
        )}
      </AnimatePresence>
      {playing && (
        <motion.div className="absolute inset-[-3px] rounded-full" style={{ border: "1.5px solid hsl(var(--wedding-gold) / 0.3)" }}
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} />
      )}
    </motion.button>
  );
};

export default MusicToggle;
