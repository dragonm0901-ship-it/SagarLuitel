import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Package, 
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';
import { storeProducts, type StoreProduct } from '@/data/storeProducts';

export function StoreProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    const found = storeProducts.find(p => p.id === id);
    if (found) {
      setProduct(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) return null;

  const Icon = product.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-32 pb-24 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate('/store')}
          className="group flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all mb-12"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Store
        </button>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Product Hero & Visual */}
          <div className="lg:col-span-7">
            <div className="relative mb-12">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
                style={{ backgroundColor: product.color }}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 block"
              >
                Category // {product.category}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-serif font-bold text-black dark:text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-8"
              >
                {product.title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic border-l-4 pl-8"
                style={{ borderColor: product.color + '40' }}
              >
                "{product.description}"
              </motion.p>
            </div>

            {/* Product Overview */}
            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5" style={{ color: product.color }} />
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-black dark:text-white">
                  Product Overview
                </h2>
              </div>
              <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
                {product.fullDescription}
              </p>
            </div>

            {/* Features Grid (If exists) */}
            {product.features && (
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: product.color }} />
                    <span className="text-sm font-medium text-black dark:text-white">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Package Details & CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-40 space-y-8">
              {/* Package Details Box */}
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Package className="w-5 h-5" style={{ color: product.color }} />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
                      Inside the Package
                    </h3>
                  </div>

                  <ul className="space-y-6 mb-10">
                    {product.packageIncludes.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white/20 transition-all group-hover:scale-150" style={{ backgroundColor: product.color }} />
                        <span className="text-sm font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Pricing</span>
                      <span className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white">{product.price}</span>
                    </div>
                    <button 
                      className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
                      style={{ backgroundColor: product.color, color: 'white' }}
                    >
                      Acquire Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Sagar Contact CTA */}
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-black text-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <h4 className="text-xl font-serif font-black mb-4 relative z-10">
                  Looking for a custom solution?
                </h4>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed relative z-10">
                  Want to view all? <button 
                    onClick={() => window.open('https://wa.me/#', '_blank')}
                    className="text-[#FF6B9D] hover:text-[#F5C518] font-bold underline underline-offset-4 transition-colors"
                  >
                    Contact Sagar
                  </button>
                </p>

                <button 
                  onClick={() => window.open('https://wa.me/#', '_blank')}
                  className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.3em] group relative z-10"
                >
                  Start WhatsApp chat 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
