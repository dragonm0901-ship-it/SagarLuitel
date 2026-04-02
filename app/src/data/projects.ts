export interface Project {
  id: string;
  image: string;
  title: string;
  year: string;
  tags: string[];
  challenge: string;
  magic: string;
  metrics?: {
    label: string;
    value: string;
  };
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: '3d-bike-configurator',
    image: '/images/MTBX1.jpeg',
    title: '3D Bike Configurator',
    year: '2024',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'State'],
    challenge: 'Developing a high-performance interactive configurator with real-time state management and dynamic UI for a premium brand.',
    magic: 'Custom state orchestration and GSAP timelines reduced logic overhead by 80%, enabling butter-smooth interaction.',
    metrics: { label: 'Logic Efficiency', value: '80%' },
    github: 'https://github.com/dragonm0901-ship-it/MTBX1---3D-Bicycle-Website',
    live: 'https://mtb1x.vercel.app/'
  },
  {
    id: 'myrestro-manager',
    image: '/images/myRestroManager.jpeg',
    title: 'myRestro(SAAS) Manager',
    year: '2024',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    challenge: 'Building a multi-tenant restaurant management system with real-time order tracking and complex analytics dashboards.',
    magic: 'Implemented a seamless scrollytelling narrative that led to a 45% increase in average session duration.',
    metrics: { label: 'User Retention', value: '+45%' },
    github: 'https://github.com/dragonm0901-ship-it/my-RestroManager',
    live: 'https://myrestromanager.vercel.app/'
  },
  {
    id: 'project-peak',
    image: '/images/Project Peak.jpeg',
    title: 'Project Peak(Travel Agency Website)',
    year: '2025',
    tags: ['React', 'GSAP', 'Framer Motion', 'Contentful'],
    challenge: 'Designing a premium travel booking platform with immersive destination walkthroughs and interactive maps.',
    magic: 'Developed a proprietary animation system that moved complex UI transitions to hardware-accelerated layers.',
    metrics: { label: 'Frame Density', value: '99.9%' },
    github: 'https://github.com/dragonm0901-ship-it/Project-Peak',
    live: 'https://projectpeak.vercel.app/'
  },
  {
    id: 'into-pokhara',
    image: '/images/Into Pokhara.jpeg',
    title: 'Into Pokhara',
    year: '2025',
    tags: ['Next.js', 'GSAP', 'WebGL', 'Editorial'],
    challenge: 'Transforming a nature-focused story into a cinematic editorial scrollytelling experience with deep atmospheric layers.',
    magic: 'GSAP ScrollTrigger orchestration for seamless atmospheric transitions and parallax topographic peaks.',
    metrics: { label: 'Engagement', value: '+45%' },
    github: 'https://github.com/dragonm0901-ship-it/Into-Pokhara',
    live: 'https://intopokhara.vercel.app/'
  },
  {
    id: 'daami-restaurant',
    image: '/images/KTM Decor.jpeg',
    title: 'Daami Restaurant',
    year: '2024',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Fullstack'],
    challenge: 'Building a modern restaurant management and reservation system with a focus on seamless user experience.',
    magic: 'Real-time booking and interactive menu management with high-performance database interactions.',
    metrics: { label: 'Efficiency', value: '+40%' },
    github: 'https://github.com/dragonm0901-ship-it/Dami-Restaurant'
  },
  {
    id: '3d-museum',
    image: '/images/3D Museum.jpeg',
    title: '3D Museum',
    year: '2024',
    tags: ['React Three Fiber', 'Three.js', 'GLSL', 'Performance'],
    challenge: 'Creating a high-fidelity 3D environment for virtual exploration with optimized asset loading for web.',
    magic: 'Custom GLTF compression pipelines and instance-based rendering achieved buttery 60fps on mobile devices.',
    metrics: { label: 'Mobile Perf', value: '60 FPS' }
  },
];
