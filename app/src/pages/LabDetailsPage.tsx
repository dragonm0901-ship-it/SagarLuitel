import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Info, Cpu, Activity, MousePointer2, Layers, Rocket, ArrowRight,
  Compass, Zap, Magnet, Infinity as InfinityIcon, Variable, Type as TypeIcon, Move, Waves
} from 'lucide-react';
import { experiments } from '@/data/experiments';
import type { Experiment } from '@/data/experiments';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const ExperimentIcon = ({ name, className = "w-4 h-4" }: { name: string, className?: string }) => {
  const iconMap: Record<string, React.ElementType> = {
    Compass, Zap, Magnet, Infinity: InfinityIcon, Layers, Variable, Type: TypeIcon, Move, Waves,
    Rocket, Cpu, Activity, MousePointer2
  };
  const Icon = iconMap[name] || Layers;
  return <Icon className={className} />;
};

gsap.registerPlugin(ScrollTrigger);

// --- Specialized Demos ---

const GsapScrollDemo = ({ progress = 0 }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const cards = [
    { title: "Dynamic Architecture", icon: Layers, color: "#F5C518" },
    { title: "Liquid Motion", icon: Activity, color: "#FF6B9D" },
    { title: "Quantum Physics", icon: Cpu, color: "#22C55E" },
    { title: "Orchestrated GSAP", icon: Rocket, color: "#3B82F6" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".scroll-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
      });
    }, innerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!innerRef.current) return;
    const scrollWidth = innerRef.current.offsetWidth;
    const windowWidth = innerRef.current.parentElement?.offsetWidth || 0;
    const maxScroll = -(scrollWidth - windowWidth);
    
    gsap.to(innerRef.current, {
      x: maxScroll * progress,
      duration: 0.1,
      ease: "power2.out"
    });
  }, [progress]);

  return (
    <div className="h-full w-full bg-black flex items-center overflow-hidden">
      <div ref={innerRef} className="flex gap-4 md:gap-12 px-6 md:px-20 items-center">
        <div className="flex flex-col gap-1 md:gap-4 min-w-[180px] md:min-w-[400px]">
          <h2 className="text-xl md:text-8xl font-serif font-black text-white leading-none tracking-tighter transition-transform duration-500">
            SCROLL <br/> <span className="text-[#F5C518]">TECH</span>.
          </h2>
          <p className="text-gray-500 font-mono text-[7px] md:text-xs uppercase tracking-widest leading-relaxed">
             Sequential Orchestration. <br/> Senior Grade UI.
          </p>
        </div>

        {cards.map((card, i) => (
          <div 
            key={i} 
            className="scroll-card min-w-[200px] md:min-w-[350px] aspect-[4/5] bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between group hover:border-[#F5C518]/30 transition-all duration-500"
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500"
              style={{ backgroundColor: card.color + '22', color: card.color }}
            >
              <card.icon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 block font-bold">Experiment 0{i+1}</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#F5C518] transition-colors">{card.title}</h3>
            </div>
          </div>
        ))}
        <div className="min-w-[50px] h-1" />
      </div>
    </div>
  );
};

const MagneticMenuDemo = () => {
   const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.6;
      const y = (clientY - (top + height / 2)) * 0.6;
      setBtnPos({ x, y });
   };
   return (
      <div className="h-full w-full flex items-center justify-center bg-[#0A0A0A] p-20">
         <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setBtnPos({ x: 0, y: 0 })}
            animate={{ x: btnPos.x, y: btnPos.y }}
            transition={{ type: "spring", stiffness: 800, damping: 20, mass: 0.1 }}
            className="group relative px-12 py-6 md:px-16 md:py-8 bg-white rounded-full text-black font-bold text-xl md:text-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
         >
            <span className="relative z-10 flex items-center gap-3">
               <MousePointer2 className="w-6 h-6" />
               Magnetic Force
            </span>
            <div className="absolute inset-0 bg-[#F5C518] scale-0 group-hover:scale-110 transition-transform duration-500 rounded-full" />
         </motion.button>
      </div>
   );
};

