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
    image: '/images/project mockups/new mtbx1.png',
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
    image: '/images/project mockups/new restro manager.png',
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
    id: 'save-wildlife',
    image: '/images/project mockups/save wildlife new.png',
    title: 'Save Wildlife',
    year: '2026',
    tags: ['Vue js', 'Nuxt', 'GSAP', 'Lenis', 'Framer Motion', 'Full Stack'],
    challenge: 'Creating a high-impact conservation platform with immersive storytelling to raise awareness and support for global wildlife protection.',
    magic: 'Integrated complex multi-layered scroll animations and dynamic data visualization that increased user engagement by 60%.',
    metrics: { label: 'Awareness', value: '+60%' },
    github: 'https://github.com/dragonm0901-ship-it/wild-project',
    live: 'https://wild-project.vercel.app/'
  },
  {
    id: 'into-pokhara',
    image: '/images/project mockups/into pokhara new.png',
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
    id: 'porsche-concept',
    image: '/images/project mockups/porsche new.png',
    title: 'Porsche Concept',
    year: '2025',
    tags: ['Next.js', 'Three.js', 'WebGL', 'GSAP'],
    challenge: '3D model based website showing 3 models of porsche in 3D. with a custom web design.',
    magic: 'Immersive 3D navigation and real-time lighting adjustments for high-fidelity car models.',
    metrics: { label: 'Model Quality', value: '4K' },
    github: 'https://github.com/dragonm0901-ship-it/Porsche-Concept'
  },
  {
    id: 'project-peak',
    image: '/images/project mockups/project peak new.png',
    title: 'Project Peak(Travel Agency Website)',
    year: '2025',
    tags: ['React', 'GSAP', 'Framer Motion', 'Contentful'],
    challenge: 'Designing a premium travel booking platform with immersive destination walkthroughs and interactive maps.',
    magic: 'Developed a proprietary animation system that moved complex UI transitions to hardware-accelerated layers.',
    metrics: { label: 'Frame Density', value: '99.9%' },
    github: 'https://github.com/dragonm0901-ship-it/Project-Peak',
    live: 'https://projectpeak.vercel.app/'
  },
];
