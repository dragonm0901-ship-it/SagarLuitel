import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

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
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white intro-bg"
          exit={{ opacity: 0 }}
        >
          <div className="relative flex items-center justify-center w-[300px] h-[300px]">
            {/* Background Circle */}
            <div className="absolute inset-0 border border-black/[0.03] rounded-full scale-[0.85]" />
            
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="150"
                cy="150"
                r="135"
                stroke="currentColor"
                strokeWidth="1"
                fill="transparent"
                className="text-black/[0.05]"
              />
              <motion.circle
                cx="150"
                cy="150"
                r="135"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 135}
                animate={{ strokeDashoffset: (2 * Math.PI * 135) * (1 - progress / 100) }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="text-black"
                strokeLinecap="round"
              />
            </svg>

            {/* Centered Content */}
            <div className="z-10 text-center">
              <div className="overflow-hidden mb-1">
                <h1 className="text-black text-2xl md:text-3xl font-bold tracking-tighter intro-text opacity-0 translate-y-20">
                  SAGAR LUITEL
                </h1>
              </div>
              <div className="overflow-hidden">
                <p className="text-[#FF6B9D] text-[8px] tracking-[0.5em] font-mono uppercase intro-text opacity-0 translate-y-20">
                  Front-End Magician
                </p>
              </div>
              
              <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-full">
                 <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">Initializing</span>
                    <span className="font-mono text-[12px] text-black font-bold">{progress}%</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
