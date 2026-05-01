import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import { PortfolioCard } from '@/components/PortfolioCard';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const featuredIds = [
    '3d-bike-configurator',
    'myrestro-manager',
    'save-wildlife',
    'into-pokhara',
    'dobby-haircare',
    'digital-voting'
  ];

  const visibleProjects = projects.filter(p => featuredIds.includes(p.id))
    .sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));

  // Header animation - only once on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cards animation - re-run when visible projects change
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        // Use fromTo with overwrite to ensure smooth transition
        gsap.fromTo(
          cardEl,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardEl,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.05,
            overwrite: 'auto',
          }
        );
      });
      
      // Refresh ScrollTrigger when window size changes
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="portfolio" className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#1A1A1A] dark:text-white transition-colors duration-700 mb-4 leading-[1.1] md:leading-[0.9] tracking-tighter">
              Selected <span className="text-[#FF6B9D]">impact</span> projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-700 text-lg max-w-lg leading-relaxed">
              Curated collection showcasing technical depth and strategic design.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 shrink-0">
            <Magnetic strength={0.3}>
              <button 
                onClick={() => navigate('/projects')}
                data-cursor-text="view collection"
                className="group relative bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] to-[#F5C518] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Project Preview Grid - 2x2 on Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 pb-12 items-stretch">
          {visibleProjects.map((project, index) => (
            <div data-cursor-text="view" key={project.id} className="w-full flex">
              <PortfolioCard
                ref={(el) => { cardRefs.current[index] = el; }}
                {...project}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
