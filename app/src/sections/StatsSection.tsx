import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'GSAP', detail: 'Complex timelines & SVG magic.', color: '#88CE02' },
  { label: 'Lenis', detail: 'Next-gen cinematic scrolling.', color: '#F5C518' },
  { label: 'Framer', detail: 'Declarative physics-based UI.', color: '#FF6B9D' },
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
    <section ref={sectionRef} className="border-y border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => { statRefs.current[index] = el; }}
              className="py-16 px-6 text-center group transition-all duration-500 hover:bg-black/[0.02]"
            >
              <div 
                className="text-4xl lg:text-7xl font-serif font-bold text-[#1A1A1A] mb-4 transition-all duration-500 group-hover:scale-110"
                style={{ '--hover-color': stat.color } as any}
              >
                <span className="transition-colors duration-500 group-hover:text-[var(--hover-color)]">
                    {stat.label}
                </span>
              </div>
              <p className="text-gray-400 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">{stat.label} Animation</p>
              <p className="text-gray-600 font-medium text-xs max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
