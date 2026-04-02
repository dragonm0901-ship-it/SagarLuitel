import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

interface NavLink {
  label: string;
  href: string;
  isSpecial?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#portfolio' },
  { label: 'Lab', href: '/lab' },
  { label: 'Snippets', href: '/snippets' },
  { label: 'Store', href: '/store', isSpecial: true },
];

export function Navbar() {
  const scrolled = useScrolled();
  const [isOpen, setIsOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const renderLink = (link: NavLink, className: string) => {
    const isHash = link.href.startsWith('#');
    if (isHash) {
      return (
        <a 
          key={link.label} 
          href={link.href} 
          className={className}
          onClick={closeMenu}
        >
          {link.label}
          {link.isSpecial && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D] shadow-[0_0_8px_#FF6B9D]" />
          )}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8C42] transition-all duration-300 group-hover:w-full" />
        </a>
      );
    }
    return (
      <Link 
        key={link.label} 
        to={link.href} 
        className={className}
        onClick={closeMenu}
      >
        {link.label}
        {link.isSpecial && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D] shadow-[0_0_8px_#FF6B9D]" />
        )}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8C42] transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={navContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-between bg-white/40 backdrop-blur-xl rounded-3xl px-6 py-3 border border-white/20 shadow-2xl shadow-black/5 transition-all duration-300 overflow-hidden"
          style={{
            background: isHovered 
              ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 197, 24, 0.1), rgba(255, 107, 157, 0.1), transparent 80%)`
              : 'rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* Subtle Glow Overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.2), transparent)`
            }}
          />
          {/* Logo */}
          <Link to="/" className="group relative flex items-center gap-2 z-10" onClick={closeMenu}>
            <div className="relative overflow-hidden rounded-full">
              <img
                src="/images/hero-portrait.png"
                alt="Sagar Luitel"
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#F5C518]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          </Link>

          {/* Desktop Navigation - Centered Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 px-8 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-sm transition-all duration-300">
            {navLinks.map((link) => renderLink(link, "relative text-gray-700 hover:text-black text-[13px] transition-colors group py-1 font-medium flex items-center gap-1.5 whitespace-nowrap"))}
          </div>

          {/* Desktop Navigation - Right Side Action */}
          <div className="hidden md:flex items-center z-10">
            <button 
              onClick={() => {
                if (window.location.pathname !== '/') {
                   window.location.href = '/#contact';
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10"
            >
              Hire Me!
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
             <button
                onClick={toggleMenu}
                className="w-12 h-12 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-black"
             >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Navigation Menu - Rendered via Portal/Outside of Nav container to escape overflow-hidden */}
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
            onClick={closeMenu}
          />
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // power4.out equivalent
            className="fixed top-0 left-0 right-0 max-h-[85vh] z-[155] bg-white rounded-b-3xl shadow-2xl pt-4 pb-4 flex flex-col"
          >
            <div className="flex justify-end px-6 mb-1">
              <button 
                onClick={closeMenu}
                className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center justify-center pb-4 border-b border-gray-100/50 mb-4"
                >
                  <div className="relative">
                    <img
                      src="/images/hero-portrait.png"
                      alt="Sagar Luitel"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                </motion.div>

                <nav className="space-y-1 mb-6">
                  {navLinks.map((link, i) => (
                    <motion.div 
                      key={link.label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 + (i * 0.05) }}
                    >
                      {renderLink(link, "group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50/50 transition-all border border-transparent hover:border-gray-100")}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mb-4"
                >
                  <button 
                    onClick={() => {
                      closeMenu();
                      if (window.location.pathname !== '/') {
                          window.location.href = '/#contact';
                      } else {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-black/10 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Hire Me Now <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>);
}
