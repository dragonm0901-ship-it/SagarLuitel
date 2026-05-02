import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

interface NavLink {
  label: string;
  href: string;
  isSpecial?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Snippets', href: '/snippets' },
  { label: 'Store', href: '/store', isSpecial: true },
];

export function Navbar() {
  const scrolled = useScrolled();
  const location = useLocation();
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
    const isActive = location.pathname === link.href;
    
    const content = (
      <>
        <span className="relative inline-block">
          {link.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8C42] rounded-full" />
          )}
        </span>
        {link.isSpecial && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D] shadow-[0_0_8px_#FF6B9D]" />
        )}
      </>
    );

    if (isHash) {
      return (
        <a 
          key={link.label} 
          href={link.href} 
          className={className}
          onClick={closeMenu}
        >
          {content}
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
        {content}
      </Link>
    );
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={navContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group/header relative flex items-center justify-between bg-white dark:bg-[#0A0A0A] rounded-3xl px-6 py-3 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 overflow-hidden"
          style={{
            backgroundImage: isHovered && !document.documentElement.classList.contains('dark')
              ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 197, 24, 0.1), rgba(255, 107, 157, 0.1), transparent 80%)`
              : isHovered && document.documentElement.classList.contains('dark')
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 197, 24, 0.15), rgba(255, 107, 157, 0.15), rgba(10, 10, 10, 0.4) 80%)`
              : ''
          }}
        >
          {/* Subtle Glow Overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/header:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.2), transparent)`
            }}
          />
          {/* Logo */}
          <Link to="/" className="group relative flex items-center gap-2 z-10" onClick={closeMenu}>
            <div className="relative overflow-hidden rounded-full header-logo">
              <img
                src="/images/hero-portrait.png"
                alt="Sagar Luitel"
                className="header-logo w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#F5C518]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full header-logo" />
            </div>
          </Link>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 px-8 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-sm transition-all duration-300">
            {navLinks.map((link) => renderLink(link, "relative text-gray-700 dark:text-gray-400 group-hover/header:dark:text-white hover:text-black dark:hover:text-white text-[13px] transition-colors group py-1 font-medium flex items-center gap-1.5 whitespace-nowrap"))}
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
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              Hire Me!
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
             <button
                onClick={toggleMenu}
                className="w-12 h-12 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-black dark:text-white"
             >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>


        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10 md:hidden"
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-6 right-6 mt-1 md:hidden bg-white dark:bg-[#0A0A0A] rounded-3xl shadow-2xl p-4 border border-border z-10"
            >
              <div className="flex-1 overflow-y-auto hide-scrollbar max-h-[60vh]">
                <div className="flex flex-col">


                  <nav className="space-y-0.5 mb-4">
                    {navLinks.map((link, i) => (
                      <motion.div 
                        key={link.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 + (i * 0.05) }}
                      >
                        {renderLink(link, "relative flex items-center justify-between py-2 px-3 text-lg font-medium transition-colors text-black dark:text-white")}
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
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
                      className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3.5 rounded-2xl font-bold text-base shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      Hire Me Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  </>);
}
