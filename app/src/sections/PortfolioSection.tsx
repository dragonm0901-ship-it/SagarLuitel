import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PortfolioCard } from '@/components/PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/images/project-dots.png',
    title: '3D Bike Configurator',
    year: '2024',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'State'],
    challenge: 'Developing a high-performance interactive configurator with real-time state management and dynamic UI for a premium brand.',
    magic: 'Custom state orchestration and GSAP timelines reduced logic overhead by 80%, enabling butter-smooth interaction.',
    metrics: { label: 'Logic Efficiency', value: '80%' }
  },
  {
    image: '/images/project-ongito.png',
    title: 'myRestro(SAAS) Manager',
    year: '2024',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    challenge: 'Building a multi-tenant restaurant management system with real-time order tracking and complex analytics dashboards.',
    magic: 'Implemented a seamless scrollytelling narrative that led to a 45% increase in average session duration.',
    metrics: { label: 'User Retention', value: '+45%' }
  },
  {
    image: '/images/project-nexus.png',
    title: 'Project Peak(Travel Agency Website)',
    year: '2025',
    tags: ['React', 'GSAP', 'Framer Motion', 'Contentful'],
    challenge: 'Designing a premium travel booking platform with immersive destination walkthroughs and interactive maps.',
    magic: 'Developed a proprietary animation system that moved complex UI transitions to hardware-accelerated layers.',
    metrics: { label: 'Frame Density', value: '99.9%' }
  },
];

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
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16"
        >
            <h2 className="font-bold text-[#1A1A1A]">
              Curated collection of most impactful projects
            </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-gray-600 leading-relaxed max-w-xs">
              Each one selected to showcase not only the final result, but also the strategic decisions behind it.
            </p>
            <div className="flex items-center gap-4">
              <button 
                data-cursor-text="view"
                className="group relative bg-black text-white px-6 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory mx-auto hide-scrollbar scroll-smooth">
          {projects.map((project, index) => (
            <div data-cursor-text="view" key={project.title} className="w-[85vw] flex-shrink-0 md:w-auto snap-center">
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
