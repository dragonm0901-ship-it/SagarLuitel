import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <h2
            ref={headingRef}
            className="font-bold text-[#1A1A1A] leading-tight"
          >
            Harmonizing <span className="text-gray-400">technical mastery with</span>{' '}
            aesthetic vision to conjure digital experiences that feel like magic.
          </h2>

          {/* Right Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              I'm a Creative Developer obsessed with the intersection of math, art, and performance. My work revolves around pushing the boundaries of what's possible in the browser, from custom WebGL shaders to intricate 3D orchestrations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By leveraging React Three Fiber and GSAP, I build fluid, high-performance interfaces that don't just function—they enchant. Every line of code is a brushstroke in a larger, interactive masterpiece.
            </p>
            <button
              ref={buttonRef}
              className="group relative bg-gradient-to-r from-[#FF6B9D] to-[#FF8C42] text-white px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/25 mt-4"
            >
              <span className="relative z-10 flex items-center gap-2">
                About Me
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6B9D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
