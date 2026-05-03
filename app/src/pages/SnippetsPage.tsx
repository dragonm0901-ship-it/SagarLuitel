import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Code2, Cpu, Globe, Rocket, ChevronRight } from 'lucide-react';
import { snippets } from '@/data/snippets';

const CategoryIcon = ({ category }: { category: string }) => {
  const Icon = ({
    React: Globe,
    GSAP: Rocket,
    WebGL: Cpu,
    Architecture: Terminal,
    CSS: Code2
  }[category as 'React' | 'GSAP' | 'WebGL' | 'Architecture' | 'CSS']) || Code2;
  return <Icon className="w-4 h-4" />;
};

const SnippetCard = ({ snippet, index }: { snippet: typeof snippets[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsFlipped(true);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsFlipped(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {/* Front Face (Normal Flow defines the card size) */}
        <div 
          style={{ backfaceVisibility: "hidden" }}
          className="w-full h-full pointer-events-auto"
        >
          <Link 
            to={`/snippets/${snippet.id}`}
            className="group flex flex-col h-full p-4 md:p-8 rounded-[4px] md:rounded-[4px] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 bg-[#FAFAFA] dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-transparent hover:bg-white dark:hover:bg-white/10"
          >
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-[4px] bg-brand-secondary dark:bg-brand-primary text-white dark:text-brand-secondary transition-all duration-500 shadow-sm">
                    <CategoryIcon category={snippet.category} />
                </div>
                <span className="text-[8px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest">{snippet.category}</span>
              </div>
              <span className="text-[8px] md:text-[10px] font-mono text-gray-400 opacity-50 uppercase tracking-widest">{snippet.date}</span>
            </div>
            
            <h3 className="text-sm md:text-xl font-serif font-black mb-2 md:mb-4 text-brand-secondary dark:text-white transition-colors leading-tight line-clamp-2">
              {snippet.title}
            </h3>
            
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mb-6 md:mb-8 line-clamp-2 leading-relaxed">
              {snippet.shortDesc}
            </p>

            <div className="mt-auto flex items-center gap-2 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-brand-third dark:text-brand-primary transition-all group-hover:gap-4">
              <span>Explore</span>
              <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
            </div>
          </Link>
        </div>

        {/* Back Face (Absolute Inset-0 matches whatever height the Front defines) */}
        <div 
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
          className="absolute inset-0 w-full h-full bg-[#0F0F0F] rounded-[4px] p-8 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/20" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
              <div className="w-2 h-2 rounded-full bg-green-500/20" />
            </div>
            <span className="text-[8px] font-mono text-white uppercase tracking-widest opacity-40">
              {snippet.language}.log
            </span>
          </div>
          
          <div className="relative overflow-hidden flex-1 mb-6">
            <pre className="text-[10px] leading-relaxed text-gray-400 font-mono">
              {snippet.code.split('\n').filter(line => line.trim().length > 0).slice(0, 10).join('\n')}
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none" />
          </div>

          <Link 
            to={`/snippets/${snippet.id}`}
            className="mt-auto group/btn flex items-center justify-between p-4 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-mono uppercase tracking-widest text-white font-bold"
          >
            <span>See Full Detail</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function SnippetsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-brand-secondary transition-colors duration-0 md:duration-700 pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 px-4 md:px-0"
        >
          <h1 className="text-4xl md:text-8xl font-serif font-black text-brand-secondary dark:text-white transition-colors duration-700 leading-[1.1] md:leading-[0.9] tracking-tighter mb-6">
            Code <span className="text-brand-third dark:text-brand-primary pr-2">Snippets</span>.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-700 text-base md:text-xl max-w-2xl leading-relaxed">
            Dropping knowledge on advanced frontend architecture, GSAP orchestration, and React rendering.
          </p>
        </motion.div>

        {/* Snippets Grid - 2x2 on Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0 auto-rows-fr">
          {snippets.map((snippet, i) => (
            <SnippetCard key={snippet.id} snippet={snippet} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