const LenisDynamics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const velRef = useRef(0);
  const targetVelRef = useRef(0);
  const [displayVel, setDisplayVel] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
       wrapper: containerRef.current || undefined,
       content: scrollRef.current || undefined,
       lerp: isMobile ? 0.08 : 0.04, // Slightly faster for mobile
       duration: isMobile ? 1.2 : 2.0,
       smoothWheel: true,
       wheelMultiplier: 1.1,
    });

    const animators = textRefs.current.map(el => {
       if (!el) return null;
       return {
          skew: gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power2.out" }),
          scale: gsap.quickTo(el, "scaleY", { duration: 0.6, ease: "power2.out" })
       };
    });

    lenis.on('scroll', ({ velocity: v }: { velocity: number }) => {
       targetVelRef.current = Math.abs(v);
    });

    const update = () => {
       velRef.current = gsap.utils.interpolate(velRef.current, targetVelRef.current, 0.08);
       if (Math.random() > 0.92) setDisplayVel(velRef.current);

       animators.forEach((anim, i) => {
          if (!anim) return;
          const intensity = velRef.current * 0.35;
          const parallax = Math.sin(Date.now() * 0.0008 + i) * 15;
          
          anim.skew(intensity * 1.5);
          anim.scale(1 + intensity * 0.08);
          
          if (textRefs.current[i]) {
            const blurVal = Math.min(8, intensity * 2.5);
            textRefs.current[i]!.style.transform = `translateY(${parallax}px)`;
            textRefs.current[i]!.style.opacity = `${Math.max(0.2, 1 - intensity * 0.1)}`;
            textRefs.current[i]!.style.filter = blurVal > 0.5 ? `blur(${blurVal}px)` : 'none';
          }
       });

       targetVelRef.current *= 0.94;
    };

    gsap.ticker.add(update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
       lenis.destroy();
       gsap.ticker.remove(update);
    };
  }, []);

  return (
     <div ref={containerRef} className="h-full w-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
        {/* HUD Monitor - Fixed Viewport Overlay */}
        <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 mix-blend-difference pointer-events-none">
           <div className="flex flex-col gap-1">
              <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.5em] font-black">Velocity Vector</span>
              <div className="flex items-end gap-2">
                 <span className="text-3xl md:text-5xl font-serif italic font-black text-white">{displayVel.toPrecision(3)}</span>
                 <span className="text-[9px] md:text-[10px] font-mono text-[#F5C518] pb-1 uppercase font-black tracking-widest">px-inertia</span>
              </div>
              <div className="w-32 md:w-48 h-[2px] bg-white/10 mt-2 relative overflow-hidden">
                 <motion.div 
                    className="absolute inset-y-0 left-0 bg-[#F5C518] shadow-[0_0_20px_#F5C518]"
                    animate={{ width: `${Math.min(100, displayVel * 4)}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 25 }}
                 />
              </div>
           </div>
        </div>

        <div ref={scrollRef} className="w-full flex flex-col items-center py-[50vh] gap-12 md:gap-32">
           {[...Array(15)].map((_, i) => (
              <div 
                 key={i}
                 ref={el => { textRefs.current[i] = el; }}
                 className="text-[10vw] md:text-[12vw] font-serif font-black bg-clip-text text-transparent bg-gradient-to-b from-white/[0.18] to-white/[0.04] whitespace-nowrap select-none will-change-transform"
              >
                 DYNAMIC INERTIA {i + 1}
              </div>
           ))}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute bottom-12 right-12 text-right opacity-20">
           <p className="text-white font-mono text-[9px] uppercase tracking-[0.4em] font-black leading-relaxed">
              Proprietary GPU Buffer Loop <br/> Normalized Scalar Velocity
           </p>
        </div>
     </div>
  );
}

const SyncMarquee = ({ progress = 0 }) => {
   const [speed, setSpeed] = useState(1);
   useEffect(() => {
      setSpeed(1 + (progress > 0 && progress < 1 ? 5 : 0));
   }, [progress]);

   const renderLine = (text: string, direction: 1 | -1) => (
      <div className="flex whitespace-nowrap overflow-hidden py-12 border-y border-white/5 hover:bg-white/5 transition-colors group">
         <motion.div 
            animate={{ x: direction === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 20 / speed, repeat: Infinity, ease: "linear" }}
            className="flex pr-0 items-center w-fit"
         >
            {[...Array(12)].map((_, i) => (
               <div key={i} className="flex items-center px-4 md:px-12">
                  <span className="text-2xl md:text-[8rem] font-serif font-black text-white group-hover:text-[#F5C518] transition-colors uppercase tracking-tighter">{text}</span>
               </div>
            ))}
         </motion.div>
      </div>
   );

   return (
      <div className="h-full w-full bg-[#050505] flex flex-col justify-center gap-0 lg:gap-8 overflow-hidden pt-12">
         {renderLine("SYNCHRONIZED", -1)}
         {renderLine("CONTINUOUS", 1)}
         {renderLine("ORCHESTRATION", -1)}
         <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black z-10" />
      </div>
   );
};

const GlassHoverEngine = () => {
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const containerRef = useRef<HTMLDivElement>(null);
   const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
   };

   return (
      <div ref={containerRef} onMouseMove={handleMouseMove} className="h-full w-full bg-[#0A0A0A] grid grid-cols-2 md:grid-cols-3 p-8 md:p-16 gap-4">
         {[...Array(9)].map((_, i) => (
            <div key={i} className="relative rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden group">
               <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(200px circle at ${mousePos.x - (i % 3) * 300}px ${mousePos.y - Math.floor(i / 3) * 300}px, rgba(245, 197, 24, 0.15), transparent 80%)` }}
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-white">
                     {i + 1}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

