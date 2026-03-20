import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function PremiumIntro() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    tl.to(".intro-text", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "expo.out",
    })
    .to(".intro-text", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.in",
      delay: 0.5,
    })
    .to(".intro-bg", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black intro-bg"
          exit={{ opacity: 0 }}
        >
          <div className="text-center overflow-hidden">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tighter intro-text opacity-0 translate-y-10">
              SAGAR LUITEL
            </h1>
            <p className="text-[#F5C518] text-sm tracking-[0.3em] font-medium mt-4 intro-text opacity-0 translate-y-10">
              FRONT END MAGICIAN
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
