import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M12.5 3v13.5a3.5 3.5 0 1 1-3.5-3.5c.34 0 .66.05.97.14V8.5a7 7 0 1 0 6.03 6.94V8.5c1.42 0 2.7.53 3.65 1.41V6.5c-1.3-.87-2.85-1.38-4.52-1.41V3h-2.63z" 
      fill="currentColor"
    />
    <path 
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      d="M12.5 3v13.5a3.5 3.5 0 1 1-3.5-3.5c.34 0 .66.05.97.14V8.5a7 7 0 1 0 6.03 6.94V8.5c1.42 0 2.7.53 3.65 1.41V6.5c-1.3-.87-2.85-1.38-4.52-1.41V3h-2.63z" 
      fill="#ff0050"
      transform="translate(-1, -0.5)"
      style={{ mixBlendMode: 'screen' }}
    />
    <path 
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      d="M12.5 3v13.5a3.5 3.5 0 1 1-3.5-3.5c.34 0 .66.05.97.14V8.5a7 7 0 1 0 6.03 6.94V8.5c1.42 0 2.7.53 3.65 1.41V6.5c-1.3-.87-2.85-1.38-4.52-1.41V3h-2.63z" 
      fill="#00f2ea"
      transform="translate(1, 0.5)"
      style={{ mixBlendMode: 'screen' }}
    />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="insta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f9ce34" />
        <stop offset="50%" stopColor="#ee2a7b" />
        <stop offset="100%" stopColor="#6228d7" />
      </linearGradient>
    </defs>
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12 2C9.288 2 8.948 2.011 7.883 2.06C6.82 2.108 6.096 2.277 5.459 2.525C4.801 2.781 4.243 3.123 3.69 3.676C3.137 4.229 2.795 4.787 2.539 5.445C2.291 6.082 2.122 6.806 2.073 7.869C2.024 8.934 2.013 9.274 2.013 11.986C2.013 14.698 2.024 15.038 2.073 16.103C2.122 17.166 2.291 17.89 2.539 18.527C2.795 19.185 3.137 19.743 3.69 20.296C4.243 20.849 4.801 21.191 5.459 21.447C6.096 21.695 6.82 21.864 7.883 21.912C8.948 21.961 9.288 21.972 12 21.972C14.712 21.972 15.052 21.961 16.117 21.912C17.18 21.864 17.904 21.695 18.541 21.447C19.199 21.191 19.757 20.849 20.31 20.296C20.863 19.743 21.205 19.185 21.461 18.527C21.709 17.89 21.878 17.166 21.927 16.103C21.976 15.038 21.987 14.698 21.987 11.986C21.987 9.274 21.976 8.934 21.927 7.869C21.878 6.806 21.709 6.082 21.461 5.445C21.205 4.787 20.863 4.229 20.31 3.676C19.757 3.123 19.199 2.781 18.541 2.525C17.904 2.277 17.18 2.108 16.117 2.06C15.052 2.011 14.712 2 12 2ZM12 3.802C14.667 3.802 14.984 3.812 16.038 3.86C17.013 3.904 17.541 4.067 17.893 4.204C18.358 4.385 18.69 4.601 19.04 4.951C19.39 5.301 19.606 5.633 19.787 6.098C19.924 6.451 20.087 6.979 20.131 7.954C20.179 9.008 20.189 9.325 20.189 11.992C20.189 14.659 20.179 14.976 20.131 16.03C20.087 17.005 19.924 17.533 19.787 17.886C19.606 18.351 19.39 18.683 19.04 19.033C18.69 19.383 18.358 19.599 17.893 19.78C17.541 19.917 17.013 20.08 16.038 20.124C14.984 20.172 14.667 20.182 12 20.182C9.333 20.182 9.016 20.172 7.962 20.124C6.987 20.08 6.459 19.917 6.107 19.78C5.642 19.599 5.31 19.383 4.96 19.033C4.61 18.683 4.394 18.351 4.213 17.886C4.076 17.533 3.913 17.005 3.869 16.03C3.821 14.976 3.811 14.659 3.811 11.992C3.811 9.325 3.821 9.008 3.869 7.954C3.913 6.979 4.076 6.451 4.213 6.098C4.394 5.633 4.61 5.301 4.96 4.951C5.31 4.601 5.642 4.385 6.107 4.204C6.459 4.067 6.987 3.904 7.962 3.86C9.016 3.812 9.333 3.802 12 3.802ZM12 6.865C9.169 6.865 6.873 9.161 6.873 11.992C6.873 14.823 9.169 17.119 12 17.119C14.831 17.119 17.127 14.823 17.127 11.992C17.127 9.161 14.831 6.865 12 6.865ZM12 15.317C10.164 15.317 8.675 13.828 8.675 11.992C8.675 10.156 10.164 8.667 12 8.667C13.836 8.667 15.325 10.156 15.325 11.992C15.325 13.828 13.836 15.317 12 15.317ZM17.279 5.485C16.617 5.485 16.081 6.021 16.081 6.683C16.081 7.345 16.617 7.881 17.279 7.881C17.941 7.881 18.477 7.345 18.477 6.683C18.477 6.021 17.941 5.485 17.279 5.485Z" 
      className="group-hover:fill-[url(#insta-gradient)] fill-white transition-all duration-300"
    />
  </svg>
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/dragonm0901-ship-it', label: 'GitHub', hoverBg: 'hover:bg-white', hoverIcon: 'hover:text-black' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@sagar.luitel.tech?_r=1&_t=ZS-94UJDvX6T0D', label: 'TikTok', hoverBg: 'hover:bg-black', hoverIcon: 'hover:text-white' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sagar-luitel-4a510730a/', label: 'LinkedIn', hoverBg: 'hover:bg-white', hoverIcon: 'hover:text-[#0077b5]' },
  { icon: InstagramIcon, href: '#', label: 'Instagram', hoverBg: 'hover:bg-white', hoverIcon: 'group-hover:text-transparent' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger when location changes to account for dynamic content height
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

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
    <footer ref={footerRef} className="bg-brand-secondary text-white pt-16 md:pt-24 pb-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={contentRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4 flex flex-col items-start text-left">
            <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter">
              SAGAR <span className="text-brand-third dark:text-brand-primary transition-colors duration-700">LUITEL</span>
            </h3>
            <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed max-w-xs">
              Front End Magician & WebGL Architect. Engineering immersive digital realms for visionaries.
            </p>
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className={`group w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.hoverBg} ${social.hoverIcon}`}
                    >
                      <Icon className="w-5 h-5" />
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
              {[
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/#services' },
                { label: 'Portfolio', href: '/projects' },
                { label: 'Contact', href: '/#contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-gray-400 hover:text-brand-third transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/store" className="text-sm text-brand-primary hover:text-brand-third dark:text-brand-third dark:hover:text-brand-primary transition-colors font-bold flex items-center gap-2">
                  Store <span className="w-1 h-1 rounded-full bg-brand-third dark:bg-brand-primary" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="text-left">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 mb-5">Wizardry</h4>
            <ul className="space-y-3">
              {['React Three Fiber', 'WebGL / Shaders', 'GSAP Animation', 'Performance Math', 'Frontend Architecture'].map((item) => (
                <li key={item} className="text-sm text-gray-400 hover:text-brand-primary transition-colors cursor-default">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 text-left">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Transmission</h4>
            <p className="text-gray-400 font-mono text-xs mb-3">Pokhara, Nepal / Global</p>
            <a 
              href="mailto:sagar.luitel.0909@gmail.com" 
              className="group relative text-base md:text-xl font-serif font-bold text-white transition-all duration-300 inline-block"
            >
              <span className="relative z-10 group-hover:text-brand-primary transition-colors">
                sagar.luitel.0909@gmail.com
              </span>
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
