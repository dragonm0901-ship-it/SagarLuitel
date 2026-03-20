import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TechIcon = ({ icon: Icon, color, delay, x, y, mx, my, size = 22, mSize = 18 }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay, ease: "easeOut" },
        scale: { duration: 0.8, delay, type: "spring", stiffness: 120 }
      }}
      whileHover={{ 
        scale: 1.4,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.3 }
      }}
      className="absolute z-[40] cursor-pointer pointer-events-auto group"
      style={{ 
        left: isMobile ? (mx ?? x) : x, 
        top: isMobile ? (my ?? y) : y 
      }}
    >
      <div className={`relative p-1.5 md:p-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-[0_0_25px_var(--shadow-color)] group-hover:border-transparent group-hover:bg-white`}
           style={{ '--shadow-color': color } as any}>
        <Icon className="transition-colors duration-300" style={{ width: isMobile ? mSize : size, height: isMobile ? mSize : size, color }} />
      </div>
    </motion.div>
  );
};

// Custom SVG Icons for Brands
const ReactIcon = (props: any) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" {...props} fill="none">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const ViteIcon = (props: any) => (
  <svg viewBox="0 0 32 32" {...props} fill="none">
    <path d="M18 4l-14 16h10l-2 8 14-16h-10l2-8z" fill="currentColor" />
  </svg>
);

const TailwindIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const FramerIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const FigmaIcon = (props: any) => (
  <svg viewBox="0 0 38 57" {...props} fill="currentColor">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
  </svg>
);

const NodeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M12 2L3.5 7v10l8.5 5 8.5-5V7L12 2zm7 14.2l-7 4.1L5 16.2V7.8l7-4.1 7 4.1v8.4z" />
    <path d="M12 6.5l-4 2.3v4.4l4 2.3 4-2.3V8.8l-4-2.3z" />
  </svg>
);

const JsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M3 3h18v18H3V3zm13.3 15.5c1.1 0 2.1-.5 2.1-1.8 0-1-.6-1.5-1.7-1.9l-1.1-.5c-.5-.2-.7-.4-.7-.7 0-.3.3-.5.7-.5.5 0 .8.2 1 .5l1.1-.7c-.3-.6-.9-1-1.8-1-1.1 0-2 .6-2 1.7 0 1 .6 1.5 1.7 1.9l1.1.5c.5.2.7.4.7.7 0 .4-.4.6-.9.6-.6 0-1-.3-1.2-.8l-1.2.7c.4.9 1 .1.3 2.1 1.1 2.1 1.8zM12.2 13.5v5H13.6v-5h-1.4z" />
  </svg>
);

const HtmlIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);

const CssIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" opacity="0.1" />
    <path d="M12 4.4l-7.23-.01.2 2.3h9.84l-.33 3.42h-6.72l.2 2.3h6.3l-.33 3.42-2.91.81-2.96-.81-.2-2.3H5.5l.33 4.17L12 19.35l5.38-1.44.82-8.59.33-3.04.14-1.88z" />
  </svg>
);

const GsapIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const SmoothLenisIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" />
    <path d="M12 4v16M4 12h16" opacity="0.2" />
    <path d="M7 12c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5z" />
  </svg>
);

