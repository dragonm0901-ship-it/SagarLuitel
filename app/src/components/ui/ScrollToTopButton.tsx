import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleHoverStart = () => {
    controls.start({
      y: [0, -56, 56, 0],
      transition: { 
        duration: 1.0,
        times: [0, 0.4, 0.41, 1],
        ease: ["circIn", "linear", "circOut"]
      }
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={handleHoverStart}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[200] w-9 h-9 md:w-14 md:h-14 rounded-full bg-brand-primary dark:bg-brand-third text-white shadow-[0_10px_30px_-10px_rgba(15,123,255,0.5)] dark:shadow-[0_10px_30px_-10px_rgba(255,147,15,0.5)] border border-brand-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(15,123,255,0.7)] dark:hover:shadow-[0_15px_40px_-10px_rgba(255,147,15,0.7)] group overflow-hidden flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={controls}
            initial={{ y: 0 }}
          >
            <ArrowUp className="w-4 h-4 md:w-6 md:h-6" />
          </motion.div>
          
          {/* Subtle Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-brand-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300 -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
