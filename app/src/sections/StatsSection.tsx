import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'GSAP', detail: 'Complex timelines & SVG magic.', color: '#88CE02' },
  { label: 'Lenis', detail: 'Next-gen cinematic scrolling.', color: '#FF98A2' },
  { label: 'Framer', detail: 'Declarative physics-based UI.', color: '#2B2D42' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each stat card
      statRefs.current.forEach((statEl, index) => {
        if (!statEl) return;

        gsap.fromTo(
          statEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: statEl,
              start: 'top 90%',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-gray-200 dark:border-white/5 bg-white dark:bg-brand-secondary transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => { statRefs.current[index] = el; }}
              className="py-16 px-6 text-center group transition-all duration-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
            >
              <div 
                className="relative inline-block text-4xl lg:text-7xl font-serif font-bold mb-4 transition-all duration-500 group-hover:scale-110"
              >
                {/* Default Dark Text */}
                <span className="text-brand-secondary dark:text-white transition-opacity duration-300 relative z-10 group-hover:opacity-0">
                    {stat.label}
                </span>

                {/* Hover Colored / Gradient Text Layer */}
                <span 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 whitespace-nowrap ${stat.label === 'Framer' ? 'dark:text-white' : ''}`}
                    style={stat.label === 'Framer' ? {} : { color: stat.color }}
                >
                    {stat.label}
                </span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-2 transition-colors duration-700">{stat.label} Animation</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium text-xs max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
