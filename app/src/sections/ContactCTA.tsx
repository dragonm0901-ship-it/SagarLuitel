import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative bg-black rounded-[2.5rem] p-12 lg:p-20 overflow-hidden group"
        >
          {/* Animated Background Magic */}
          <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] bg-gradient-to-br from-[#FF6B9D] to-[#F5C518] blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] bg-gradient-to-tr from-[#FF8C42] to-[#FF6B9D] blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-10 tracking-tight max-w-5xl"
            >
              Ready to architect your next <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] via-[#FF6B9D] to-[#FF8C42]">digital masterpiece</span>?
            </h2>

            <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mb-12 max-w-2xl leading-relaxed">
              High-performance WebGL experiences. Complex React architectures. Award-winning digital storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                ref={buttonRef}
                data-cursor-text="view"
                className="group relative bg-white text-black px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Engagement Models
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              
              <a
                href="mailto:sagar.luitel.0909@gmail.com"
                className="inline-flex items-center gap-3 px-12 py-5 rounded-full border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                Direct Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
