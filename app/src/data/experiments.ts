export interface Experiment {
  id: string;
  title: string;
  category: 'GSAP' | 'CSS' | 'Performance' | 'WebGL' | 'Interaction';
  description: string;
  tech: string[];
  explanation: string;
  icon: string; // Lucide icon name
  demoUrl?: string;
}

export const experiments: Experiment[] = [
  {
    id: "gsap-scroll-master",
    title: "ScrollTrigger Masterclass",
    category: "GSAP",
    description: "Multi-layered horizontal scrolling with parallax and staggered element reveals.",
    tech: ["GSAP", "ScrollTrigger", "React"],
    explanation: "This experiment pushes ScrollTrigger to its limits by pinning sections and calculating relative progress across multiple nested timelines to create a cinematic horizontal storytelling experience.",
    icon: "Compass"
  },
  {
    id: "lenis-smooth-scroll",
    title: "Lenis Smooth Dynamics",
    category: "Performance",
    description: "Implementing the smoothest possible scrolling experience using Lenis with inertia and lerp controls.",
    tech: ["Lenis", "GSAP", "RAF"],
    explanation: "A deep dive into Lenis. This showcase features custom inertia weight and lerp factors that make the interface feel weightless while maintaining precision anchor points.",
    icon: "Zap"
  },
  {
    id: "magnetic-popups",
    title: "Magnetic Menu Physics",
    category: "Interaction",
    description: "Organic menu popups that track the cursor with magnetic pull and elastic rebounding.",
    tech: ["GSAP", "Framer Motion", "Physics"],
    explanation: "Bridging the gap between DOM and mouse coordinates. Using GSAP's quickSetter for high-performance position updates and elastic-out easing for that signature organic recoil.",
    icon: "Magnet"
  },
  {
    id: "infinite-marquee",
    title: "Infinite Marquee Sync",
    category: "GSAP",
    description: "Synchronized dual-direction text marquees that react to scroll speed and hover states.",
    tech: ["GSAP", "CSS Hooks", "Intersection Observer"],
    explanation: "Using a continuous linear GSAP timeline and proxying the timeScale based on scroll velocity allows these marquees to speed up or slow down while remaining infinite and perfectly looped.",
    icon: "Infinity"
  },
  {
    id: "glassmorphism-engine",
    title: "Glassmorphism Hover Engine",
    category: "CSS",
    description: "Advanced CSS backdrop-filter effects with dynamic lighting and specular highlight tracking.",
    tech: ["CSS Variables", "Glassmorphism", "JS Hooks"],
    explanation: "Using CSS custom properties to track mouse positions across a grid of cards, generating real-time specular highlights on blurred glass surfaces without heavy WebGL overhead.",
    icon: "Layers"
  },
  {
    id: "svg-morph-interaction",
    title: "SVG Path Morphing",
    category: "GSAP",
    description: "Complex SVG path transformations triggered by user interaction for fluid UI transitions.",
    tech: ["GSAP MorphSVG", "SVG", "Animation"],
    explanation: "Transforming raw path data between different geometric states. This experiment highlights how fluid shapes can guide user attention during interface state changes.",
    icon: "Variable"
  },
  {
    id: "staggered-reveal",
    title: "Staggered Reveal Engine",
    category: "GSAP",
    description: "A framework for complex typographic entrance choreography with individual character control.",
    tech: ["GSAP", "SplitText", "Choreography"],
    explanation: "Managing character-level animations across multiple paragraphs. Uses staggered timing and custom easing curves to reveal content in a way that feels intentional and rhythmic.",
    icon: "Type"
  },
  {
    id: "draggable-lab",
    title: "Draggable Physics Lab",
    category: "Interaction",
    description: "Inertia-based dragging for desktop and mobile with snap-to-grid and collision detection.",
    tech: ["GSAP Draggable", "InertiaPlugin", "Physics"],
    explanation: "A touch-friendly showcase of physics-based dragging. Elements have weight, momentum, and friction, providing a tactile feel to digital interactions.",
    icon: "Move"
  },
  {
    id: "webgl-distortion",
    title: "WebGL Liquid Distortion",
    category: "WebGL",
    description: "Lightweight Three.js fragment shader for liquid-like image and text distortions.",
    tech: ["Three.js", "GLSL", "Shaders"],
    explanation: "A high-end visual experiment using custom vertex and fragment shaders. Calculates UV displacement based on a moving noise texture to simulate the look of looking through moving fluid.",
    icon: "Waves"
  }
];
