import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PortfolioCard } from '@/components/PortfolioCard';
import Magnetic from '@/components/ui/Magnetic';

import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger animation
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        gsap.fromTo(
          cardEl,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out', // Snappier ease
            scrollTrigger: {
              trigger: cardEl,
              start: 'top 90%', // Trigger slightly later
              toggleActions: 'play none none none',
            },
            delay: index * 0.1, // Reduced delay
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-[#1A1A1A] mb-4 leading-[0.9] tracking-tighter">
              Selected <span className="text-[#FF6B9D]">impact</span> projects
            </h2>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
              Curated collection showcasing technical depth and strategic design.
            </p>
          </div>

          <div className="flex items-center p-4 gap-4 shrink-0">
            <Magnetic strength={0.3}>
              <button 
                data-cursor-text="all"
                className="group relative bg-black text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Archive
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] to-[#F5C518] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Project Cards */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 snap-x snap-mandatory mx-auto hide-scrollbar scroll-smooth items-start">
          {projects.map((project, index) => (
            <div data-cursor-text="view" key={project.title} className="w-[85vw] flex-shrink-0 md:w-auto snap-center flex">
              <PortfolioCard
                ref={(el) => { cardRefs.current[index] = el; }}
                {...project}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
