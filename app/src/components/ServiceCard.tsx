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

        // High-Intensity 3D Tilt
        gsap.to(inner, {
          rotationY: x * 30,
          rotationX: -y * 30,
          transformPerspective: 700,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Magnetic Icon
        gsap.to(icon, {
          x: x * 40,
          y: y * 40,
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
          className="relative h-full bg-[#FAFAFA] dark:bg-white/5 rounded-[4px] p-8 lg:p-10 shadow-sm border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:shadow-black/5 hover:bg-white dark:hover:bg-white/10 transition-[box-shadow,background-color,border-color] duration-500 overflow-hidden transform-gpu"
        >
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-brand-third/10 dark:bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div 
                ref={iconContainerRef}
                className="w-16 h-16 bg-white dark:bg-brand-secondary rounded-[4px] flex items-center justify-center group-hover:bg-brand-third dark:group-hover:bg-brand-primary transition-[box-shadow,background-color] duration-300 shadow-sm"
              >
                <Icon className="w-8 h-8 text-brand-secondary dark:text-brand-primary group-hover:text-white transition-colors duration-300" />
              </div>
              {badge && (
                <span className="bg-brand-third text-brand-secondary px-4 py-2 rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-widest">
                  {badge}
                </span>
              )}
            </div>

            {/* Typography */}
            <h3 className="text-2xl font-serif font-bold text-brand-secondary dark:text-white mb-4 group-hover:text-brand-third dark:group-hover:text-brand-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-brand-secondary/70 dark:text-gray-400 text-sm mb-8 leading-relaxed font-medium transition-colors duration-500">
              {description}
            </p>

            <div className="mt-auto grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-third/30 dark:bg-brand-primary/30 rounded-full group-hover:bg-brand-third dark:group-hover:bg-brand-primary transition-all duration-300 group-hover:scale-125 focus:ring-2 focus:ring-brand-third dark:focus:ring-brand-primary" />
                  <span className="text-brand-secondary/60 dark:text-gray-400 text-xs font-mono uppercase tracking-wider">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

