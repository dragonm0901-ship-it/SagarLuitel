import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
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
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverParent = target.closest('button, a, .cursor-pointer, input, textarea, select, label');
      if (hoverParent) {
        setIsHovered(true);
        const text = hoverParent.getAttribute('data-cursor-text');
        setHoverType(text || 'scale');
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Liquid Filter Container */}
      <svg className="hidden">
        <defs>
          <filter id="cursor-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Main Liquid Glow */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-[#FF6B9D]/20 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          filter: "url(#cursor-liquid)",
        }}
        animate={{
          scale: isHovered ? (hoverType === 'view' ? 2.5 : 1.5) : 1,
          opacity: 1,
        }}
      />
      
      {/* Core Dot Focus */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF8C42] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />

      {/* Hover Text Label */}
      {isHovered && hoverType === 'view' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-0 left-0 font-mono text-[10px] uppercase font-bold text-white pointer-events-none z-[9999] text-center"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          View
        </motion.div>
      )}
    </>
  );
}
