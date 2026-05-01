import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import { projects } from '@/data/projects';
import { SmoothScroll } from '@/components/SmoothScroll';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-700">
        <h1 className="text-4xl font-serif">Project not found</h1>
        <button onClick={() => navigate('/')} className="mt-4 underline text-gray-500 hover:text-black dark:hover:text-white transition-colors">Go back</button>
      </div>
    );
  }

  // Generate generic structured content for Case Study
  const renderCaseStudyContent = () => {
    if (project.id === '3d-bike-configurator') {
      return (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4">The Architecture</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              For the 3D Bike Configurator, achieving 60fps across all devices was paramount. We utilized React Three Fiber for declarative 3D state, but hand-optimized the WebGL pipeline to prevent unnecessary re-renders. The integration points between the 3D canvas and the standard DOM were managed using Zustand, guaranteeing that when a user selects a new material, the UI updates synchronously with the shader compilation.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4 dark:text-white transition-colors duration-700">Performance Profiling</h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-700 leading-relaxed text-lg mb-4">
              Our main bottleneck was the initialization of huge HDR environment maps. By compressing textures to KTX2 format and using basis universal, we decreased load times by 70%. Additionally, GSAP was employed not just for DOM animations, but for tweening numeric values inside the React Three Fiber loop, enabling perfectly smooth camera sweeps.
            </p>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 transition-colors duration-700 font-mono text-sm dark:text-gray-300">
              <span className="text-green-500">✓</span> Total Geometry: 45k poly<br/>
              <span className="text-green-500">✓</span> Initial Load: 1.2s<br/>
              <span className="text-green-500">✓</span> Framerate: Locked 60FPS<br/>
            </div>
          </section>
        </div>
      );
    }

    if (project.id === 'myrestro-manager') {
      return (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4">Complex State Orchestration</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              myRestro is a multi-tenant SaaS that required handling hundreds of concurrent socket events per minute for order tracking. The traditional approach would have led to massive React rendering waterfalls. Instead, we architected a finely-tuned decoupled event system where UI components subscribed only to atomic stores.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-serif font-bold mb-4">The Scrollytelling Aspect</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To onboard new restaurant owners, we built a landing page that didn't just explain the product—it demonstrated it. Using Lenis and ScrollTrigger, we pinned a live SVG dashboard that populated with simulated data as the user scrolled, visually proving the software's capability without requiring a login.
            </p>
          </section>
        </div>
      );
    }

    if (project.id === 'dobby-haircare') {
      return (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4">Luxury UX Architecture</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              The goal for Dobby- Haircare was to translate the tactile feel of premium haircare into a digital experience. We focused on "soft" interactions—gentle fades, staggered entrance animations using GSAP, and a custom cursor that reacts to the product's visual weight. The navigation was architected to be invisible yet intuitive, keeping the focus entirely on the aesthetic of the brand.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4 dark:text-white transition-colors duration-700">Motion Engineering</h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-700 leading-relaxed text-lg mb-4">
              Beyond aesthetics, the platform is built for extreme fluidity. By utilizing Vite for ultra-fast development and Lenis for perfectly smooth inertial scrolling, we achieved a level of polish that rivals native applications. The motion system is synchronized across the entire viewport, creating a cohesive narrative as the user explores the product lineup.
            </p>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 transition-colors duration-700 font-mono text-sm dark:text-gray-300">
              <span className="text-green-500">✓</span> Build Tool: Vite<br/>
              <span className="text-green-500">✓</span> Animation: GSAP & Lenis<br/>
              <span className="text-green-500">✓</span> Visuals: 4K Product Assets<br/>
            </div>
          </section>
        </div>
      );
    }

    if (project.id === 'digital-voting') {
      return (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4">The Digital Infrastructure</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              The Digital Voting Portal is a high-fidelity demonstration of secure, accessible democratic participation. Built with Next.js and TypeScript, the platform focuses on providing a seamless, transparent experience. We utilized Prisma for robust data modeling and ensuring that every interaction is backed by a type-safe, high-performance database layer.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-serif font-bold mb-4 dark:text-white transition-colors duration-700">Security & Integrity</h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-700 leading-relaxed text-lg mb-4">
              We implemented a rigorous validation pipeline for all voting actions, ensuring that user identity and ballot integrity are maintained throughout the session. The UI was crafted using Tailwind CSS to provide a clean, authoritative aesthetic that builds trust, while React's state management ensures real-time feedback for the voter.
            </p>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 transition-colors duration-700 font-mono text-sm dark:text-gray-300">
              <span className="text-green-500">✓</span> Framework: Next.js 14<br/>
              <span className="text-green-500">✓</span> Database: Prisma ORM<br/>
              <span className="text-green-500">✓</span> Styling: Tailwind CSS<br/>
            </div>
          </section>
        </div>
      );
    }

    // Default formatting for others like 'project-peak'
    return (
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-serif font-bold mb-4">High-End Motion Design</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            This project required an unparalleled level of "wow factor". Every interaction, from the magnetic cursors to the FLIP transitions, was crafted to feel expensive. We implemented an orchestration layer using Framer Motion to guarantee layout animations didn't fight with GSAP's imperative transformations.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-serif font-bold mb-4">The Result</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            By shifting complex layout shifts to the GPU and standardizing our timeline management, we delivered an experience that felt native, resulting in off-the-charts engagement metrics and zero dropped frames during core navigation.
          </p>
        </section>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700"
    >
      {/* Back Button - Mobile/Tablet (Fixed) - Lowered to avoid overlap */}
      <div className="lg:hidden fixed top-32 left-6 z-[110]">
        <button 
          onClick={() => navigate('/projects')} 
          className="group flex items-center justify-center bg-white/90 dark:bg-black/80 backdrop-blur-xl w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-500 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-black dark:text-white transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      <SmoothScroll>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-48 md:pt-48 lg:pt-32 pb-24 flex flex-col">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24 min-w-0">
            
            {/* Header info */}
            <div className="lg:col-span-5 flex flex-col lg:justify-center min-w-0 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full"
              >
                {/* Desktop Back Button - Strictly Aligned with Header Left Padding */}
                <div className="hidden lg:block mb-10">
                  <button 
                    onClick={() => navigate('/projects')} 
                    className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-all">
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest">Back to Projects</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-400 font-mono text-sm">{project.year}</span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>
                
                <motion.h1 
                  layoutId={`title-${project.id}`}
                  className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#1A1A1A] dark:text-white transition-colors duration-700 leading-[1.1] tracking-tighter mb-8 break-words hyphens-auto"
                >
                  {project.title}
                </motion.h1>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 transition-colors duration-700 px-3 py-1.5 rounded-md border border-gray-100 dark:border-white/10 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.metrics && (
                  <div className="bg-[#FF6B9D]/10 text-[#FF6B9D] px-6 py-4 rounded-xl border border-[#FF6B9D]/20 inline-flex flex-col mb-8">
                    <span className="text-xs font-mono font-bold uppercase mb-1">{project.metrics.label}</span>
                    <span className="text-3xl font-serif font-black">{project.metrics.value}</span>
                  </div>
                )}

                {/* Project Links */}
                {(project.github || project.live) && (
                  <div className="flex flex-wrap gap-6 mt-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-black dark:hover:text-white transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-all">
                          <Github className="w-4 h-4" />
                        </div>
                        GITHUB REPOSITORY
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-[#FF6B9D] dark:hover:text-[#FF6B9D] transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-[#FF6B9D] transition-all">
                          <Globe className="w-4 h-4" />
                        </div>
                        VIEW LIVE SITE
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* FLIP Hero Image */}
            <div className="lg:col-span-7">
              <motion.div 
                layoutId={`card-${project.id}`}
                className="w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.img 
                  layoutId={`image-${project.id}`}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

          </div>

          {/* Detailed Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {/* Overview Section - Mandatory narrative for all projects */}
            <div className="grid md:grid-cols-2 gap-12 mb-20 pb-12 border-b border-gray-100 dark:border-white/10 transition-colors duration-700">
              <div className="space-y-4">
                <h3 className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">The Challenge</h3>
                <p className="text-gray-900 dark:text-white transition-colors duration-700 font-serif text-xl md:text-2xl font-bold leading-tight">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-mono text-[#F5C518] uppercase tracking-widest leading-none">The Magic</h3>
                <p className="text-gray-900 dark:text-white transition-colors duration-700 font-serif text-xl md:text-2xl font-bold leading-tight">
                  {project.magic}
                </p>
              </div>
            </div>

            {renderCaseStudyContent()}
          </motion.div>

        </div>
      </SmoothScroll>
    </motion.div>
  );
}
