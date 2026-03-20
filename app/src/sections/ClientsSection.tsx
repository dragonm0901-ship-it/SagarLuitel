import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Hexagon, Circle, Square, Triangle, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'NeuroLink', icon: Brain },
  { name: 'Logoipsum', icon: Hexagon },
  { name: 'TechFlow', icon: Circle },
  { name: 'DataSync', icon: Square },
  { name: 'CloudBase', icon: Triangle },
  { name: 'StarLabs', icon: Star },
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
                className="group flex items-center justify-center gap-2 text-gray-400 hover:text-gray-700 transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-semibold text-sm hidden sm:inline">{client.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
