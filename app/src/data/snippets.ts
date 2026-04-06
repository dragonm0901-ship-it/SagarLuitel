export interface Snippet {
  id: string;
  title: string;
  date: string;
  language: string;
  shortDesc: string;
  category: 'React' | 'GSAP' | 'WebGL' | 'Architecture' | 'CSS';
  code: string;
  explanation: string;
}

export const snippets: Snippet[] = [
  {
    id: "gsap-react-cleanup",
    title: "GSAP Context Cleanup Pattern",
    date: "Mar 2026",
    language: "typescript",
    shortDesc: "Universal pattern for React 18 strict mode to prevent GSAP memory leaks.",
    category: "Architecture",
    code: `import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useGsapAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // context isolates GSAP selections to this component scope
    const ctx = gsap.context(() => {
      gsap.to('.child', { opacity: 1, stagger: 0.1 });
    }, ref);
    
    // Critical: Revert on unmount to prevent leaks
    return () => ctx.revert();
  }, []);

  return ref;
};`,
    explanation: "In React 18 strict mode, useEffect fires twice in development. Without gsap.context(), you'll trigger duplicate ScrollTriggers and build up memory leaks. Always wrap complex animations in a context and call revert() on unmount."
  },
  {
    id: "framer-flip-navigation",
    title: "Framer Motion FLIP Navigation",
    date: "Mar 2026",
    language: "tsx",
    shortDesc: "Achieving native-feeling page transitions using the FLIP technique.",
    category: "React",
    code: `import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

export const AnimatedRouter = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </AnimatePresence>
  );
};`,
    explanation: "Leverage layoutId alongside a properly keyed AnimatePresence to allow elements to seamlessly glide from thumbnails into hero containers between route changes without coordinate math."
  },
  {
    id: "concurrent-transition-ui",
    title: "React 18 useTransition Pattern",
    date: "Mar 2026",
    language: "typescript",
    shortDesc: "Managing heavy state updates without blocking the main UI thread.",
    category: "Architecture",
    code: `import { useState, useTransition } from 'react';

function FilterableList({ list }) {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    // Urgent update: UI feedback (input field)
    setFilter(e.target.value);

    // Transition naturally lowers priority of heavy list rendering
    startTransition(() => {
      // Heavy computation / sorting
      const filtered = list.filter(i => i.name.includes(e.target.value));
      setProcessedList(filtered);
    });
  }

  return (
    <div>
      <input onChange={handleChange} />
      {isPending && <LoadingSpinner />}
      <HeavyList data={processedList} />
    </div>
  );
}`,
    explanation: "Use useTransition to separate urgent UI updates (like typing) from non-urgent heavy renders. It prevents frame drops and allows the browser to remain responsive during complex state changes."
  },
  {
    id: "gsap-scrolltrigger-proxy",
    title: "GSAP + Locomotive Scroll Proxy",
    date: "Feb 2026",
    language: "typescript",
    shortDesc: "Bridging the gap between third-party smooth scrolling and ScrollTrigger.",
    category: "GSAP",
    code: `import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

const scroller = new LocomotiveScroll({ el: scrollerRef.current, smooth: true });

ScrollTrigger.scrollerProxy(scrollerRef.current, {
  scrollTop(value) {
    return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});

// Update ScrollTrigger when scroller updates
scroller.on('scroll', ScrollTrigger.update);`,
    explanation: "When using high-end smooth scrolling like Locomotive, ScrollTrigger loses track of native window scrolling. The scrollerProxy hooks the scroll position to the library's internal instance, keeping animations perfectly in sync."
  },
  {
    id: "webgl-liquid-shader",
    title: "Three.js Liquid Fragment Shader",
    date: "Feb 2026",
    language: "glsl",
    shortDesc: "Fragment shader logic for creating organic, liquid-like text distortions.",
    category: "WebGL",
    code: `uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 p = vUv - 0.5;
  
  // Organic noise based on time and distance
  float noise = sin(p.x * 10.0 + uTime) * 0.1;
  p += noise * normalize(p);
  
  // Radial distance from mouse
  float d = distance(p, uMouse - 0.5);
  float ripple = sin(d * 20.0 - uTime * 4.0) * exp(-d * 3.0);
  
  gl_FragColor = vec4(vec3(ripple + 0.5), 1.0);
}`,
    explanation: "By applying sine-wave distortion based on time and mouse proximity, you create an organic, reactive liquid effect. This shader can be applied as a displacement map to text or image planes in Three.js."
  },
  {
    id: "framer-motion-infinite-drag",
    title: "Infinite Pan/Drag Gesture",
    date: "Feb 2026",
    language: "tsx",
    shortDesc: "Advanced gesture logic for touch-friendly horizontal carousels.",
    category: "React",
    code: `import { motion, useMotionValue, useTransform } from 'framer-motion';

const x = useMotionValue(0);
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

return (
  <motion.div
    drag="x"
    style={{ x, opacity }}
    dragConstraints={{ left: -1000, right: 0 }}
    onDragEnd={(e, info) => {
      if (info.offset.x < -100) {
        // Trigger logic for next slide
      }
    }}
    className="swipe-card"
  >
    {/* Content */}
  </motion.div>
);`,
    explanation: "Combine useMotionValue and useTransform with the drag prop to create physics-based animations that respond in real-time to the user's touch velocity and distance."
  },
  {
    id: "ts-discriminated-unions",
    title: "Type-Safe UI States",
    date: "Jan 2026",
    language: "typescript",
    shortDesc: "Preventing 'impossible states' using TypeScript Discriminated Unions.",
    category: "Architecture",
    code: `type APIState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function DataView({ state }: { state: APIState<User[]> }) {
  switch (state.status) {
    case 'idle': return null;
    case 'loading': return <Loader />;
    case 'success': 
      // TS knows state.data exists here
      return <List data={state.data} />;
    case 'error': 
      // TS knows state.message exists here
      return <Error msg={state.message} />;
  }
}`,
    explanation: "Avoid multiple flags like isLoading, isError, and data independently. Discriminated unions ensure that the existence of data is logically tied to the success status, killing bugs at compile-time."
  },
  {
    id: "intersection-observer-heavy",
    title: "Performance: Lazy Heavy Render",
    date: "Jan 2026",
    language: "typescript",
    shortDesc: "Advanced Intersection Observer wrapper for lazy mounting components.",
    category: "Architecture",
    code: `import { useState, useEffect, useRef } from 'react';

export const useNearScreen = () => {
  const [isNear, setIsNear] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNear(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return [isNear, elementRef] as const;
};`,
    explanation: "Prevent the browser from rendering hidden, heavy components until the user scrolls near them. Using a rootMargin pre-loads content before it enters the viewport for a seamless experience."
  },
  {
    id: "css-fluid-typography",
    title: "Fluid Design System (Clamp)",
    date: "Jan 2026",
    language: "css",
    shortDesc: "Eliminating media queries for typography using CSS math functions.",
    category: "CSS",
    code: `:root {
  /* Fluid scaling from 1rem at 320px to 2.5rem at 1440px */
  --h1-size: clamp(2rem, 5vw + 1rem, 5rem);
  --p-size: clamp(1rem, 1.2vw + 0.5rem, 1.25rem);
}

h1 {
  font-size: var(--h1-size);
  line-height: 0.9;
  letter-spacing: -0.05em;
}

p {
  font-size: var(--p-size);
}`,
    explanation: "The clamp() function allows for dynamic resizing that respects min/max bounds. This results in perfect typography across all devices without writing hundreds of lines of media query overrides."
  },
  {
    id: "ssr-safe-storage",
    title: "Hook: SSR-Safe LocalStorage",
    date: "Dec 2025",
    language: "typescript",
    shortDesc: "Custom hook for persisting state with server-side safety checks.",
    category: "React",
    code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}`,
    explanation: "When using Vite or Next.js, access to 'window' is limited during the initial build or server-pass. This hook safely handles those environments while providing a reactive, persisted state interface."
  },
  {
    id: "gsap-split-stagger",
    title: "Staggered Split-Text Headers",
    date: "Dec 2025",
    language: "typescript",
    shortDesc: "Manual character splitting for GSAP staggering without paid plugins.",
    category: "GSAP",
    code: `// Split text into individual spans
const splitText = (el) => {
  const str = el.textContent;
  el.textContent = '';
  str.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\\u00A0' : char;
    span.style.display = 'inline-block';
    el.appendChild(span);
  });
};

// Animation
gsap.from(heading.children, {
  y: 100,
  opacity: 0,
  rotateX: 45,
  stagger: 0.05,
  duration: 1,
  ease: "power4.out"
});`,
    explanation: "You don't always need SplitText (GSAP Premium). A simple JS helper can split your strings into spans, allowing you to animate individual characters or words with high-performance CSS transforms."
  },
  {
    id: "service-worker-cache",
    title: "Advanced PWA Cache Strategy",
    date: "Nov 2025",
    language: "javascript",
    shortDesc: "Network-first fallback to cache strategy for lightning-fast assets.",
    category: "Architecture",
    code: `self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone();
        caches.open('v1').then(cache => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});`,
    explanation: "Implement a robust caching strategy that prioritizes the network for fresh content but falls back to the local cache instantly if the user is offline or the connection is unstable."
  }
];
