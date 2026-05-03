import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Loader } from './Loader';
import { DiaTextReveal } from './DiaTextReveal';
import { NumberTicker } from './NumberTicker';

export function PremiumIntro({ onComplete }: { onComplete: () => void }) {
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

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
    .to(".intro-text", {
      opacity: 0,
      y: -40,
      duration: 0.6,
      stagger: 0.05,
      ease: "expo.in",
      delay: 0.2,
      onComplete: () => onComplete() // Signal Hero entrance BEFORE the bg slides up
    })
    .to(".intro-bg", {
      yPercent: -100,
      duration: 1.2, // Slightly slower for more cinematic lift
      ease: "expo.inOut",
      onComplete: () => setComplete(true) // Unmount only when fully cleared
    }, "-=0.1");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[10005] flex items-center justify-center bg-white dark:bg-brand-secondary transition-colors duration-700 intro-bg"
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-6">
            {/* Loader at the Top */}
            <div className="relative flex items-center justify-center border-none">
               <Loader size="120px" />
            </div>

            {/* Centered Content */}
            <div className="text-center">
              <div className="overflow-hidden intro-text opacity-0 translate-y-20">
                <DiaTextReveal
                  className="text-brand-secondary dark:text-white text-5xl md:text-8xl font-bold tracking-tighter"
                  text="SAGAR"
                  colors={["#0f7bff", "#ff930f", "#0f7bff"]}
                  duration={2}
                  textColor="currentColor"
                />
              </div>
            </div>

            {/* Number Ticker at the Bottom */}
            <div className="flex items-baseline gap-1 intro-text opacity-0 translate-y-10">
               <NumberTicker
                 value={progress}
                 className="text-3xl md:text-4xl font-bold tracking-tighter text-brand-primary"
               />
               <span className="text-2xl md:text-3xl font-bold text-brand-primary">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
