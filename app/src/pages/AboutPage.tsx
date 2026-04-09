import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ChevronDown, Mountain, Bike, Music, Trophy, Compass, Megaphone, Terminal, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Digital Marketing', icon: Megaphone, color: '#F5C518', desc: 'Growth hacking & strategic brand positioning.' },
  { name: 'Full Stack Development', icon: Terminal, color: '#FF6B9D', desc: 'Crafting immersive WebGL & React architectures.' },
  { name: 'Content Creation', icon: Video, color: '#FF8C42', desc: 'Storytelling through cinematic digital lenses.' },
  { name: 'Professional Human', icon: Heart, color: '#22C55E', desc: 'Believing in empathy as the ultimate tech stack.' },
];

const interests = [
  { name: 'The Trailblazer', hobby: 'Trekking', icon: Mountain, color: '#22C55E', desc: "Finding serenity in the Himalayas. Every peak is a new perspective on life's challenges." },
  { name: 'The Rider', hobby: 'Biking', icon: Bike, color: '#F5C518', desc: "Chasing horizons on two wheels. There's a unique logic to the road that fuels my creativity." },
  { name: 'The Pitch', hobby: 'Football', icon: Trophy, color: '#FF6B9D', desc: "Resilience, strategy, and teamwork. The lessons I learn on the field are the same ones I apply to the code." },
  { name: 'The Rhythm', hobby: 'Music', icon: Music, color: '#FF8C42', desc: "Architecting sound. Music is the universal language that connects my logical mind to my creative heart." },
];



