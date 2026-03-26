import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white pt-16 md:pt-24 pb-10 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={contentRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4 flex flex-col items-start text-left">
            <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter">
              SAGAR <span className="text-[#F5C518]">LUITEL</span>
            </h3>
            <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed max-w-xs">
              Front End Magician & WebGL Architect. Engineering immersive digital realms for visionaries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F5C518] hover:text-black transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="text-left">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 mb-5">Sitemap</h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-[#F5C518] transition-colors">{item}</a>
                </li>
              ))}
              <li>
                <a href="/store" className="text-sm text-[#FF6B9D] hover:text-[#F5C518] transition-colors font-bold flex items-center gap-2">
                  Store <span className="w-1 h-1 rounded-full bg-[#FF6B9D]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="text-left">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 mb-5">Wizardry</h4>
            <ul className="space-y-3">
              {['React Three Fiber', 'WebGL / Shaders', 'GSAP Animation', 'Performance Math', 'Frontend Architecture'].map((item) => (
                <li key={item} className="text-sm text-gray-400">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 text-left">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Transmission</h4>
            <p className="text-gray-400 font-mono text-xs mb-3">Pokhara, Nepal / Global</p>
            <a href="mailto:hello@sagar.dev" className="text-lg md:text-2xl font-serif font-bold text-white hover:text-[#F5C518] transition-colors break-words">
              hello@sagar.dev
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            © 2026 Sagar Luitel
          </p>
          <div className="flex items-center gap-6 text-xs md:text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
