import { useEffect } from 'react';
import { motion } from 'framer-motion';

const SnippetBlock = ({ title, date, language, code, explanation }: { title: string, date: string, language: string, code: string, explanation: React.ReactNode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">{title}</h3>
        <span className="text-gray-400 font-mono text-sm">{date}</span>
      </div>
      <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-6 relative group">
        <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-4 text-[10px] font-mono text-gray-500 uppercase">{language}</span>
        </div>
        <pre className="p-6 pt-12 overflow-x-auto">
          <code className="text-sm font-mono leading-relaxed text-[#F8F8F2]">
            {code}
          </code>
        </pre>
      </div>
      <div className="prose prose-lg text-gray-600">
        {explanation}
      </div>
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
      className="min-h-screen bg-white pt-32 pb-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-black text-[#1A1A1A] leading-[0.9] tracking-tighter mb-4">
            Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#38B2AC]">Snippets</span>.
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Dropping knowledge on advanced frontend architecture, GSAP orchestration, and React rendering.
          </p>
        </motion.div>

        <SnippetBlock 
          title="React 18 + GSAP Cleanup Pattern"
          date="Mar 2026"
          language="typescript"
          code={`import { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\n\nexport const useGsapAnimation = () => {\n  const ref = useRef<HTMLDivElement>(null);\n\n  useEffect(() => {\n    // Context isolates GSAP selections to this component scope\n    const ctx = gsap.context(() => {\n      gsap.to('.child', { opacity: 1, stagger: 0.1 });\n    }, ref);\n    \n    // Critical: Revert on unmount to prevent memory leaks in strict mode\n    return () => ctx.revert();\n  }, []);\n\n  return ref;\n};`}
          explanation={
            <p>
              In React 18 strict mode, <code>useEffect</code> naturally fires twice in development. If you aren't using <code>gsap.context()</code>, you will instantly build up memory leaks and duplicate ScrollTriggers. Always wrap your complex animations in a context and call <code>revert()</code>. This keeps the animation lifecycle perfectly bound to the component.
            </p>
          }
        />

        <SnippetBlock 
          title="Framer Motion FLIP Transitions"
          date="Feb 2026"
          language="tsx"
          code={`import { motion, AnimatePresence } from 'framer-motion';\nimport { Routes, Route, useLocation } from 'react-router-dom';\n\nexport const AnimatedRoutes = () => {\n  const location = useLocation();\n  \n  return (\n    <AnimatePresence mode="wait">\n      {/* Providing key triggers exit animations correctly */}\n      <Routes location={location} key={location.pathname}>\n        <Route path="/" element={<Home />} />\n        <Route path="/detail/:id" element={<Detail />} />\n      </Routes>\n    </AnimatePresence>\n  );\n};\n\n// In both Home and Detail, use a matching layoutId:\n// <motion.img layoutId={\`image-\${id}\`} src={src} />`}
          explanation={
            <p>
              To achieve native-feeling page transitions on the web, applying the <b>FLIP (First, Last, Invert, Play)</b> technique is required. By leveraging Framer Motion's <code>layoutId</code> alongside a properly keyed <code>AnimatePresence</code> React Router wrapper, elements seamlessly glide from their list thumbnail size into the hero container on the newly loaded page without any imperative coordinate math.
            </p>
          }
        />
      </div>
    </motion.div>
  );
}