export function AboutPage() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(isDarkClass);
    if (isDarkClass) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation (Left to Right)
      const marquee = marqueeRef.current;
      if (marquee) {
        const totalWidth = marquee.scrollWidth;
        const singleSetWidth = totalWidth / 3;
        
        marqueeTween.current = gsap.fromTo(marquee, 
          { x: -singleSetWidth },
          {
            x: 0,
            duration: 30, // Medium speed
            ease: "none",
            repeat: -1,
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animations
      gsap.from('.reveal-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        clearProps: "all",
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 92%',
          toggleActions: 'play none none none',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);
  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-700 pt-32 md:pt-40 pb-12 md:pb-24 overflow-hidden flex flex-col items-center ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#1A1A1A]'}`}>
      <div className="max-w-6xl w-full mx-auto px-6 lg:px-8">
        {/* 3+2 Image Collage Grid - Clean, balanced layout */}
        {/* Infinite Image Marquee */}
        <div className="relative w-full mb-32 overflow-hidden py-12">
          {/* Mask for edge fading */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: isDark 
                ? 'linear-gradient(to right, #0A0A0A 0%, transparent 8%, transparent 92%, #0A0A0A 100%)'
                : 'linear-gradient(to right, white 0%, transparent 8%, transparent 92%, white 100%)'
            }}
          />
          
          <div 
            ref={marqueeRef}
            className="flex gap-8 px-4 marquee-container"
            style={{ 
              width: "fit-content",
            }}
          >
            {/* Duplicate images multiple times for infinite effect */}
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-8 flex-shrink-0">
                {[
                  { src: "/images/about/IMG_7912.jpg", alt: "Workspace" },
                  { src: "/images/about/IMG_0489.jpg", alt: "Photography" },
                  { src: "/images/about/IMG_0690.jpg", alt: "Mountain View" },
                  { src: "/images/about/IMG_1176.jpg", alt: "Studio Life" },
                  { src: "/images/about/IMG_5412.jpg", alt: "Sunset Horizon" },
                  { src: "/images/about/IMG_1666.jpg", alt: "Abstract Vision" },
                  { src: "/images/about/IMG_5135.jpeg", alt: "Creative Session" }
                ].map((img, i) => (
                  <motion.div
                    key={`${setIndex}-${i}`}
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={() => {
                      if (marqueeTween.current) {
                        gsap.to(marqueeTween.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
                      }
                    }}
                    onMouseLeave={() => {
                      if (marqueeTween.current) {
                        gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.5, ease: "power2.in" });
                      }
                    }}
                    className={`relative flex-shrink-0 w-[250px] md:w-[320px] aspect-[3/5] rounded-2xl overflow-hidden border shadow-2xl transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Story Section - Tightened for Mobile */}
        <div className="max-w-4xl mb-12 md:mb-32">
          <h1 className={`reveal-text text-5xl md:text-8xl font-serif font-black leading-[0.9] tracking-tighter mb-12 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
            Believer of the <span className="text-gray-500 italic">impossible</span>, architect of the <span className="text-[#F5C518]">experience</span>.
          </h1>
          <div className={`reveal-text text-xl md:text-2xl leading-relaxed font-light mt-8 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            I thrive in the{' '}
            <span 
              onClick={() => {
                const nextTheme = !isDark;
                setIsDark(nextTheme);
                if (nextTheme) {
                  document.documentElement.classList.add('dark');
                  document.body.classList.add('dark-mode');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.body.classList.remove('dark-mode');
                }
                if (!isDark) {
                  const flash = document.createElement('div');
                  flash.className = 'fixed inset-0 bg-white/10 z-[200] pointer-events-none transition-opacity duration-300';
                  document.body.appendChild(flash);
                  setTimeout(() => { flash.style.opacity = '0'; setTimeout(() => flash.remove(), 300); }, 50);
                }
              }}
              className="relative inline-block cursor-pointer group"
            >
              <span className="text-[#F5C518] font-bold decoration-[#FF6B9D] decoration-2 underline-offset-4 hover:underline underline transition-all">dark</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 left-1/4 -translate-x-1/2 text-[#FF6B9D] flex flex-col items-center"
              >
                <ChevronDown className="w-6 h-6" strokeWidth={5.5} />
              </motion.div>
            </span>. Not because of gloom, but because that's where the brightest ideas are forged. I'm Sagar Luitel, and I navigate the intersection of logic and magic. Every project is an opportunity to prove that "impossible" is just a lack of imagination.
          </div>
        </div>

        {/* Skills Grid - Tightened Context for Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-16 md:mb-40 pb-6 md:pb-12">
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-2xl hover:shadow-gray-200'}`}
            >
              <div className="p-2.5 md:p-4 w-fit rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-sm" style={{ backgroundColor: skill.color }}>
                <skill.icon className="w-5 h-5 md:w-8 md:h-8 transition-transform group-hover:scale-110 text-white" />
              </div>
              <h3 className={`text-[13px] md:text-xl font-bold mb-2 md:mb-3 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{skill.name}</h3>
              <p className={`text-[10px] md:text-sm leading-relaxed transition-colors line-clamp-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{skill.desc}</p>
              {/* Background Icon Decoration */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <skill.icon className="w-16 h-16 md:w-24 md:h-24 absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 pointer-events-none" style={{ color: skill.color, opacity: 0.12 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Beyond the Screen - Tightened for Mobile */}
        <div className="mb-16 md:mb-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`reveal-text text-4xl md:text-6xl font-serif font-black mb-6 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#38B2AC] italic">Screen</span>
              </h2>
              <p className={`reveal-text text-lg md:text-xl transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                When I'm not architecting digital experiences, I'm out exploring the worlds that inspire them. Here's a glimpse into the soul behind the machine.
              </p>
            </div>
            <div className={`reveal-text flex items-center gap-4 px-6 py-3 rounded-full border transition-colors ${isDark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
               <Compass className="w-5 h-5 animate-spin-slow" />
               <span className="text-sm font-mono uppercase tracking-widest">Explorer Mindset</span>
            </div>
          </div>

          {/* Hobbies Grid - Balanced 2x2 on Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {interests.map((interest, i) => (
              <motion.div 
                key={interest.hobby}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative p-5 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-2xl hover:shadow-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-4 md:mb-8 gap-3 md:gap-0">
                  <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-sm" style={{ backgroundColor: interest.color }}>
                    <interest.icon className="w-5 h-5 md:w-8 md:h-8 transition-transform group-hover:scale-110 text-white" />
                  </div>
                  <span className={`text-[7px] md:text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 md:px-3 md:py-1 rounded-full border transition-colors ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                    {interest.hobby}
                  </span>
                </div>
                <h3 className={`text-[13px] md:text-2xl font-bold mb-2 md:mb-4 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{interest.name}</h3>
                <p className={`text-[10px] md:text-sm leading-relaxed transition-colors line-clamp-4 md:line-clamp-none ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{interest.desc}</p>
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <interest.icon className="w-16 h-16 md:w-24 md:h-24 absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 pointer-events-none" style={{ color: interest.color, opacity: 0.12 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
