import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Cpu, Layers, ArrowRight, Mail } from 'lucide-react';

interface EngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const models = [
  {
    title: "Digital Masterpiece",
    subtitle: "Full Product Build",
    icon: Zap,
    color: "#F5C518",
    description: "End-to-end development of high-performance WebGL & React applications with cinematic transitions.",
    features: ["MVP to Launch", "Custom 3D/Canvas", "Premium UX Design"]
  },
  {
    title: "Performance & Motion",
    subtitle: "Audit & Optimization",
    icon: Cpu,
    color: "#FF6B9D",
    description: "Deep-dive optimization for complex animations, GSAP orchestration, and React rendering bottlenecks.",
    features: ["Lighthouse 100", "GSAP/Framer Sync", "Architecture Review"]
  },
  {
    title: "Design Engineering",
    subtitle: "Strategic Consulting",
    icon: Layers,
    color: "#FF8C42",
    description: "Bridging the gap between design and code for agencies and product teams needing high-end polish.",
    features: ["Component Libraries", "Technical Direction", "Frontend Strategy"]
  }
];

export function EngagementModal({ isOpen, onClose }: EngagementModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0A0A0A]/95 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] scrollbar-hide"
          >
            {/* Background Decorative Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5C518]/10 blur-[100px] -z-10 rounded-full hidden md:block" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 blur-[100px] -z-10 rounded-full hidden md:block" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-5xl font-serif font-bold text-white mb-2">Engagement Models</h2>
                <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">Select your level of sorcery</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {models.map((model, i) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div 
                    className="p-3 md:p-4 w-fit rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: model.color }}
                  >
                    <model.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: model.color }}>{model.subtitle}</h4>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{model.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 md:mb-6">{model.description}</p>
                  
                  <ul className="space-y-2 md:space-y-3">
                    {model.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/5">
              <p className="text-gray-500 text-xs md:text-sm max-w-md text-center md:text-left leading-relaxed">
                Not sure which one fits? Let's hop on a discovery call 
                to explore the technical possibilities of your project.
              </p>
              <a 
                href="mailto:sagar.luitel.0909@gmail.com"
                onClick={onClose}
                className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-xl active:scale-95"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                Direct Inquiry
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
