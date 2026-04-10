import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryMember {
  id: number;
  image: string;
  name: string;
  role: string;
}

interface TeamGalleryProps {
  members: GalleryMember[];
  isDark: boolean;
}

export const TeamGallery: React.FC<TeamGalleryProps> = ({ members, isDark }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const len = members.length;

  // Infinite wrap-around navigation
  const next = useCallback(() => setIndex((p) => (p + 1) % len), [len]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + len) % len), [len]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Auto-advance every 1.5 seconds, pause on hover/touch
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      next();
    }, 1800);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, next]);

  // Reset auto-play timer on manual navigation
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        next();
      }, 1500);
    }
  }, [isPaused, next]);

  const handleNext = useCallback(() => { next(); resetAutoPlay(); }, [next, resetAutoPlay]);
  const handlePrev = useCallback(() => { prev(); resetAutoPlay(); }, [prev, resetAutoPlay]);
  const handleDotClick = useCallback((i: number) => { setIndex(i); resetAutoPlay(); }, [resetAutoPlay]);
  const handleCardClick = useCallback((i: number) => { setIndex(i); resetAutoPlay(); }, [resetAutoPlay]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
    setTouchStart(null);
    setIsPaused(false);
  };

  // Calculate shortest circular distance from active index
  const getCircularDistance = (i: number): number => {
    const raw = i - index;
    // Handle wrap-around: find shortest path
    if (raw > len / 2) return raw - len;
    if (raw < -len / 2) return raw + len;
    return raw;
  };

  const xOffset = isMobile ? 75 : 150;
  const cardW = isMobile ? 200 : 300;
  const cardH = isMobile ? 280 : 450;

  // Visible range: show only cards within 3 positions
  const visibleRange = 3;

  return (
    <div
      className="relative w-full select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Area */}
      <div className="relative flex items-center justify-center" style={{ height: cardH + 80 }}>
        {/* Left Nav */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className={`absolute left-3 md:left-8 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all active:scale-90 shadow-lg backdrop-blur-sm ${
            isDark
              ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              : 'bg-black/80 text-white hover:bg-black border border-black/10'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full" style={{ height: cardH }}>
          {members.map((member, i) => {
            const dist = getCircularDistance(i);
            const absDist = Math.abs(dist);
            const isActive = dist === 0;

            // Only render nearby cards for performance
            if (absDist > visibleRange) return null;

            return (
              <motion.div
                key={member.id}
                layout
                initial={false}
                animate={{
                  x: dist * xOffset,
                  scale: isActive ? 1.1 : Math.max(0.6, 0.85 - absDist * 0.08),
                  zIndex: isActive ? 20 : 10 - absDist,
                  filter: isActive
                    ? 'grayscale(0%) brightness(100%) blur(0px)'
                    : `grayscale(100%) brightness(45%) blur(${Math.min(absDist * 0.8, 2)}px)`,
                  opacity: isActive ? 1 : Math.max(0, 1 - absDist * 0.35),
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8,
                }}
                className={`absolute rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${
                  isActive
                    ? 'shadow-[0_25px_60px_rgba(0,0,0,0.35)]'
                    : 'shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
                }`}
                style={{ width: cardW, height: cardH }}
                onClick={() => handleCardClick(i)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                {/* Active card subtle gradient overlay at bottom for text readability */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Nav */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className={`absolute right-3 md:right-8 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all active:scale-90 shadow-lg backdrop-blur-sm ${
            isDark
              ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              : 'bg-black/80 text-white hover:bg-black border border-black/10'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Info + Pagination */}
      <div className="mt-8 md:mt-12 flex flex-col items-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <h3
              className={`text-xl md:text-2xl font-serif font-black tracking-tight transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              {members[index].name}
            </h3>
            <div
              className={`h-[2px] w-10 my-3 transition-colors duration-500 ${
                isDark ? 'bg-[#F5C518]' : 'bg-[#1A1A1A]'
              }`}
            />
            <p
              className={`text-sm md:text-base font-light max-w-xs transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {members[index].role}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index
                  ? `w-7 ${isDark ? 'bg-[#F5C518]' : 'bg-[#1A1A1A]'}`
                  : `w-1.5 ${isDark ? 'bg-white/15' : 'bg-gray-300'}`
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
