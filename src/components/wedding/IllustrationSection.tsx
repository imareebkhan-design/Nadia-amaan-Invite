import { motion } from 'framer-motion';
import { CoupleParallax } from './HeroAnimations';
import coupleIllustration from '@/assets/couple-illustration.png';

const IllustrationSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full pt-0 -mt-20 pb-12 px-6 flex flex-col items-center text-center"
      style={{ backgroundColor: 'hsl(var(--wedding-cream))' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8">
        <CoupleParallax>
          <img
            src={coupleIllustration}
            alt="Couple illustration"
            className="w-full max-w-3xl mx-auto mix-blend-multiply"
            loading="lazy"
          />
        </CoupleParallax>
      </div>
    </motion.section>
  );
};

export default IllustrationSection;
