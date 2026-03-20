import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

interface NavLink {
  label: string;
  href: string;
  isSpecial?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Store', href: '/store', isSpecial: true },
];

export function Navbar() {
  const scrolled = useScrolled();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power4.out' }
      );
      gsap.from(".menu-item", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }
  }, [isOpen]);

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative flex items-center justify-between bg-white/70 backdrop-blur-2xl rounded-3xl px-6 py-3 border border-white/20 shadow-2xl transition-all duration-500 ${
          scrolled ? 'shadow-black/5' : 'shadow-transparent'
        }`}>
          {/* Logo */}
          <Link to="/" className="group relative flex items-center gap-2" onClick={closeMenu}>
            <div className="relative overflow-hidden rounded-full">
              <img
                src="/images/hero-portrait.png"
                alt="Sagar Luitel"
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#F5C518]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8 pr-8 border-r border-gray-100">
              {navLinks.map((link) => renderLink(link, "relative text-gray-700 hover:text-black text-sm transition-colors group py-2 font-medium flex items-center gap-1.5"))}
            </div>

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

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
                onClick={closeMenu}
              />
              <div
                ref={mobileMenuRef}
                className="fixed top-0 left-0 right-0 max-h-[60vh] z-[55] bg-white rounded-b-3xl shadow-2xl pt-4 pb-4 flex flex-col"
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
                    <div className="menu-item flex items-center justify-center pb-4 border-b border-gray-100/50 mb-4">
                      <div className="relative">
                        <img
                          src="/images/hero-portrait.png"
                          alt="Sagar Luitel"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                    </div>

                    <nav className="space-y-1 mb-6">
                      {navLinks.map((link) => (
                        <div key={link.label} className="menu-item">
                          {renderLink(link, "group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50/50 transition-all border border-transparent hover:border-gray-100")}
                        </div>
                      ))}
                    </nav>

                    <div className="menu-item mb-4">
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
