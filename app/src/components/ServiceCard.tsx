import { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import gsap from 'gsap';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

export const ServiceCard = ({ icon: Icon, title, description, features, badge }: ServiceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const iconContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const card = cardRef.current;
      const inner = innerRef.current;
      const icon = iconContainerRef.current;
      if (!card || !inner || !icon) return;

      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Subtle 3D Tilt
        gsap.to(inner, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Magnetic Icon
        gsap.to(icon, {
          x: x * 20,
          y: y * 20,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(inner, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });

        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    }, []);

    return (
      <div
        ref={cardRef}
        className="group relative h-full cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div
          ref={innerRef}
          className="relative h-full bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-300/30 transition-shadow duration-500 overflow-hidden transform-gpu"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5C518]/10 via-transparent to-[#FF6B9D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Subtle Glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#F5C518] to-[#FF6B9D] rounded-3xl opacity-0 blur-2xl group-hover:opacity-10 transition-opacity duration-700" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div 
                ref={iconContainerRef}
                className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-gray-800 group-hover:text-[#FF6B9D] transition-colors duration-300" />
              </div>
              {badge && (
                <span className="bg-[#F5C518] text-black px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                  {badge}
                </span>
              )}
            </div>

            {/* Typography */}
            <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4 group-hover:text-[#FF6B9D] transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed font-medium">
              {description}
            </p>

            <div className="mt-auto grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-200 rounded-full group-hover:bg-[#FF6B9D] transition-all duration-300 group-hover:scale-125 focus:ring-2 focus:ring-[#FF6B9D]" />
                  <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

