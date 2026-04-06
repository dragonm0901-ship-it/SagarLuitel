import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Copy, Check, Terminal, Code2, Cpu, Globe, Rocket } from 'lucide-react';
import { snippets } from '@/data/snippets';
import type { Snippet } from '@/data/snippets';

export function SnippetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = snippets.find(s => s.id === id);
    if (found) {
      setSnippet(found);
    } else {
      navigate('/snippets');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const copyToClipboard = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!snippet) return null;

  const CategoryIcon = {
    React: Globe,
    GSAP: Rocket,
    WebGL: Cpu,
    Architecture: Terminal,
    CSS: Code2
  }[snippet.category] || Code2;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] pt-32 pb-24 transition-colors duration-700"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Navigation */}
        <Link 
          to="/snippets"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Hub</span>
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 rounded-xl bg-black dark:bg-white/10 text-white">
                <CategoryIcon className="w-5 h-5" />
             </div>
             <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">{snippet.category}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-black text-[#1A1A1A] dark:text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-6">
            {snippet.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            {snippet.shortDesc}
          </p>
        </div>

        {/* Code Section */}
        <div className="relative group mb-16">
          <div className="absolute top-4 right-4 z-20">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all active:scale-95"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div 
                    key="check"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-mono">Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="copy"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-xs font-mono">Copy Code</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/5 bg-white/5">
               <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20" />
               </div>
               <span className="text-[9px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">{snippet.language}</span>
            </div>
            <pre className="p-5 md:p-12 overflow-x-auto">
              <code className="text-[13px] md:text-base font-mono leading-relaxed text-[#F8F8F2]">
                {snippet.code}
              </code>
            </pre>
          </div>
        </div>

        {/* Explanation */}
        <div className="max-w-3xl">
          <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] dark:text-white mb-6">Execution Strategy</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
            {snippet.explanation}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 pt-12 border-t border-gray-200 dark:border-white/5 text-left items-start">
             <div>
                <p className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Architecture</p>
                <p className="text-sm font-bold dark:text-white">Senior Tier</p>
             </div>
             <div>
                <p className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Language</p>
                <p className="text-sm font-bold dark:text-white capitalize">{snippet.language}</p>
             </div>
             <div className="sm:col-span-2 md:col-span-1">
                <p className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Last Updated</p>
                <p className="text-sm font-bold dark:text-white">{snippet.date}</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