const CreativeDeveloperBadge = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const codeSnippet = `console.log("Hello World");\nconsole.log("I am Sagar");`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered) {
      let i = 0;
      setDisplayText(""); // Reset to start typing
      const interval = setInterval(() => {
        setDisplayText(codeSnippet.slice(0, i));
        i++;
        if (i > codeSnippet.length) {
          clearInterval(interval);
          // Auto-disappear on mobile after 1 seconds
          if (isMobile) {
            const timeout = setTimeout(() => {
              setIsHovered(false);
            }, 1000);
            return () => clearTimeout(timeout);
          }
        }
      }, 25);
      return () => clearInterval(interval);
    } else {
      setDisplayText("");
    }
  }, [isHovered, isMobile]);

  return (
    <div className="relative mb-3 flex flex-col items-center group"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={() => setIsHovered(!isHovered)}
    >
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 0.6 : 0.8, x: "-50%", y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: isMobile ? 0.8 : 1, 
              x: "-50%", 
              y: isMobile ? -130 : -95 
            }}
            exit={{ opacity: 0, scale: isMobile ? 0.6 : 0.8, x: "-50%", y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute left-1/2 w-[220px] sm:w-[260px] bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 shadow-2xl z-[60] backdrop-blur-xl"
            style={{ originY: 1 }}
          >
            {/* Header / Traffic Lights */}
            <div className="flex gap-1.5 mb-2 px-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/80" />
              <div className="ml-auto text-[6px] font-mono text-gray-500 tracking-tighter uppercase opacity-50">sh — 80x24</div>
            </div>

            {/* Typing Code Area */}
            <div className="max-h-[60px] overflow-hidden">
              <pre className="text-[10px] font-mono leading-relaxed tracking-tight break-all whitespace-pre-wrap">
                {displayText.split("\n").map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600 select-none text-right pr-1 border-r border-white/5">{idx + 1}</span>
                    <span className="text-gray-300">
                      {line.startsWith('console') ? (
                        <>
                          <span className="text-[#BD93F9]">console</span>
                          <span className="text-gray-400">.</span>
                          <span className="text-[#50FA7B]">log</span>
                          <span className="text-gray-400">(</span>
                          <span className="text-[#F1FA8C]">{line.includes('"') ? line.split('"')[1] ? `"${line.split('"')[1]}"` : '"' : ''}</span>
                          <span className="text-gray-400">)</span>
                          <span className="text-gray-400">;</span>
                        </>
                      ) : line}
                    </span>
                  </div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-1 h-3 ml-0.5 bg-white/50 align-middle"
                />
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:bg-gray-900 cursor-pointer active:scale-95 group-hover:scale-110">
        <Code className="w-3.5 h-3.5 text-[#FF6B9D]" />
        Creative Developer
      </span>
    </div>
  );
};

export function HeroSection({ isIntroDone }: { isIntroDone: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);
  const textFgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isIntroDone) return;

    const ctx = gsap.context(() => {
      // Basic entrance
      const tl = gsap.timeline();
      tl.fromTo(textBgRef.current, { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out' })
        .fromTo(textFgRef.current, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }, '<')
        .fromTo(imageRef.current, { y: 150, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }, '-=1.2')
        .fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8');

      // Senior-Level Parallax effect on scroll
      // Using `scrub: 1.2` gives it a premium, buttery-smooth follow-lag
      // Depth layering: Bg (-80) -> Image (-150) -> Fg (-220)
      gsap.fromTo(textBgRef.current, { y: 0 }, {
        y: 80, // Opposite direction from image
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });
      gsap.fromTo(imageRef.current, { y: 0 }, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });
      gsap.fromTo(textFgRef.current, { y: 0 }, {
        y: 120, // Opposite direction from image (moves even faster down)
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, [isIntroDone]);

  return (
    <section ref={sectionRef} className="relative pt-[72px] min-h-[100svh] bg-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5C518]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B9D]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 z-[50] pointer-events-none">
        {/* All icons stacked below image/text on mobile (y > 60%) */}
        {/* Clustered Left Side */}
        <TechIcon icon={ReactIcon} color="#61DAFB" x="32%" y="25%" mx="20%" my="60%" delay={0.2} />
        <TechIcon icon={TailwindIcon} color="#38B2AC" x="28%" y="45%" mx="35%" my="62%" delay={0.4} />
        <TechIcon icon={FramerIcon} color="#1A1A1A" x="34%" y="65%" mx="50%" my="64%" delay={0.6} />
        <TechIcon icon={NodeIcon} color="#339933" x="26%" y="82%" mx="65%" my="62%" delay={0.8} />
        <TechIcon icon={HtmlIcon} color="#E34F26" x="36%" y="78%" mx="80%" my="60%" delay={1.0} />

        {/* Clustered Right Side */}
        <TechIcon icon={ViteIcon} color="#F5C518" x="68%" y="22%" mx="25%" my="68%" delay={0.3} />
        <TechIcon icon={FigmaIcon} color="#FF6B9D" x="72%" y="42%" mx="40%" my="70%" delay={0.5} />
        <TechIcon icon={JsIcon} color="#F7DF1E" x="66%" y="60%" mx="55%" my="68%" delay={0.7} />
        <TechIcon icon={GsapIcon} color="#88CE02" x="74%" y="76%" mx="70%" my="70%" delay={0.9} />
        <TechIcon icon={CssIcon} color="#1572B6" x="64%" y="85%" mx="30%" my="75%" delay={1.1} />
        
        {/* Extra Icons close to center bottom/top */}
        <TechIcon icon={SmoothLenisIcon} color="#4A90E2" x="42%" y="15%" mx="48%" my="78%" delay={1.3} />
        <TechIcon icon={Layers} color="#1A1A1A" x="58%" y="18%" mx="65%" my="75%" delay={1.7} />
      </div>

      {/* Background Text Layer (Behind Image) */}
      <div 
        className="absolute inset-0 pb-24 md:pb-8 flex flex-col justify-center items-center z-0 pointer-events-none select-none"
      >
        <div ref={textBgRef} className="flex flex-col justify-center items-center w-full">
          <h1 className="text-[13vw] md:text-[9vw] leading-[0.85] font-serif font-black text-[#1A1A1A] whitespace-nowrap tracking-tighter mix-blend-multiply">
            FRONT END
          </h1>
          <h1 className="text-[11vw] md:text-[7.5vw] leading-[0.85] font-serif font-black text-[#1A1A1A] whitespace-nowrap tracking-tighter mix-blend-multiply">
            MAGICIAN
          </h1>
        </div>
      </div>

      {/* Hero Image Layer */}
      <div 
        className="absolute inset-0 pb-24 md:pb-8 pointer-events-none flex justify-center items-center z-10"
      >
        <div ref={imageRef} className="w-[85vw] sm:w-[50vw] md:w-[42vw] lg:w-[32vw] max-w-[450px] relative p-1.5 bg-white/10 backdrop-blur-md rounded-[12px] border border-white/20 shadow-2xl overflow-hidden group/frame pointer-events-auto h-auto">
          {/* Soft Glow Background */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#F5C518] to-[#FF6B9D] opacity-30 blur-2xl group-hover/frame:opacity-50 transition-opacity duration-700" />
          
          <img
            src="/images/hero-portrait.png"
            alt="Sagar Luitel"
            className="relative z-10 w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-700 brightness-95 rounded-[10px]"
          />
        </div>
      </div>

      {/* Foreground Text Layer (In front of Image, with Stroke) */}
      <div 
        className="absolute inset-0 pb-24 md:pb-8 flex flex-col justify-center items-center z-20 pointer-events-none select-none"
      >
        <div ref={textFgRef} className="flex flex-col justify-center items-center w-full">
          <h1 
            className="text-[13vw] md:text-[9vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
          >
            FRONT END
          </h1>
          <h1 
            className="text-[11vw] md:text-[7.5vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
          >
            MAGICIAN
          </h1>
        </div>
      </div>

      {/* Bottom Content Layer */}
      <div ref={contentRef} className="absolute bottom-8 left-0 right-0 z-[70] px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center text-center">
            <CreativeDeveloperBadge />
            <p className="text-gray-600 font-medium text-[11px] md:text-xs max-w-[240px] md:max-w-xs bg-white/40 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-sm leading-relaxed">
              Crafting immersive digital experiences that blur the line between code and art using cutting-edge React & GSAP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
