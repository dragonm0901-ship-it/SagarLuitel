import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface DarkModeTerminalProps {
  onSuccess: () => void;
  onClose?: () => void;
  inline?: boolean;
  isDarkMode?: boolean;
}

const CORRECT_ANSWER_DARK = `function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}`;

const CORRECT_ANSWER_LIGHT = `function setLightMode() {
  document.body.classList.remove("dark-mode");
}`;


function normalize(str: string) {
  return str.replace(/\s+/g, '').trim();
}

export function DarkModeTerminal({ onSuccess, onClose, inline = false, isDarkMode = false }: DarkModeTerminalProps) {
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const CORRECT_ANSWER = isDarkMode ? CORRECT_ANSWER_LIGHT : CORRECT_ANSWER_DARK;

  // Validate the code automatically or via 'Enter' key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      validateCode();
    }
  };

  const validateCode = () => {
    if (isRevealing) return;

    if (normalize(code) === normalize(CORRECT_ANSWER)) {
      // Success!
      setIsError(false);
      onSuccess();
    } else {
      // Failure
      const newAttempts = Math.min(attempts + 1, 3);
      setAttempts(newAttempts);
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
      
      // Auto-reveal after 3 failures
      if (newAttempts >= 3) {
        setIsRevealing(true);
        let i = 0;
        setCode('');
        const interval = setInterval(() => {
          setCode(CORRECT_ANSWER.slice(0, i));
          i++;
          if (i > CORRECT_ANSWER.length) {
            clearInterval(interval);
            setTimeout(() => {
                onSuccess();
            }, 500);
          }
        }, 30);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`${inline ? 'relative' : 'absolute bottom-12 left-12'} w-[340px] md:w-[400px] bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[200] pointer-events-auto`}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/10">
        <div className="flex gap-1.5">
          <div 
            onClick={onClose}
            className="group w-3.5 h-3.5 rounded-full bg-[#FF5F56] cursor-pointer hover:opacity-80 transition-all flex items-center justify-center relative" 
            style={{ cursor: 'pointer' }}
          >
            <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="mx-auto text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          {isDarkMode ? 'restore_light.js' : 'inject_darkness.js'}
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 relative">
        <p className="text-xs text-gray-500 font-mono mb-3 select-none">
          {'//'} Write the exact JS function to toggle {isDarkMode ? 'light' : 'dark'} mode<br/>
          {'//'} Cmd/Ctrl + Enter to execute
        </p>
        <motion.div animate={isError ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e);
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={() => {
               // Ensure cursor moves to end if clicked repeatedly or force focus
            }}
            className="w-full h-[84px] bg-transparent text-sm font-mono text-[#F8F8F2] outline-none resize-none placeholder-white/10 pointer-events-auto select-auto"
            placeholder="function..."
            spellCheck={false}
            autoFocus
            style={{ cursor: 'text', userSelect: 'auto', pointerEvents: 'auto' }}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-white/10 select-none">
        <div className="text-[10px] font-mono text-gray-500">
          Attempts: {attempts}/3
        </div>
        <button
          onClick={validateCode}
          disabled={isRevealing}
          className={`text-xs font-mono font-bold px-3 py-1 rounded transition-colors pointer-events-auto ${isRevealing ? 'text-gray-600 cursor-not-allowed' : 'text-[#FF6B9D] hover:bg-white/5 cursor-pointer'}`}
        >
          Execute
        </button>
      </div>
    </motion.div>
  );
}
