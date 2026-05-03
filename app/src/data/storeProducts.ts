import { 
  Palette, 
  Video, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Globe,
  Database,
  Layout,
  type LucideIcon 
} from 'lucide-react';

export interface StoreProduct {
  id: string;
  category: 'Snippets' | 'Systems' | 'Art' | 'Motion';
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  previewUrl?: string; // Image or Video URL
  icon: LucideIcon;
  color: string;
  tags: string[];
  packageIncludes: string[];
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export const storeProducts: StoreProduct[] = [
  // --- PRODUCTION SYSTEMS (Backend/Security) ---
  {
    id: 'auth-master-pack',
    category: 'Systems',
    title: 'Elite Auth & Security Layer',
    description: 'Production-ready JWT authentication with refresh token rotation and MFA hooks.',
    fullDescription: 'A comprehensive security foundation for modern web applications. This system implements industry-standard JWT rotation, secure cookie handling, and extensible MFA hooks to ensure your user data remains impenetrable.',
    price: 'रु 12,500',
    icon: ShieldCheck,
    color: '#ff930f',
    tags: ['Next.js', 'Auth0', 'Security'],
    packageIncludes: ['Full Source Code', 'Security Audit Report', 'Setup Documentation', '1 Year Updates'],
    features: ['JWT Rotation', 'MFA Ready', 'CSRF Protection'],
    stats: [{ label: 'Safety', value: '100%' }, { label: 'Setup', value: '5 min' }]
  },
  {
    id: 'api-gateway-pro',
    category: 'Systems',
    title: 'API Gateway Orchestrator',
    description: 'Advanced rate-limiting, caching, and request-proxying for high-scale microservices.',
    fullDescription: 'Orchestrate your microservices with a high-performance gateway. Featuring intelligent rate-limiting via Redis, automatic request validation, and an ultra-fast proxy layer to minimize latency across your entire infrastructure.',
    price: 'रु 17,500',
    icon: Database,
    color: '#2B2D42',
    tags: ['Node.js', 'Redis', 'API'],
    packageIncludes: ['Gateway Core Generator', 'Redis Logic Hooks', 'Deployment Configs'],
    features: ['Redis Cache', 'Rate Limiting', 'Zod Validation'],
    stats: [{ label: 'Latency', value: '<10ms' }, { label: 'Scale', value: 'Infinite' }]
  },
  {
    id: 'jwt-engine-suite',
    category: 'Systems',
    title: 'JWT Engine Suite',
    description: 'Highly secure token management for distributed systems with automated signing.',
    fullDescription: 'A specialized engine for handling complex token lifecycles in distributed environments. Includes RS256 signing utilities, instant revocation capability, and deep audit logging for compliance-heavy applications.',
    price: 'रु 7,500',
    icon: Cpu,
    color: '#2B2D42',
    tags: ['TypeScript', 'Crypto', 'JWT'],
    packageIncludes: ['Signing Utils', 'Revocation Logic', 'Audit Middleware'],
    features: ['RS256 Signing', 'Revocation', 'Audit Logs']
  },
  {
    id: 'frontend-arch-layer',
    category: 'Systems',
    title: 'Elite Frontend Architecture Layer',
    description: 'A fundamental scalable architecture for modern React/Next.js platforms.',
    fullDescription: 'The bedrock of professional frontend development. This architecture implements atomic design principles, a strictly typed state management layer, and optimized render cycles to handle 100+ components with zero lag.',
    price: 'रु 25,000',
    icon: Layout,
    color: '#ff930f',
    tags: ['Architecture', 'React', 'Scale'],
    packageIncludes: ['Project Boilerplate', 'Store Orchestrator', 'Type Definitions', 'CI/CD Pipelines'],
    features: ['Atomic Structure', 'Strict Context', 'Performance Hooks'],
    stats: [{ label: 'Speed', value: '100/100' }, { label: 'Type Safe', value: '100%' }]
  },

  // --- ELITE SNIPPETS (UI/UX) ---
  {
    id: 'gsap-ui-toolkit',
    category: 'Snippets',
    title: 'Cinematic UI Interaction Kit',
    description: '10+ High-end GSAP interactions: Magnetic inputs, liquid modals, and scrubbed reveals.',
    fullDescription: 'Bring Hollywood-grade motion to your web apps. This toolkit provides drop-in GSAP components designed for maximum visual impact and buttery-smooth 60FPS performance on all modern browsers.',
    price: 'रु 5,500',
    icon: Zap,
    color: '#0f7bff',
    tags: ['GSAP', 'React', 'Motion'],
    packageIncludes: ['GSAP Component Library', 'Custom Hook Presets', 'Example Scenes'],
    features: ['Smooth Scrub', 'Spring Interaction', 'Stagger Pro'],
    stats: [{ label: 'FPS', value: '60+' }, { label: 'Weight', value: '2kb' }]
  },
  {
    id: 'framer-layout-pro',
    category: 'Snippets',
    title: 'Adaptive Layout Patterns',
    description: 'Complex grid-to-list transitions and shared element transitions for React.',
    fullDescription: 'Solve the hardest part of modern UI: Layout Transitions. This collection handles complex shared-element motion and responsive grid reordering with the power of Framer Motion\'s LayoutID system.',
    price: 'रु 4,000',
    icon: Layout,
    color: '#0f7bff',
    tags: ['Framer Motion', 'React', 'Layout'],
    packageIncludes: ['Transition Templates', 'Shared Element Hooks', 'Grid Logic'],
    features: ['LayoutID Sync', 'Presence Hooks', 'Reflow Logic']
  },
  {
    id: 'webgl-shader-pack',
    category: 'Snippets',
    title: 'Liquid Shader Collection',
    description: 'A curated list of GLSL fragment shaders for organic image and text distortions.',
    fullDescription: 'Art meet Math. Use these high-performance WebGL shaders to create organic, liquid-like distortions on any image or text element in your React application without manual GL coding.',
    price: 'रु 6,500',
    icon: Globe,
    color: '#ff930f',
    tags: ['Three.js', 'GLSL', 'Shaders'],
    packageIncludes: ['GLSL Fragment Files', 'React-Three-Fiber Setup', 'Mouse Listener Logic'],
    features: ['UV Distort', 'Noise FBM', 'Mouse Reactive']
  },

  // --- DIGITAL CANVAS (Art) ---
  {
    id: 'scenery-oil-painting',
    category: 'Art',
    title: 'Traditional Scenery Oil Paintings',
    description: 'Hand-crafted digital oil paintings exploring serene landscapes and natural light.',
    fullDescription: 'A premium collection of high-resolution digital oil paintings. Each piece is meticulously crafted to simulate traditional impasto techniques and organic light falloff, perfect for high-end digital displays or physical prints.',
    price: 'रु 4,500',
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
    icon: Palette,
    color: '#0f7bff',
    tags: ['Oil', 'Landscape', '300DPI'],
    packageIncludes: ['High-Res TIFF (4K)', 'CMYK Print Ready File', 'Digital Authenticity Certificate'],
    stats: [{ label: 'Format', value: 'PNG/TIFF' }, { label: 'PPI', value: '300' }]
  },
  {
    id: 'digital-art-custom',
    category: 'Art',
    title: 'Digital Art (Customizable)',
    description: 'Premium digital artworks tailored to your branding or personal aesthetic.',
    fullDescription: 'Professional-grade digital art that adapts to your needs. This series features procedural flexibility, allowing for color shifts and composition adjustments to perfectly match your brand language.',
    price: 'रु 3,500',
    previewUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
    icon: Palette,
    color: '#2B2D42',
    tags: ['Custom', 'Art', 'Identity'],
    packageIncludes: ['Original Layered File', 'Custom Export Presets', 'Commercial Rights']
  },

  // --- MOTION CINEMA (Video) ---
  {
    id: 'cinema-ai-intro',
    category: 'Motion',
    title: 'Cinema-Grade AI Opener',
    description: 'A custom, photorealistic AI video opener for premium branding and storytelling.',
    fullDescription: 'High-fidelity cinematic introductions generated through a proprietary AI pipeline. We blend photorealistic generation with hand-crafted sound design to create an opener that commands attention.',
    price: 'रु 65,000',
    previewUrl: 'video_placeholder_1',
    icon: Video,
    color: '#0f7bff',
    tags: ['AI Video', 'Cinema', '4K'],
    packageIncludes: ['PRORES 422 Video', 'Raw Audio Stems', 'Storyboard Proofs'],
    features: ['Custom Music', '8K Upscaling', 'Visual Foley'],
    stats: [{ label: 'Length', value: '15s' }, { label: 'Delivery', value: '48h' }]
  },
  {
    id: 'business-promo-pack',
    category: 'Motion',
    title: 'Pro Business Storyboard',
    description: 'Engaging AI business promotions. High-impact messaging through procedural visuals.',
    fullDescription: 'An all-in-one motion toolkit for businesses looking to dominate social media. Includes high-tempo AI-generated visuals and professional typography layouts designed for maximum conversion.',
    price: 'रु 35,000',
    icon: Video,
    color: '#ff930f',
    tags: ['Marketing', 'Promo', 'Impact'],
    packageIncludes: ['5 Unique Promo Variants', 'Optimized for Mobile/Web', 'Font License Data']
  },
  {
    id: 'ghost-engine-core',
    category: 'Systems',
    title: 'The Ghost Engine',
    description: 'Bypass React reconciliation for 60FPS data-intensive applications. Invisible state layer.',
    fullDescription: 'The ultimate performance upgrade. The Ghost Engine provides an invisible state management layer that syncs directly with the DOM, allowing for complex data visualizations and 60FPS motion in scenarios where React\'s standard diffing fails.',
    price: 'रु 22,000',
    icon: Cpu,
    color: '#0f7bff',
    tags: ['State', 'Performance', 'Engine'],
    packageIncludes: ['Engine Core Module', 'DOM Direct Bindings', 'Developer API Console'],
    features: ['Zero Re-renders', 'Direct DOM Sync', '1ms Latency'],
    stats: [{ label: 'Performance', value: '100%' }, { label: 'Sync', value: 'Direct' }]
  }
];
