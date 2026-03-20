import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, Palette, Layers } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Workflow,
    title: 'Creative Coding & WebGL',
    description: 'Transforming mathematical logic into stunning visual experiences with custom shaders and R3F.',
    features: ['Shader Development', '3D Scene Design', 'Performance Optimization', 'WebGL Math'],
  },
  {
    icon: Palette,
    title: 'Immersive Interface Design',
    description: 'Crafting UI that lives within 3D Space, blending traditional design with spatial awareness.',
    features: ['Spatial UI', 'Dynamic Micro-interactions', 'Vite & React Mastery', 'Premium Aesthetics'],
    badge: 'Magic',
  },
  {
    icon: Layers,
    title: 'Interactive Storytelling',
    description: 'Using GSAP and Lenis to choreograph scrollytelling experiences that captivate and convert.',
    features: ['Timeline Orchestration', 'Parallax Systems', 'Physics-based Motion', 'Scroll Magic'],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-20"
        >
          <div className="max-w-xl">
            <h2 className="font-bold text-[#1A1A1A] leading-tight mb-6">
              Without impact and creating a legacy that <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#FF6B9D]">transcends time</span>.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-gray-600 font-mono text-xs uppercase tracking-widest leading-relaxed">
              Every decision, every action, and every step forward is rooted in the desire to build something meaningful.
            </p>
          </div>
        </div>

        {/* Service Cards - Swipeable on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar gap-6 md:gap-8 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {services.map((service) => (
            <div key={service.title} className="min-w-[85vw] sm:min-w-[380px] md:min-w-0 snap-center">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
