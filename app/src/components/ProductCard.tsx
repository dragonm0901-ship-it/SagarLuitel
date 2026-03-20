import { useRef, useEffect } from 'react';
import { ArrowRight, Star, Clock, BarChart, Smartphone, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';

interface ProductCardProps {
  category: string;
  title: string;
  description: string;
  price: string;
  level?: string;
  duration?: string;
  features?: string[];
  rating?: number;
  tags?: string[];
  icon: LucideIcon;
  color: string;
}

export function ProductCard({ 
  category, title, description, price, level, duration, features, rating, tags, icon: Icon, color 
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const icon = iconRef.current;
    if (!card || !glow || !icon) return;

    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (!isHoverable) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      gsap.to(glow, {
        opacity: 1,
        x: (x - 0.5) * 60,
        y: (y - 0.5) * 60,
        duration: 0.6,
      });

      gsap.to(icon, {
        x: (x - 0.5) * 20,
        y: (y - 0.5) * 20,
        duration: 0.4,
      });
    };

    const onMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.6,
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
      className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Dynamic Glow Overlay */}
      <div 
        ref={glowRef}
        className="absolute -inset-20 opacity-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Meta */}
        <div className="flex items-center justify-between mb-8">
          <span className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
            {category}
          </span>
          <div className="flex items-center gap-1">
            {rating && (
              <>
                <Star className="w-3 h-3 text-[#F5C518] fill-[#F5C518]" />
                <span className="text-xs font-bold text-gray-700">{rating}</span>
              </>
            )}
            {!rating && level && (
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{level}</span>
            )}
          </div>
        </div>

        {/* Product Icon */}
        <div 
          ref={iconRef}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:shadow-xl"
          style={{ backgroundColor: `${color}10` }}
        >
          <Icon className="w-8 h-8" style={{ color: color }} />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-[#FF6B9D] transition-colors duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags?.map(tag => (
            <span key={tag} className="text-[9px] font-mono font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-md uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {duration && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
              <Clock className="w-4 h-4" />
              {duration}
            </div>
          )}
          {level && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
              <BarChart className="w-4 h-4" />
              {level}
            </div>
          )}
          {features?.map(f => (
            <div key={f} className="flex items-center gap-2 text-gray-400 text-[9px] font-mono uppercase tracking-wider">
              <Smartphone className="w-3 h-3" />
              {f}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
            <p className="text-2xl font-serif font-bold text-black">{price}</p>
          </div>
          
          <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg group-hover:bg-[#FF6B9D]">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