const SvgMorphLab = () => {
   const [mode, setMode] = useState<"AQUATIC" | "CRYSTALLINE" | "VOLATILE">("AQUATIC");
   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
   const containerRef = useRef<HTMLDivElement>(null);

   const paths = {
      AQUATIC: "M50,20 C70,20 85,35 85,55 C85,75 70,90 50,90 C30,90 15,75 15,55 C15,35 30,20 50,20 Z",
      CRYSTALLINE: "M50,5 L65,35 L95,50 L65,65 L50,95 L35,65 L5,50 L35,35 Z",
      VOLATILE: "M50,15 C80,10 95,40 85,60 C75,80 60,95 40,85 C20,75 5,50 15,30 C25,10 40,20 50,15 Z"
   };

   const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Map mouse to -10 to 110 for better padding coverage
      const x = ((e.clientX - rect.left) / rect.width) * 120 - 10;
      const y = ((e.clientY - rect.top) / rect.height) * 120 - 10;
      setMousePos({ x, y });
   };

   return (
      <div 
         ref={containerRef}
         onMouseMove={handleMouseMove}
         className="h-full w-full bg-[#050505] flex flex-col items-center justify-center p-8 relative overflow-hidden"
      >
         <svg className="absolute w-0 h-0">
            <defs>
               <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -12" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
               </filter>
            </defs>
         </svg>

         <div className="relative w-full aspect-square md:w-[600px] flex items-center justify-center">
            {/* Expanded viewBox to -20 to 120 for blur/movement padding */}
            <svg viewBox="-20 -20 140 140" className="w-full h-full filter saturate-150 active:scale-105 transition-transform duration-500 overflow-visible">
               <g filter="url(#gooey)">
                  <motion.circle 
                     animate={{ cx: mousePos.x, cy: mousePos.y }}
                     transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
                     r="10" fill="#F5C518" 
                  />
                  <motion.path 
                     animate={{ d: paths[mode] }}
                     transition={{ type: "spring", stiffness: 100, damping: 10 }}
                     fill="#F5C518" 
                  />
                  <motion.path 
                     animate={{ d: paths[mode], scale: 0.85, x: 2, y: -2 }}
                     transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.05 }}
                     fill="rgba(255, 255, 255, 0.2)" 
                  />
               </g>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference opacity-40">
               <motion.span 
                  key={mode} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl md:text-5xl font-serif font-black text-white italic tracking-tighter"
               >
                  {mode}
               </motion.span>
               <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em] font-black">Interactive Liquid Engine</span>
            </div>
         </div>

         {/* Navigation Suite */}
         <div className="z-20 mt-12 flex gap-4 p-2 bg-white/5 rounded-2xl backdrop-blur-3xl border border-white/10 shadow-2xl">
            {(["AQUATIC", "CRYSTALLINE", "VOLATILE"] as const).map(m => (
               <button 
                  key={m} onClick={() => setMode(m)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-mono uppercase tracking-[0.3em] font-black transition-all ${
                     mode === m ? 'bg-[#F5C518] text-black shadow-[0_0_20px_rgba(245,197,24,0.4)]' : 'text-white/40 hover:text-white'
                  }`}
               >
                  {m}
               </button>
            ))}
         </div>

         <div className="absolute bottom-12 right-12 text-right opacity-20 pointer-events-none">
            <p className="text-white font-mono text-[9px] uppercase tracking-[0.4em] font-black leading-relaxed">
               Atomic Gooey Simulation <br/> Gaussian Path Fusion Loop
            </p>
         </div>
      </div>
   );
};

const StaggerRevealEngine = () => {
   const [key, setKey] = useState(0);
   const text = "Architecting clean, resilient, and performant solutions for the modern web.";
   return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center p-12 md:p-24 overflow-hidden text-center">
         <div key={key} className="max-w-4xl flex flex-wrap justify-center gap-x-4 gap-y-4">
            {text.split(" ").map((word, i) => (
               <motion.span 
                  key={i} initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-7xl font-serif font-black text-white hover:text-[#F5C518] transition-colors cursor-default"
               >
                  {word}
               </motion.span>
            ))}
         </div>
         <button 
            onClick={() => setKey(prev => prev + 1)}
            className="mt-16 text-[10px] font-mono uppercase tracking-[0.5em] text-gray-500 hover:text-[#F5C518] transition-colors font-black border-b border-gray-800 pb-2 active:scale-95"
         >
            Replay Choreography
         </button>
      </div>
   );
};

const DraggablePhysicsLab = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const items = [
      { id: 1, color: "#F5C518", label: "Logic" },
      { id: 2, color: "#FF6B9D", label: "Magic" },
      { id: 3, color: "#22C55E", label: "Data" },
      { id: 4, color: "#3B82F6", label: "Motion" },
   ];
   return (
      <div ref={containerRef} className="h-full w-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         <div className="text-center z-0 pointer-events-none">
            <h2 className="text-[15vw] font-serif font-black text-white/5 leading-none">SANDBOX</h2>
         </div>
         {items.map((item) => (
            <motion.div 
               key={item.id} drag dragConstraints={containerRef} dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }} whileDrag={{ scale: 1.1, cursor: "grabbing" }}
               className="absolute w-24 h-24 md:w-48 md:h-48 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 md:gap-4 cursor-grab backdrop-blur-xl shadow-2xl transition-colors hover:border-white/20"
               style={{ left: `${15 + item.id * 15}%`, top: `${20 + (item.id % 2) * 20}%` }}
            >
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: item.color + '22', color: item.color }}>
                  <Layers className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-mono uppercase tracking-widest text-white font-black">{item.label}</span>
            </motion.div>
         ))}
         <div className="absolute bottom-12 left-12">
            <span className="text-[10px] font-mono text-white uppercase tracking-widest font-black">Inertia Physics // Collision Disabled</span>
         </div>
      </div>
   );
};

const CanvasLiquidDistortion = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let width = canvas.width = canvas.offsetWidth;
      let height = canvas.height = canvas.offsetHeight;
      let mouse = { x: width / 2, y: height / 2 };
      let particles: {x: number, y: number, ox: number, oy: number}[] = [];
      const spacing = 30;
      for(let y = 0; y < height; y += spacing) {
         for(let x = 0; x < width; x += spacing) {
            particles.push({ x, y, ox: x, oy: y });
         }
      }
      const onMouseMove = (e: MouseEvent) => {
         const rect = canvas.getBoundingClientRect();
         mouse.x = e.clientX - rect.left;
         mouse.y = e.clientY - rect.top;
      };
      window.addEventListener('mousemove', onMouseMove);
      let animationId: number;
      const render = () => {
         ctx.clearRect(0, 0, width, height);
         ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
         ctx.lineWidth = 1;
         particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, (200 - dist) / 200);
            p.x += (p.ox - p.x) * 0.1 - (dx / dist) * force * 50;
            p.y += (p.oy - p.y) * 0.1 - (dy / dist) * force * 50;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = force > 0.15 ? '#F5C518' : 'rgba(255, 255, 255, 0.35)';
            ctx.fill();
         });
         animationId = requestAnimationFrame(render);
      };
      render();
      return () => {
         window.removeEventListener('mousemove', onMouseMove);
         cancelAnimationFrame(animationId);
      };
   }, []);

   return (
      <div className="h-full w-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
         <canvas ref={canvasRef} className="w-full h-full" />
         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <h2 className="text-4xl md:text-8xl font-serif font-black text-white/50 leading-none">PIXEL<br/>FORCE</h2>
            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white font-black italic">Pure 2D Canvas Displacement</p>
         </div>
      </div>
   );
};

const DefaultPlaceholder = ({ title }: { title: string }) => (
   <div className="h-full w-full flex flex-col items-center justify-center bg-[#0A0A0A] text-white p-12 text-center">
      <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-[#F5C518] animate-spin mb-8" />
      <h2 className="text-2xl md:text-3xl font-serif mb-2">{title}</h2>
      <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest italic opacity-50">Demo In Development</p>
   </div>
);

// --- Detail Page ---

export function LabDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const found = experiments.find(e => e.id === id);
    if (found) {
      setExperiment(found);
    } else {
      navigate('/lab');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!experiment) return;

    const ctx = gsap.context(() => {
      // MASTER PINNING TIMELINE - Now active on all devices
      ScrollTrigger.create({
        trigger: "#master-pin-section",
        start: "top top",
        end: "+=1500", // Slightly shorter end for better mobile flow
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, [experiment]);

  if (!experiment) return null;

  const renderDemo = () => {
     switch(experiment.id) {
        case 'gsap-scroll-master': return <GsapScrollDemo progress={scrollProgress} />;
        case 'magnetic-popups': return <MagneticMenuDemo />;
        case 'lenis-smooth-scroll': return <LenisDynamics />;
        case 'infinite-marquee': return <SyncMarquee progress={scrollProgress} />;
        case 'glassmorphism-engine': return <GlassHoverEngine />;
        case 'svg-morph-interaction': return <SvgMorphLab />;
        case 'staggered-reveal': return <StaggerRevealEngine />;
        case 'draggable-lab': return <DraggablePhysicsLab />;
        case 'webgl-distortion': return <CanvasLiquidDistortion />;
        default: return <DefaultPlaceholder title={experiment.title} />;
     }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-white dark:bg-[#0A0A0A] relative"
    >
      {/* Back Button - Desktop Only */}
      <div className="hidden lg:block fixed top-24 left-12 z-[999] pointer-events-auto">
         <button 
            onClick={(e) => { e.stopPropagation(); navigate('/lab'); }}
            className="flex items-center justify-center bg-[#F5C518] text-black px-6 py-3 rounded-full hover:text-white transition-all group shadow-2xl active:scale-95"
         >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.2em] font-black">Back to Hub</span>
         </button>
      </div>

      {/* --- HERO SECTION: Pinned Split View --- */}
      <section id="master-pin-section" className="relative h-auto lg:h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-[#0A0A0A]">
         {/* Left: Experiment View */}
         <div className="w-full lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-full bg-black relative isolate border-b lg:border-r border-white/10 overflow-hidden">
            {renderDemo()}
         </div>

         {/* Right: Static Documentation Header */}
         <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-6 py-16 md:px-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-700">
            <div className="max-w-xl">
               {/* Mobile Back Button - Precisely aligned above icon */}
               <div className="lg:hidden mb-10">
                  <button 
                    onClick={() => navigate('/lab')}
                    className="flex items-center justify-center bg-[#F5C518] text-black w-7 h-7 rounded-full shadow-lg active:scale-90 transition-transform"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
               </div>

               <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="p-2 rounded-xl md:p-2.5 bg-[#F5C518] text-black shadow-lg">
                     <ExperimentIcon name={experiment.icon} />
                  </div>
                  <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">{experiment.category}</span>
                  <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2" />
                  <div className="flex gap-2 items-center">
                     <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 opacity-60 animate-pulse" />
                     <span className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest animate-pulse font-bold">Live Module</span>
                  </div>
               </div>
               
               <h1 className="text-4xl md:text-8xl font-serif font-black text-[#1A1A1A] dark:text-white leading-[1.1] md:leading-[0.85] tracking-tighter mb-8">
                  {experiment.title}
               </h1>
               <p className="text-lg md:text-2xl text-gray-400 dark:text-gray-500 leading-relaxed italic border-l-4 border-[#F5C518]/30 pl-6">
                  "{experiment.description}"
               </p>
               
               {/* Scroll to Explore Indicator */}
               <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-12 md:mt-16 flex items-center gap-3 opacity-30"
               >
                  <div className="w-px h-10 md:h-12 bg-gray-400 dark:bg-white/20" />
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em]">Scroll to Orchestrate</span>
               </motion.div>
            </div>
         </div>
      </section>

      {/* --- CONTENT SECTION: The "Curtain" Documentation --- */}
      <section className="relative z-[20] bg-[#FAFAFA] dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-white/5 transition-colors duration-700 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
         <div className="max-w-7xl mx-auto px-8 py-24 md:px-24 md:py-32 grid lg:grid-cols-12 gap-20">
            {/* Detailed Explanation */}
            <div className="lg:col-span-12">
               <div className="inline-block px-4 py-1 rounded-full bg-black text-white dark:bg-white/10 text-[10px] font-mono uppercase tracking-widest mb-10">
                  Experiment Documentation
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16">
               <div className="prose prose-2xl dark:prose-invert max-w-none">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold dark:text-white mb-10 inline-flex items-center gap-4">
                     <Info className="w-10 h-10 text-[#F5C518]" />
                     Technical Briefing
                  </h3>
                  <div className="h-px w-20 bg-[#F5C518] mb-10" />
                  <p className="text-gray-600 dark:text-gray-400 leading-[1.6] text-xl md:text-2xl">
                     {experiment.explanation}
                  </p>
               </div>
            </div>

            {/* Sidebar Metrics */}
            <div className="lg:col-span-4 space-y-10">
               <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl transition-all hover:scale-[1.02]">
                  <h4 className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-8 font-black">
                     <Cpu className="w-4 h-4 text-[#F5C518]" />
                     Engineering Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                     {experiment.tech.map(t => (
                        <span key={t} className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/10 text-gray-700 dark:text-white text-[11px] font-mono uppercase font-black transition-colors">
                           {t}
                        </span>
                     ))}
                  </div>
               </div>

               <div className="p-10 rounded-[3rem] bg-black text-white shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all hover:scale-[1.02]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F5C518] to-transparent opacity-10 rounded-full blur-3xl" />
                  <h4 className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-8 font-black">
                     <Rocket className="w-4 h-4 text-[#F5C518]" />
                     Vitals & Analytics
                  </h4>
                  <ul className="space-y-5">
                     {['60 FPS Sustained', 'Zero Layout Thrashing', 'GPU Bound Rendering'].map(metric => (
                        <li key={metric} className="flex items-center gap-3 text-xs text-gray-300 font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shadow-[0_0_10px_#F5C518]" />
                           {metric}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Footer Section (Inside sequential flow) */}
            <div className="lg:col-span-12 pt-32 pb-12 border-t border-gray-100 dark:border-white/5">
               <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="max-w-md text-center md:text-left">
                     <h3 className="text-black dark:text-white text-3xl font-serif font-black mb-4">Laboratory Insights</h3>
                     <p className="text-black/60 dark:text-gray-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                        Proprietary Creative Solutions for high-end digital platforms. 
                        Exclusively developed for the Dragonm0901 Platform.
                     </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <button 
                        onClick={() => {
                           const idx = experiments.findIndex(e => e.id === id);
                           const prevIdx = (idx - 1 + experiments.length) % experiments.length;
                           navigate(`/lab/${experiments[prevIdx].id}`);
                           window.scrollTo(0, 0);
                        }}
                        className="group px-6 py-4 bg-white text-black rounded-full text-[10px] font-mono uppercase font-black tracking-[0.3em] hover:bg-[#F5C518] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3"
                     >
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        PREV
                     </button>

                     <button 
                        onClick={() => {
                           const idx = experiments.findIndex(e => e.id === id);
                           const nextIdx = (idx + 1) % experiments.length;
                           navigate(`/lab/${experiments[nextIdx].id}`);
                           window.scrollTo(0, 0);
                        }}
                        className="group px-6 py-4 bg-white text-black rounded-full text-[10px] font-mono uppercase font-black tracking-[0.3em] hover:bg-[#F5C518] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3"
                     >
                        NEXT
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </motion.div>
  );
}
