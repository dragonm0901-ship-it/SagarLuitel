import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, Palette, Layers } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Workflow,
    title: 'Interactive React Apps',
    description: 'Building state-of-the-art interactive applications with advanced React patterns and motion.',
    features: ['Custom Hooks', 'State Orchestration', 'Performance Profiling', 'Vite & TypeScript'],
  },
  {
    icon: Palette,
    title: 'Advanced Motion Design',
    description: 'Crafting fluid motion systems that enhance UX, blending physics-based animation with UI.',
    features: ['GSAP Timelines', 'Framer Motion Layouts', 'SVG Animation', 'Premium Aesthetics'],
    badge: 'Impact',
  },
  {
    icon: Layers,
    title: 'Cinematic Storytelling',
    description: 'Using GSAP and Lenis to choreograph immersive scroll experiences that captivate users.',
    features: ['Scroll Scrubbing', 'Parallax Systems', 'Layered Compositions', 'Lenis Integration'],
  },
];

// Flying directions for each card
const flyDirections = {
  desktop: [
    { x: 200, y: -150, rotation: 12 },   // Card 1: from top right
    { x: -200, y: 150, rotation: -12 },   // Card 2: from bottom left
    { x: 0, y: 200, rotation: 0 },        // Card 3: from bottom
  ],
  mobile: [
    { x: 150, y: -200, rotation: 8 },     // Card 1: from top right
    { x: -150, y: 200, rotation: -8 },    // Card 2: from bottom left
    { x: 0, y: 250, rotation: 0 },        // Card 3: from bottom
  ],
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
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

      const mm = gsap.matchMedia();

      // ── Desktop: fly-in with stagger, grid layout stays ──
      mm.add('(min-width: 768px)', () => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dir = flyDirections.desktop[i];

          gsap.fromTo(card,
            {
              x: dir.x,
              y: dir.y,
              rotation: dir.rotation,
              opacity: 0,
              scale: 0.85,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: 'top 85%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.15,
            }
          );
        });
      });

      // ── Mobile: fly-in + sticky folder stacking ──
      mm.add('(max-width: 767px)', () => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dir = flyDirections.mobile[i];

          gsap.fromTo(card,
            {
              x: dir.x,
              y: dir.y,
              rotation: dir.rotation,
              opacity: 0,
              scale: 0.9,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 bg-white dark:bg-brand-secondary transition-colors duration-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start gap-12 mb-20"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-brand-secondary dark:text-white transition-colors duration-700 leading-tight mb-6 tracking-tighter">
              Without impact and creating a legacy that <span className="italic text-brand-third dark:text-brand-primary transition-colors duration-700">transcends time</span>.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Every decision, every action, and every step forward is rooted in the desire to build something meaningful.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsContainerRef}
          className="
            flex flex-col gap-12 md:gap-0
            md:grid md:grid-cols-3 md:gap-8
            pb-8
          "
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="md:sticky md:static md:min-w-0 will-change-transform"
              style={{
                zIndex: i + 1,
              }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
