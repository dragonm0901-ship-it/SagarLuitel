import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Heart, ChevronDown, Mountain, Bike, Music, Trophy, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Digital Marketing', icon: Zap, color: '#F5C518', desc: 'Growth hacking & strategic brand positioning.' },
  { name: 'Full Stack Development', icon: Zap, color: '#FF6B9D', desc: 'Crafting immersive WebGL & React architectures.' },
  { name: 'Content Creation', icon: Zap, color: '#FF8C42', desc: 'Storytelling through cinematic digital lenses.' },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid reveal effect (no staggered vertical parallax to keep alignment)
      const images = gridRef.current?.querySelectorAll('.grid-img');
      images?.forEach((img, i) => {
        gsap.fromTo(img,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });

      // Text reveal animations
      gsap.from('.reveal-text', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);
  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-700 pt-40 pb-24 overflow-hidden flex flex-col items-center ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#1A1A1A]'}`}>
      <div className="max-w-6xl w-full mx-auto px-6 lg:px-8">
        {/* 3+2 Image Collage Grid - Clean, balanced layout */}
        <div ref={gridRef} className="relative mb-24 grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-8 h-auto md:h-[600px]">
          {/* Slot 1: Top Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`grid-img md:col-start-1 md:col-end-3 md:row-start-1 rounded-2xl overflow-hidden shadow-sm border transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
          >
            <img src="/images/about/IMG_7912.jpg" alt="Workspace" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
          </motion.div>
          
          {/* Slot 2: Top Center */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`grid-img md:col-start-3 md:col-end-5 md:row-start-1 rounded-2xl overflow-hidden shadow-sm border transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
          >
            <img src="/images/about/IMG_0489.jpg" alt="Photography" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
          </motion.div>
          
          {/* Slot 3: Top Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`grid-img md:col-start-5 md:col-end-7 md:row-start-1 rounded-2xl overflow-hidden shadow-sm border transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
          >
            <img src="/images/about/IMG_1176.jpg" alt="Studio Life" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
          </motion.div>

          {/* Slot 4: Bottom Left (Centered row) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`grid-img md:col-start-2 md:col-end-4 md:row-start-2 rounded-2xl overflow-hidden shadow-sm border transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
          >
            <img src="/images/about/IMG_1666.jpg" alt="Abstract Vision" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
          </motion.div>

          {/* Slot 5: Bottom Right (Centered row) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`grid-img md:col-start-4 md:col-end-6 md:row-start-2 rounded-2xl overflow-hidden shadow-sm border transition-colors ${isDark ? 'border-white/10' : 'border-gray-100'}`}
          >
            <img src="/images/about/IMG_5135.jpeg" alt="Creative Session" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
          </motion.div>


        </div>

        {/* Story Section */}
        <div className="max-w-4xl mb-32">
          <h1 className={`reveal-text text-5xl md:text-8xl font-serif font-black leading-[0.9] tracking-tighter mb-12 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
            Believer of the <span className="text-gray-500 italic">impossible</span>, architect of the <span className="text-[#F5C518]">experience</span>.
          </h1>
          <p className={`reveal-text text-xl md:text-2xl leading-relaxed font-light mt-8 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            I thrive in the{' '}
            <span 
              onClick={() => {
                setIsDark(!isDark);
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
          </p>
        </div>

        {/* Skills Grid - Moved up */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] border transition-all group ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
            >
              <skill.icon className="w-10 h-10 mb-6 transition-transform group-hover:scale-110" style={{ color: skill.color }} />
              <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{skill.name}</h3>
              <p className={`text-sm leading-relaxed transition-colors ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{skill.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Beyond the Screen - Hobbies Section */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`reveal-text text-4xl md:text-6xl font-serif font-black mb-6 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Beyond the <span className="text-gray-500 italic">Screen</span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, i) => (
              <motion.div 
                key={interest.hobby}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-2xl hover:shadow-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl transition-colors ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                    <interest.icon className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: interest.color }} />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border transition-colors ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                    {interest.hobby}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{interest.name}</h3>
                <p className={`text-sm leading-relaxed transition-colors ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{interest.desc}</p>
                <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? 'text-gray-700' : 'text-gray-200'}`}>
                   <interest.icon className="w-24 h-24 absolute -bottom-4 -right-4 pointer-events-none opacity-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
