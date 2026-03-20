import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Hexagon, Circle, Square, Triangle, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'NeuroLink', icon: Brain, color: 'hover:text-[#F5C518] hover:drop-shadow-[0_0_10px_rgba(245,197,24,0.5)]' },
  { name: 'Logoipsum', icon: Hexagon, color: 'hover:text-[#FF6B9D] hover:drop-shadow-[0_0_10px_rgba(255,107,157,0.5)]' },
  { name: 'TechFlow', icon: Circle, color: 'hover:text-[#FF8C42] hover:drop-shadow-[0_0_10px_rgba(255,140,66,0.5)]' },
  { name: 'DataSync', icon: Square, color: 'hover:text-[#F5C518] hover:drop-shadow-[0_0_10px_rgba(245,197,24,0.5)]' },
  { name: 'CloudBase', icon: Triangle, color: 'hover:text-[#FF6B9D] hover:drop-shadow-[0_0_10px_rgba(255,107,157,0.5)]' },
  { name: 'StarLabs', icon: Star, color: 'hover:text-[#FF8C42] hover:drop-shadow-[0_0_10px_rgba(255,140,66,0.5)]' },
];

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Logos stagger animation
      const logoItems = logosRef.current?.children;
      if (logoItems) {
        gsap.fromTo(
          logoItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: logosRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-8">
            <div className="group cursor-default">
              <span className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] transition-transform duration-300 inline-block group-hover:scale-110">
                200+
              </span>
              <p className="text-gray-500 text-sm">clients worldwide</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="group cursor-default">
              <span className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] transition-transform duration-300 inline-block group-hover:scale-110">
                12M
              </span>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          <a
            href="#contact"
            className="group text-gray-700 hover:text-black font-medium text-sm transition-colors flex items-center gap-2"
          >
            Next You?
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Logo Grid */}
        <div
          ref={logosRef}
          className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center"
        >
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.name}
                className={`group flex items-center justify-center gap-3 text-gray-400 transition-all duration-300 cursor-pointer ${client.color} hover:scale-[1.3]`}
              >
                <div className="relative">
                  <Icon className="w-7 h-7 transition-all duration-500 group-hover:scale-[1.3]" />
                </div>
                <span className="font-bold text-sm hidden sm:inline transition-colors duration-300">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
