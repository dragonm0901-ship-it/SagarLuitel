import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);
  const textFgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic entrance
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(textBgRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' })
        .fromTo(textFgRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, '<')
        .fromTo(imageRef.current, { y: 100, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, '-=0.8')
        .fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6');

      // Parallax effect on scroll
      gsap.to(textBgRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(textFgRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-[72px] min-h-[100svh] bg-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5C518]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B9D]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Background Text Layer (Behind Image) */}
      <div 
        ref={textBgRef}
        className="absolute top-[35%] md:top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center z-0 pointer-events-none select-none"
      >
        <h1 className="text-[13vw] md:text-[9vw] leading-[0.85] font-serif font-black text-[#1A1A1A] whitespace-nowrap tracking-tighter mix-blend-multiply">
          FRONT END
        </h1>
        <h1 className="text-[11vw] md:text-[7.5vw] leading-[0.85] font-serif font-black text-[#1A1A1A] whitespace-nowrap tracking-tighter mix-blend-multiply">
          MAGICIAN
        </h1>
      </div>

      {/* Hero Image Layer */}
      <div 
        ref={imageRef}
        className="absolute top-[35%] md:top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[50vw] md:w-[42vw] lg:w-[32vw] max-w-[450px] z-10 flex justify-center items-center h-auto"
      >
        <div className="relative p-1.5 bg-white/10 backdrop-blur-md rounded-[12px] border border-white/20 shadow-2xl overflow-hidden group/frame">
          {/* Soft Glow Background */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#F5C518] to-[#FF6B9D] opacity-30 blur-2xl group-hover/frame:opacity-50 transition-opacity duration-700" />
          
          <img
            src="/images/hero-portrait.png"
            alt="Sagar Luitel"
            className="relative z-10 w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-700 brightness-95 rounded-[10px]"
          />
        </div>
      </div>

      {/* Foreground Text Layer (In front of Image, with Stroke) */}
      <div 
        ref={textFgRef}
        className="absolute top-[35%] md:top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center z-20 pointer-events-none select-none"
      >
        <h1 
          className="text-[13vw] md:text-[9vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
        >
          FRONT END
        </h1>
        <h1 
          className="text-[11vw] md:text-[7.5vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
        >
          MAGICIAN
        </h1>
      </div>

      {/* Bottom Content Layer */}
      <div ref={contentRef} className="absolute bottom-8 left-0 right-0 z-30 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-3" ref={badgeRef}>
              <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest shadow-xl">
                <Code className="w-3.5 h-3.5 text-[#FF6B9D]" />
                Interactive Architect
              </span>
            </div>
            <p className="text-gray-600 font-medium text-[11px] md:text-xs max-w-[240px] md:max-w-xs bg-white/40 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-sm leading-relaxed">
              Crafting immersive digital realms that blur the line between code and art using cutting-edge WebGL & GSAP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
