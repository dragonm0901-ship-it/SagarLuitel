import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import gsap from 'gsap';

// --- Experiment 1: GSAP Stagger Wave ---
const GsapWave = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.stagger-box', {
        scale: 0.1,
        y: 60,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: {
          amount: 1.5,
          grid: [10, 10],
          from: "center"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl flex items-center justify-center p-4">
      <div ref={containerRef} className="grid grid-cols-10 gap-1 md:gap-2">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="stagger-box w-2 h-2 md:w-4 md:h-4 bg-[#FF6B9D] rounded-full" />
        ))}
      </div>
      <div className="absolute top-4 left-4">
        <span className="bg-black/50 text-white font-mono text-[10px] uppercase px-2 py-1 rounded border border-white/10 backdrop-blur-md">GSAP Grid.Stagger</span>
      </div>
    </div>
  );
};

// --- Experiment 2: Framer Motion Magnetic Repeller ---
const MagneticDot = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }, []);

  const distanceX = useTransform(mouseX, (val: number) => val - position.x);
  const distanceY = useTransform(mouseY, (val: number) => val - position.y);

  const x = useTransform(distanceX, [-100, 0, 100], [50, 0, -50]);
  const y = useTransform(distanceY, [-100, 0, 100], [50, 0, -50]);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  const scale = useTransform(distanceX, [-100, 0, 100], [0.5, 1.5, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, scale }}
      className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-4 md:h-4 rounded-full bg-[#F5C518]"
    />
  );
};

const MagneticField = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="relative w-full aspect-square md:aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl flex items-center justify-center p-2 sm:p-4 md:p-8 cursor-crosshair"
    >
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-4">
        {Array.from({ length: 144 }).map((_, i) => (
          <MagneticDot key={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="bg-black/50 text-white font-mono text-[10px] uppercase px-2 py-1 rounded border border-white/10 backdrop-blur-md">Framer Motion Repeller</span>
      </div>
    </div>
  );
};

// --- Experiment 3: Canvas Particles ---
const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    const particles: {x: number, y: number, vx: number, vy: number}[] = [];

    for(let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0 || p.x > width) p.vx *= -1;
        if(p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#22C55E';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for(let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if(dist < 100) {
            ctx.strokeStyle = `rgba(34, 197, 94, ${1 - dist/100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="bg-black/50 text-white font-mono text-[10px] uppercase px-2 py-1 rounded border border-white/10 backdrop-blur-md">Canvas API Network</span>
      </div>
    </div>
  );
};

export function LabPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-black text-[#1A1A1A] leading-[0.9] tracking-tighter mb-4">
            The <span className="text-[#F5C518]">Lab</span>.
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Raw, unpolished experiments. Exploring the bleeding edge of WebGL, DOM physics, and motion choreography.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <GsapWave />
          <MagneticField />
          <div className="lg:col-span-2">
            <CanvasParticles />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
