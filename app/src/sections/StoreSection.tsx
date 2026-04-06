import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';
import { storeProducts } from '@/data/storeProducts';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Systems' | 'Snippets' | 'Art' | 'Motion';

export function StoreSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Only run entrance on mount. Layout transitions are handled by Framer Motion.

  return (
    <section ref={sectionRef} id="store" className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restored Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <h1 className="store-title-anim font-bold text-black dark:text-white mb-6 transition-colors duration-700 text-5xl md:text-7xl font-serif">
              The Elite <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#FF6B9D] pr-2">Wizard Store</span>
            </h1>
            <p className="store-title-anim text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              Premium Knowledge & Professional Build-Ready Templates
            </p>
          </div>

          <div ref={filterRef} className="flex gap-2 bg-gray-50 dark:bg-white/5 transition-colors duration-700 p-1 rounded-2xl border border-gray-100 dark:border-white/10 overflow-x-auto hide-scrollbar max-w-full">
            <div className="flex gap-2 min-w-max">
              {['All', 'Systems', 'Snippets', 'Art', 'Motion'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
        <div className="mt-32 relative rounded-[2rem] md:rounded-[3.5rem] bg-[#0F0F0F] border border-white/5 overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5C518]/5 rounded-full blur-[140px] pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
          
          <div className="relative z-10 px-6 py-16 md:px-20 md:py-28 flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black text-white leading-[1.1] md:leading-[1] tracking-tighter mb-12">
                Precision <span className="italic font-light text-gray-400">Software</span> — <br className="hidden md:block" />
                <span className="text-[#F5C518]">Elite</span> Build Studio.
              </h2>

              {/* Core Capabilities - Centered Professional Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-16 border-t border-white/5 pt-12">
                {[
                  { title: "Scalable Systems", label: "Scale" },
                  { title: "Motion Cinema", label: "Design" },
                  { title: "Security Core", label: "Tech" }
                ].map((cap, i) => (
                  <div key={i} className="flex flex-col items-center md:border-l first:border-0 border-white/10 px-6">
                    <span className="text-[12px] font-serif italic text-[#F5C518] mb-2">0{i + 1}</span>
                    <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">{cap.label}</span>
                    <h4 className="text-sm font-mono font-bold text-white uppercase tracking-tight">{cap.title}</h4>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <button className="w-full sm:w-auto px-10 py-5 bg-[#F5C518] text-black rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#F5C518]/20">
                  Start Inquiry
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm italic hover:bg-white/10 transition-all">
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
