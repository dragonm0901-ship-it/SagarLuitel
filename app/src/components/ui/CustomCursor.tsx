import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true); // Default to dark background (theme standard)
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Helper to calculate luminance from RGB/RGBA string
  const getLuminance = (colorStr: string) => {
    const rgb = colorStr.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 1; // Default to Light
    const [r, g, b] = rgb.map(Number);
    // Standard relative luminance formula
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lastCheck = 0;
    const checkBrightness = () => {
      const now = Date.now();
      // Throttle check to every 100ms for performance
      if (now - lastCheck < 100) return requestAnimationFrame(checkBrightness);
      lastCheck = now;

      // Detect element under cursor
      const el = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (el) {
        let currentEl: HTMLElement | null = el as HTMLElement;
        let bg = "transparent";
        
        // Walk up the tree to find the nearest non-transparent background
        while (currentEl && (bg === "transparent" || bg === "rgba(0, 0, 0, 0)")) {
          bg = window.getComputedStyle(currentEl).backgroundColor;
          if (currentEl === document.body) break;
          currentEl = currentEl.parentElement;
        }
        
        const lum = getLuminance(bg);
        setIsDarkBg(lum < 0.5); // < 0.5 is considered "Dark"
      }
      requestAnimationFrame(checkBrightness);
    };

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const hoverElement = target.closest('[data-cursor-text]');
      const hiddenElement = target.closest('[data-cursor-hidden]');
      
      setIsHidden(!!hiddenElement);

      if (hoverElement) {
        setIsHovered(true);
      } else {
        const isInteractive = target.closest('button, a, input, [role="button"], .cursor-pointer');
        setIsHovered(!!isInteractive);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    const animationId = requestAnimationFrame(checkBrightness);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationId);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring - Adapts color based on detected background luminance */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 40 : 28,
          height: isHovered ? 40 : 28,
          opacity: isHidden ? 0 : 1,
          borderColor: isDarkBg ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
          backgroundColor: isHovered ? (isDarkBg ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)") : "transparent"
        }}
        transition={{ 
          borderColor: { duration: 0.3 },
          backgroundColor: { duration: 0.3 }
        }}
      />

      {/* Main Focus Dot - Adaptive Color */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 20 : 16,
          height: isHovered ? 20 : 16,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isDarkBg ? "#FFFFFF" : "#000000",
          boxShadow: isDarkBg ? "0 0 15px rgba(255, 255, 255, 0.2)" : "0 0 15px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ 
          backgroundColor: { duration: 0.3 }
        }}
      />
    </>
  );
}
