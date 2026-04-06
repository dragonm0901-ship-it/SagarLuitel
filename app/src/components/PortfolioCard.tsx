import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortfolioCardProps {
  id: string;
  image: string;
  title: string;
  year: string;
  tags: string[];
  challenge?: string;
  magic?: string;
  metrics?: { label: string; value: string };
  github?: string;
  live?: string;
  isMobile?: boolean;
  status?: 'ready' | 'development';
}

export const PortfolioCard = forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ id, image, title, year, tags, metrics, github, live, isMobile, status = 'ready' }, ref) => {
    const isDev = status === 'development';

    const gradients: Record<string, string> = {
      'gradient-1': 'linear-gradient(135deg, #FF6B9D 0%, #F5C518 100%)',
      'gradient-2': 'linear-gradient(135deg, #3B82F6 0%, #22C55E 100%)',
      'gradient-3': 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    };

    const cardContent = (
      <div className="flex flex-col h-full w-full">
        {/* SVG Filter for Liquid Distortion */}
        <svg className="hidden">
          <filter id="liquid-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.01;0.015;0.01" dur="5s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" result="distort">
              <animate attributeName="scale" values="0;20;0" dur="0.4s" begin="mouseenter" fill="freeze" />
            </feDisplacementMap>
          </filter>
        </svg>

        {/* Image / Gradient Placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {isDev ? (
            <div 
              className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative"
              style={{ background: gradients[image] || 'linear-gradient(135deg, #1A1A1A, #000)' }}
            >
               <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 mx-auto border border-white/30 animate-pulse">
                     <Cpu className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <span className="text-[10px] md:text-xs font-mono font-black text-white/90 uppercase tracking-[0.3em] mb-2 block">Status: Orchestrating</span>
                  <p className="text-[9px] md:text-[10px] font-mono text-white/60 uppercase tracking-widest leading-relaxed max-w-[180px] mx-auto italic">
                     Ready to view soon. <br/> Stay tuned.
                  </p>
               </div>
               {/* Decorative noise/grain overlay for gradients */}
               <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
          ) : (
            <motion.img
              layoutId={`image-${id}`}
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:[filter:url(#liquid-filter)]"
            />
          )}

          {/* View Button (Only for Ready Projects) */}
          {!isDev && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <div className="w-full bg-white dark:bg-[#1A1A1A] text-black dark:text-white px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors duration-300">
                View Project Details
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          )}
          
          {isDev && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-[10px] font-mono uppercase tracking-widest font-black">Coming 2026</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 flex flex-col flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4 gap-1">
            <motion.h3 
              layoutId={`title-${id}`}
              className="text-[11px] md:text-2xl font-serif font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-tight"
            >
              {title}
            </motion.h3>
            <span className="text-gray-400 font-mono text-[8px] md:text-sm">{year}</span>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 mt-auto pt-2 md:pt-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1 md:gap-2">
                {tags.slice(0, isMobile ? 2 : tags.length).map((tag) => (
                  <span
                    key={tag}
                    className="text-[7px] md:text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-1 md:px-2 py-0.5 md:py-1 rounded border border-gray-100 dark:border-white/10 uppercase transition-colors duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {metrics && !isDev && (
                <div className="text-right shrink-0">
                  <p className="text-[7px] md:text-[10px] font-mono text-gray-400 uppercase leading-none mb-0.5">{metrics.label}</p>
                  <p className="text-[10px] md:text-lg font-serif font-bold text-[#FF6B9D] leading-none">{metrics.value}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <motion.div
        ref={ref}
        layoutId={`card-${id}`}
        className="group relative bg-white/70 dark:bg-[#1A1A1A]/70 backdrop-blur-xl rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-white/20 dark:border-white/10 will-change-transform transition-all duration-500 flex flex-col h-full w-full"
      >
        {isDev ? (
          <div className="flex flex-col h-full w-full cursor-default">
            {cardContent}
          </div>
        ) : (
          <Link to={`/project/${id}`} className="flex flex-col h-full w-full">
            {cardContent}
          </Link>
        )}

        {/* External Links - Only for Ready Projects */}
        {!isDev && (github || live) && (
          <div className="px-3 pb-3 md:px-6 md:pb-6 pt-0 flex gap-2 md:gap-3">
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3 h-3 md:w-3.5 md:h-3.5" />
                REPO
              </a>
            )}
            {live && (
              <a 
                href={live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 hover:text-[#FF6B9D] dark:hover:text-[#FF6B9D] transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" />
                LIVE SITE
              </a>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

PortfolioCard.displayName = 'PortfolioCard';
