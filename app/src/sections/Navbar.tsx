import { useState, useEffect } from 'react';
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);



  const handleHireMe = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderLink = (link: NavLink, className: string) => {
    const isHash = link.href.startsWith('#');
    const isActive = location.pathname === link.href;
    
    const content = (
      <>
        <span className="relative inline-block nav-link-underline">
          {link.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-third dark:bg-brand-primary rounded-full" />
          )}
        </span>
        {link.isSpecial && (
          <span className="w-2 h-2 rounded-full bg-brand-third dark:bg-brand-primary shadow-[0_0_10px_rgba(65,226,186,0.2)] flex-shrink-0" />
        )}
      </>
    );

    if (isHash) {
      return (
        <a key={link.label} href={link.href} className={className} onClick={closeMenu}>
          {content}
        </a>
      );
    }
    return (
      <Link key={link.label} to={link.href} className={className} onClick={closeMenu}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[10001] transition-all duration-500 ${scrolled ? 'py-3 md:py-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 shadow-sm' : 'py-6 md:py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 z-10 flex-shrink-0" onClick={closeMenu}>
              <div className="w-10 h-10 aspect-square overflow-hidden rounded-full border border-gray-100 dark:border-white/10 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm header-logo">
                <img
                  src="/images/hero-portrait.png"
                  alt="Sagar Luitel"
                  className="w-full h-full rounded-full object-cover header-logo"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Centered, No Background */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return renderLink(link, `relative text-gray-500 dark:text-gray-400 text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors duration-300 hover:text-black dark:hover:text-white ${!isActive ? 'group' : ''}`);
              })}
            </div>

            {/* Link Hover Styles (using global CSS for gradient underline) */}
            <style dangerouslySetInnerHTML={{ __html: `
              .nav-link-underline::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 1.5px;
                background: #ff930f;
                transition: width 0.3s ease-in-out;
              }
              .dark .nav-link-underline::after {
                background: #0f7bff;
              }
              .group:hover .nav-link-underline::after {
                width: 100%;
              }
            `}} />

            {/* Desktop Navigation - Right Side Action */}
            <div className="hidden md:flex items-center z-10">
              <button 
                onClick={handleHireMe}
                className="bg-brand-third dark:bg-brand-primary text-black dark:text-white px-8 py-2.5 rounded-[4px] font-bold text-xs transition-all active:scale-95 shadow-sm hover:shadow-brand-third/20 transition-all duration-300"
              >
                Hire Me!
              </button>
            </div>

            {/* Mobile Right Controls */}
            <div className="flex md:hidden items-center gap-3 relative z-50">
               <button
                  onClick={toggleMenu}
                  className="w-12 h-12 flex items-center justify-center text-brand-third dark:text-brand-primary"
               >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Navigation Sidebar — outside nav to avoid stacking context trap */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white dark:bg-[#0A0A0A] z-[10002] md:hidden flex flex-col p-8 overflow-y-auto hide-scrollbar"
          >
            {/* Sidebar Header: Logo & Close Button */}
            <div className="flex items-center justify-between mb-20">
              <div className="w-12 h-12 aspect-square overflow-hidden rounded-full border border-gray-100 dark:border-white/10 header-logo">
                <img
                  src="/images/hero-portrait.png"
                  alt="Sagar Luitel"
                  className="w-full h-full rounded-full object-cover header-logo"
                />
              </div>
              <button
                onClick={closeMenu}
                className="w-12 h-12 flex items-center justify-center text-brand-third dark:text-brand-primary"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Big Nav Links */}
            <nav className="flex flex-col gap-6 mb-12">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + (i * 0.05) }}
                  >
                    {renderLink(link, `text-5xl font-bold wizard-glow-text transition-none flex items-center justify-start gap-4 ${!isActive ? 'group' : ''}`)}
                  </motion.div>
                );
              })}
            </nav>

            {/* Hire Me Button at Bottom */}
            <div className="mt-auto pb-10">
              <button 
                onClick={() => {
                  closeMenu();
                  handleHireMe();
                }}
                className="w-full bg-brand-third dark:bg-brand-primary text-black dark:text-white px-8 py-5 rounded-[4px] font-bold text-xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-colors duration-300"
              >
                Hire Me Now <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
