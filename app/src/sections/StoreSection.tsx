import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';
import { storeProducts } from '@/data/storeProducts';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Systems' | 'Snippets' | 'Art' | 'Motion';

const colors = ['#FDF18A', '#7DECD1', '#5B5F8A'];

export function StoreSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const filteredProducts = storeProducts.filter(p => activeCategory === 'All' || p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".store-title-anim", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
      
      // Filter Animation
      gsap.from(filterRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Refraction Grid Entrance (Initial Load)
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(10px)',
          y: 40,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        });
      }
      // Cloudy background animation for bottom card
      gsap.utils.toArray<HTMLElement>('.store-cloud-blob').forEach((blob, i) => {
        gsap.to(blob, {
          x: 'random(-15%, 15%)',
          y: 'random(-15%, 15%)',
          scale: 'random(0.9, 1.3)',
          rotation: 'random(-15, 15)',
          duration: 15 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * -2,
        });
      });
    }, sectionRef);

    // Mouse follow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!bottomCardRef.current) return;
      const rect = bottomCardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('.store-cloud-blob', {
        xPercent: x * 20,
        yPercent: y * 20,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05
      });
    };

    // Color loop logic
    const animateBlobColor = (blob: HTMLElement) => {
      if (!isHoveringRef.current) return;
      const currentColor = blob.style.backgroundColor;
      let nextColor = colors[Math.floor(Math.random() * colors.length)] + '66';
      
      if (currentColor.includes(colors[0]) && nextColor.includes(colors[0])) nextColor = colors[1] + '66';

      gsap.to(blob, {
        backgroundColor: nextColor,
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut',
        onComplete: () => animateBlobColor(blob)
      });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.utils.toArray<HTMLElement>('.store-cloud-blob').forEach((blob) => {
        animateBlobColor(blob);
      });
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to('.store-cloud-blob', {
        backgroundColor: (i: number) => (i % 2 === 0 ? '#0f7bff' : '#ff930f') + '66',
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    const card = bottomCardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []); // Only run entrance on mount. Layout transitions are handled by Framer Motion.

  return (
    <section ref={sectionRef} id="store" className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-0 md:duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restored Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <h1 className="store-title-anim font-bold text-brand-secondary dark:text-white mb-6 transition-colors duration-700 text-5xl md:text-7xl font-serif leading-tight">
              The Elite <span className="italic text-brand-third dark:text-brand-primary pr-2">Wizard Store</span>
            </h1>
            <p className="store-title-anim text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              Premium Knowledge & Professional Build-Ready Templates
            </p>
          </div>

          <div ref={filterRef} className="flex gap-2 bg-gray-50 dark:bg-white/5 transition-colors duration-700 p-1 rounded-[4px] border border-gray-100 dark:border-white/10 overflow-x-auto hide-scrollbar max-w-full">
            <div className="flex gap-2 min-w-max">
              {['All', 'Systems', 'Snippets', 'Art', 'Motion'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-6 py-2 rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-brand-secondary dark:bg-brand-primary text-white dark:text-brand-secondary shadow-lg shadow-black/10 dark:shadow-white/10' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-brand-secondary dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Boutique Grid - 1x1 on Mobile */}
        <motion.div 
          ref={gridRef}
          layout
          initial={false}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.23, 1, 0.32, 1],
                  layout: { duration: 0.4, ease: "easeInOut" }
                }}
                className="h-full"
              >
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                   <ProductCard {...product} />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bespoke Studio Scrim - Professional Centered Layout */}
        <div 
          ref={bottomCardRef}
          className="mt-20 relative rounded-[4px] md:rounded-[4px] bg-brand-secondary border border-white/5 overflow-hidden group shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Animated Cloudy Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40 transition-opacity duration-700 group-hover:opacity-50">
            <div className="store-cloud-blob absolute top-[-30%] left-[-15%] w-[90%] h-[90%] bg-brand-primary/40 blur-[150px] rounded-full" />
            <div className="store-cloud-blob absolute bottom-[-30%] right-[-15%] w-[80%] h-[80%] bg-brand-third/40 blur-[130px] rounded-full" />
            <div className="store-cloud-blob absolute top-[30%] right-[10%] w-[70%] h-[70%] bg-brand-primary/30 blur-[140px] rounded-full" />
            <div className="store-cloud-blob absolute bottom-[20%] left-[20%] w-[85%] h-[85%] bg-brand-third/30 blur-[160px] rounded-full" />
          </div>
          
          <div className="relative z-10 px-6 py-16 md:px-20 md:py-28 flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-[1] tracking-tighter mb-12">
                Precision <span className="italic font-light text-brand-third">Software</span> <br className="hidden lg:block" />
                <span className="text-brand-primary">Elite</span> Build Studio.
              </h2>

              {/* Core Capabilities - Centered Professional Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-16 border-t border-white/10 pt-12">
                {[
                  { title: "Scalable Systems", label: "Architecture", icon: "01" },
                  { title: "Motion Cinema", label: "Experience", icon: "02" },
                  { title: "Security Core", label: "Encryption", icon: "03" }
                ].map((cap, i) => (
                  <div key={i} className="flex flex-col items-center md:border-l first:border-0 border-white/10 px-6 group/cap">
                    <span className="text-[12px] font-serif italic text-brand-primary mb-2 transition-transform duration-500 group-hover/cap:-translate-y-1">{cap.icon}</span>
                    <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">{cap.label}</span>
                    <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">{cap.title}</h4>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white rounded-[4px] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-brand-primary/30">
                  Secure Your Slot
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[4px] font-bold text-xs uppercase tracking-widest italic hover:bg-white/10 transition-all">
                  Available May 2026
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
