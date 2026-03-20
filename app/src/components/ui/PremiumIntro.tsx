import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function PremiumIntro({ onComplete }: { onComplete: () => void }) {
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
        onComplete();
      },
    });

    // Progress counter animation
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.floor(this.targets()[0].val));
      }
    });

    tl.to(".intro-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.out",
    })
    .to(".intro-progress", {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.inOut",
    }, 0)
    .to(".intro-text", {
      opacity: 0,
      y: -40,
      duration: 0.6,
      stagger: 0.05,
      ease: "expo.in",
      delay: 0.2,
    })
    .to(".intro-bg", {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0A0A0A] intro-bg"
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-sm px-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
            
            <div className="text-center">
              <div className="overflow-hidden mb-2">
                <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tighter intro-text opacity-0 translate-y-20">
                  SAGAR LUITEL
                </h1>
              </div>
              <div className="overflow-hidden">
                <p className="text-[#F5C518] text-[9px] tracking-[0.4em] font-mono uppercase intro-text opacity-0 translate-y-20">
                  Front-End Magician
                </p>
              </div>
              
              <div className="mt-12 flex items-end justify-between font-mono text-[10px] text-gray-500 mb-2">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-px w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-[#F5C518] w-0 intro-progress origin-left scale-x-0" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
