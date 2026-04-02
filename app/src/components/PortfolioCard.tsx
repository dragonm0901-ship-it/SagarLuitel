import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
}

export const PortfolioCard = forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ id, image, title, year, tags, challenge, magic, metrics }, ref) => {
    return (
      <motion.div
        ref={ref}
        layoutId={`card-${id}`}
        className="group relative bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm border border-white/20 will-change-transform transition-all duration-500 flex flex-col h-full w-full"
      >
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
              <div className="w-full bg-white text-black px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-300">
                View Project
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <motion.h3 
                layoutId={`title-${id}`}
                className="text-2xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#FF6B9D] transition-colors duration-300"
              >
                {title}
              </motion.h3>
              <span className="text-gray-400 font-mono text-sm">{year}</span>
            </div>

            {/* Senior Narrative - Touch-aware visibility */}
            {(challenge || magic) && (
              <div className="grid transition-all duration-500 ease-&lsqb;cubic-bezier(0.16,1,0.3,1)&rsqb; 
                grid-rows-[1fr] opacity-100 
                md:grid-rows-[0fr] md:opacity-0 
                md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100"
              >
                <div className="overflow-hidden">
                  <div className="mb-6 mt-1 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">The Challenge</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{challenge}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-[#F5C518] uppercase tracking-widest">The Magic</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{magic}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {metrics && (
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-mono text-gray-400 uppercase leading-none mb-1">{metrics.label}</p>
                  <p className="text-lg font-serif font-bold text-[#FF6B9D] leading-none">{metrics.value}</p>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

PortfolioCard.displayName = 'PortfolioCard';
