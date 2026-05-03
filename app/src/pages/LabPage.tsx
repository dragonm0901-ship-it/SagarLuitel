import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, Cpu, Rocket, ChevronRight, Activity, MousePointer2, Layers,
  Compass, Zap, Magnet, Infinity as InfinityIcon, Variable, Type as TypeIcon, Move, Waves 
} from 'lucide-react';
import { experiments } from '@/data/experiments';

const ExperimentIcon = ({ name, className = "w-4 h-4" }: { name: string, className?: string }) => {
  const iconMap: Record<string, React.ElementType> = {
    Compass, Zap, Magnet, Infinity: InfinityIcon, Layers, Variable, Type: TypeIcon, Move, Waves,
    Rocket, Code2, Activity, Cpu, MousePointer2
  };
  const Icon = iconMap[name] || Layers;
  return <Icon className={className} />;
};

const LabCard = ({ experiment, index }: { experiment: typeof experiments[0], index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link 
        to={`/lab/${experiment.id}`}
        className="group relative flex flex-col h-full p-6 md:p-8 rounded-[4px] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-third/5 dark:hover:shadow-brand-primary/5 bg-white dark:bg-brand-secondary/40 border-gray-200 dark:border-white/5 hover:border-brand-third/20 dark:hover:border-brand-primary/20"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[4px] bg-brand-third dark:bg-brand-primary text-white shadow-lg transition-colors duration-700">
              <ExperimentIcon name={experiment.icon} className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">{experiment.category}</span>
          </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-serif font-black mb-4 text-brand-secondary dark:text-white transition-colors leading-tight">
          {experiment.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">
          {experiment.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
           <div className="flex gap-2">
              {experiment.tech.slice(0, 2).map(t => (
                 <span key={t} className="text-[8px] font-mono uppercase bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-gray-500">{t}</span>
              ))}
           </div>
           <div className="p-2 rounded-full border border-gray-200 dark:border-white/10 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
           </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-brand-third/0 dark:bg-brand-primary/0 group-hover:bg-brand-third/5 dark:group-hover:bg-brand-primary/5 transition-all duration-500 rounded-[4px]" />
      </Link>
    </motion.div>
  );
};

export function LabPage() {
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
          className="mb-12 md:mb-20 px-2 md:px-0"
        >
          <h1 className="text-4xl md:text-8xl font-serif font-black text-brand-secondary dark:text-white transition-colors duration-700 leading-[1.1] md:leading-[0.9] tracking-tighter mb-6">
            The <span className="text-brand-third dark:text-brand-primary transition-colors duration-700">Lab</span>.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-700 text-base md:text-xl max-w-2xl leading-relaxed">
            Raw, unpolished experiments. Exploring the bleeding edge of GSAP, DOM physics, and motion choreography.
          </p>
        </motion.div>

        {/* 1x1 Grid on mobile, 3x3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {experiments.map((experiment, i) => (
            <LabCard key={experiment.id} experiment={experiment} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
