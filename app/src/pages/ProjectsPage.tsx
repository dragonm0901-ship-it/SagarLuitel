import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { PortfolioCard } from '@/components/PortfolioCard';

export function ProjectsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700 pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-8xl font-serif font-black text-[#1A1A1A] dark:text-white transition-colors duration-700 leading-[1.1] md:leading-[0.85] tracking-tighter mb-6">
            The Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#F5C518] pr-2">Impact Collection</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-700 text-base md:text-xl max-w-2xl leading-relaxed">
            A comprehensive showcase of strategy, technical orchestration, and high-performance engineering.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <PortfolioCard {...project} isMobile={isMobile} />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Footer Scrim - Optional but adds to premium feel */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-32 pt-24 border-t border-gray-100 dark:border-white/5 text-center"
        >
           <h2 className="text-2xl md:text-4xl font-serif font-black text-[#1A1A1A] dark:text-white mb-6">Want to see more logic?</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-lg mx-auto">
              Check out the Lab for experiments or buy templates in the Store.
           </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
