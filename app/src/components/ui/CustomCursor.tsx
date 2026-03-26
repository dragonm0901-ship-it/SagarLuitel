import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Disable cursor logic on touch devices

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const hoverElement = target.closest('[data-cursor-text]');
      const hiddenElement = target.closest('[data-cursor-hidden]');
      
      setIsHidden(!!hiddenElement);

      if (hoverElement) {
        setIsHovered(true);
        setCursorText(hoverElement.getAttribute('data-cursor-text') || "");
      } else {
        const isInteractive = target.closest('button, a, input, [role="button"], .cursor-pointer');
        setIsHovered(!!isInteractive);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="cursor-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Outer Glow / Liquid Effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block bg-[#FF6B9D]/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          filter: "url(#cursor-liquid)",
        }}
        animate={{
          width: 40,
          height: 40,
          opacity: isHidden ? 0 : (isHovered ? 0.4 : 0.2),
        }}
      />

      {/* Main Focus Dot / Label Container */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden border border-white/20 backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: 8,
          height: 8,
          backgroundColor: isHovered ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.3)",
          opacity: isHidden ? 0 : 1,
          boxShadow: "none",
        }}
      >
        <AnimatePresence>
          {/* Labels removed to keep size consistent as per user request */}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
