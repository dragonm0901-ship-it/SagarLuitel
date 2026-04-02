import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
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
}

export const PortfolioCard = forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ id, image, title, year, tags, metrics, github, live, isMobile }, ref) => {
    return (
      <motion.div
        ref={ref}
        layoutId={`card-${id}`}
        className="group relative bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm border border-white/20 will-change-transform transition-all duration-500 flex flex-col h-full w-full"
      >
        {/* Main Project Link (Image & Content) */}
        <Link to={`/project/${id}`} className="flex flex-col h-full w-full">
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

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              layoutId={`image-${id}`}
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:[filter:url(#liquid-filter)]"
            />

            {/* View Button */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <div className="w-full bg-white text-black px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-300">
                View Project Details
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 flex flex-col flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4 gap-1">
              <motion.h3 
                layoutId={`title-${id}`}
                className="text-base md:text-2xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#FF6B9D] transition-colors duration-300 leading-tight"
              >
                {title}
              </motion.h3>
              <span className="text-gray-400 font-mono text-[9px] md:text-sm">{year}</span>
            </div>

            <div className="flex flex-col gap-3 md:gap-4 mt-auto pt-2 md:pt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {tags.slice(0, isMobile ? 3 : tags.length).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] md:text-[10px] font-mono font-bold text-gray-500 bg-gray-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-gray-100 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {metrics && (
                  <div className="text-right shrink-0">
                    <p className="text-[8px] md:text-[10px] font-mono text-gray-400 uppercase leading-none mb-1">{metrics.label}</p>
                    <p className="text-sm md:text-lg font-serif font-bold text-[#FF6B9D] leading-none">{metrics.value}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* External Links - Separate from the main Link overlay */}
        {(github || live) && (
          <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0 flex gap-4 md:gap-3">
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-mono font-bold text-gray-400 hover:text-black transition-colors duration-300"
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
                className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-mono font-bold text-gray-400 hover:text-[#FF6B9D] transition-colors duration-300"
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
