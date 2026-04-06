import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  triggerOnInit?: boolean;
}

export default function TextReveal({ text, className = "", delay = 0, triggerOnInit = false }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      const words = el.querySelectorAll('.word');
      
      gsap.fromTo(words, 
        { 
          y: 100, 
          opacity: 0,
          rotateX: -30,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.05,
          delay,
          ease: "expo.out",
          scrollTrigger: triggerOnInit ? null : {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, triggerOnInit]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`} style={{ perspective: '1000px' }}>
      {text.split(' ').map((word, idx) => (
        <span key={idx} className="relative overflow-hidden mr-[0.3em] py-1">
          <span className="word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
