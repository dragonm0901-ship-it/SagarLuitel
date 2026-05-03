import { useEffect, useRef, useState } from 'react';
import { EngagementModal } from '@/components/ui/EngagementModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colors = ['#0f7bff', '#ff930f', '#151517'];

export function ContactCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
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

      // Cloudy background animation
      gsap.utils.toArray<HTMLElement>('.cloud-blob').forEach((blob, i) => {
        gsap.to(blob, {
          x: 'random(-15%, 15%)',
          y: 'random(-15%, 15%)',
          scale: 'random(0.9, 1.3)',
          rotation: 'random(-15, 15)',
          duration: 15 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * -2, // Offset starts for more organic feel
        });
      });
    }, sectionRef);

    // Mouse follow effect for cloudy background
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('.cloud-blob', {
        xPercent: x * 20,
        yPercent: y * 20,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05
      });
    };

    // Color loop for hover effect
    const animateBlobColor = (blob: HTMLElement) => {
      if (!isHoveringRef.current) return;
      const currentColor = blob.style.backgroundColor;
      let nextColor = colors[Math.floor(Math.random() * colors.length)] + '66';
      
      // Try to avoid same color consecutive
      if (currentColor.includes(colors[0]) && nextColor.includes(colors[0])) nextColor = colors[1] + '66';

      gsap.to(blob, {
        backgroundColor: nextColor,
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut',
        onComplete: () => animateBlobColor(blob)
      });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.utils.toArray<HTMLElement>('.cloud-blob').forEach((blob) => {
        animateBlobColor(blob);
      });
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to('.cloud-blob', {
        backgroundColor: (i: number) => (i % 2 === 0 ? '#0f7bff' : '#ff930f') + '66',
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white dark:bg-brand-secondary transition-colors duration-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative bg-brand-secondary dark:bg-black rounded-[4px] p-12 lg:p-20 overflow-hidden group shadow-2xl"
        >
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-brand-third/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Animated Cloudy Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30 transition-opacity duration-700 group-hover:opacity-40 dark:group-hover:opacity-50">
            <div className="cloud-blob absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-brand-primary/40 blur-[120px] rounded-full" />
            <div className="cloud-blob absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand-third/40 blur-[100px] rounded-full" />
            <div className="cloud-blob absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-brand-primary/30 blur-[110px] rounded-full" />
            <div className="cloud-blob absolute bottom-[10%] left-[20%] w-[75%] h-[75%] bg-brand-third/30 blur-[130px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-10 tracking-tight max-w-5xl"
            >
              Ready to architect your next <span className="italic text-brand-third dark:text-brand-primary transition-colors duration-700">digital masterpiece</span>?
            </h2>

            <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mb-12 max-w-2xl leading-relaxed">
              High-performance WebGL experiences. Complex React architectures. Award-winning digital storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                ref={buttonRef}
                onClick={() => setIsModalOpen(true)}
                data-cursor-text="view"
                className="group relative bg-brand-third dark:bg-brand-primary text-white px-8 py-4 md:px-12 md:py-5 rounded-[4px] font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,147,15,0.3)] dark:hover:shadow-[0_0_40px_rgba(15,123,255,0.3)] active:scale-95 flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3 whitespace-nowrap">
                  Engagement Models
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                </span>
              </button>
              
              <a
                href="mailto:sagar.luitel.0909@gmail.com"
                className="inline-flex items-center gap-3 px-12 py-5 rounded-[4px] border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                Direct Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
      <EngagementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
