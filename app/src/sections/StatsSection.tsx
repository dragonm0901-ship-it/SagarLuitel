import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 99.8, suffix: '%', label: 'Average Lighthouse Score' },
  { value: 40, suffix: '%', label: 'Bundle Size Reduction' },
  { value: 60, suffix: 'FPS', label: 'WebGL Rendering Speed' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each stat card
      statRefs.current.forEach((statEl, index) => {
        if (!statEl) return;

        gsap.fromTo(
          statEl,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.15,
          }
        );
      });

      // Animate numbers counting up
      numberRefs.current.forEach((numEl, index) => {
        if (!numEl) return;

        const targetValue = stats[index].value;

        gsap.fromTo(
          { value: 0 },
          { value: targetValue },
          {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: numEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.15 + 0.3,
            onUpdate: function () {
              if (numEl) {
                numEl.textContent = Math.floor(this.targets()[0].value) + stats[index].suffix;
              }
            },
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
              className="py-12 px-6 text-center group cursor-default"
            >
              <div className="text-4xl lg:text-6xl font-serif font-bold text-[#1A1A1A] mb-3 transition-transform duration-300 group-hover:scale-110">
                <span ref={(el) => { numberRefs.current[index] = el; }}>0{stat.suffix}</span>
              </div>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
