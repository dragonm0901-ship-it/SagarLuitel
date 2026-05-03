import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LucideIcon, ArrowRight, BarChart, Smartphone } from 'lucide-react';
import gsap from 'gsap';

interface ProductCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  previewUrl?: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export function ProductCard({ 
  id, category, title, description, price, stats, tags, icon: Icon, color, features 
}: ProductCardProps) {
  const navigate = useNavigate();
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
        duration: 0.08,
        ease: 'power2.inOut',
      });

      gsap.to(icon, {
        x: (x - 0.5) * 20,
        y: (y - 0.5) * 20,
        duration: 0.08,
        ease: 'power2.inOut',
      });
    };

    const onMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.08,
        ease: 'power2.inOut',
      });
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.15,
        ease: 'power2.inOut',
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
      onClick={() => navigate(`/store/${id}`)}
      style={{ '--hover-accent': color } as React.CSSProperties}
      className="group relative bg-white dark:bg-white/5 rounded-[4px] p-5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all duration-150 ease-in-out flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Dynamic Glow Overlay */}
      <div 
        ref={glowRef}
        className="absolute -inset-20 opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out"
        style={{
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-[4px] bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/5 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {category}
          </span>
        </div>

        {/* Product Icon (Magnetic - Standardized for All) */}
        <div 
          ref={iconRef}
          className="w-12 h-12 rounded-[4px] flex items-center justify-center mb-5 transition-all duration-150 ease-in-out group-hover:shadow-xl"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-6 h-6" style={{ color: 'white' }} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2 group-hover:text-[var(--hover-accent)] dark:group-hover:text-[var(--hover-accent)] transition-colors duration-150 ease-in-out leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-[11px] mb-5 leading-relaxed font-medium transition-colors duration-150 ease-in-out line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-[8px] font-mono font-bold bg-gray-50 dark:bg-black/30 text-gray-400 dark:text-gray-400 px-2 py-0.5 rounded uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats?.map(stat => (
            <div key={stat.label} className="flex items-center gap-2 text-gray-400 text-[9px] font-mono uppercase tracking-wider">
               <BarChart className="w-2.5 h-2.5" />
               {stat.value}
            </div>
          ))}
          {features?.slice(0, 2).map(f => (
            <div key={f} className="flex items-center gap-2 text-gray-400 text-[8px] font-mono uppercase tracking-wider">
              <Smartphone className="w-2.5 h-2.5" />
              {f}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-gray-50 dark:border-white/10 flex items-center justify-between transition-colors duration-150 ease-in-out">
          <div>
            <p className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">Price</p>
            <p className="text-xl font-serif font-bold text-black dark:text-white transition-colors duration-150 ease-in-out tracking-tighter">{price}</p>
          </div>
          
          <button className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-[4px] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-white/10 group-hover:bg-[var(--hover-accent)] dark:group-hover:bg-[var(--hover-accent)] dark:group-hover:text-white">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
