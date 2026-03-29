import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-serif">Project not found</h1>
        <button onClick={() => navigate('/')} className="mt-4 underline">Go back</button>
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
            <h2 className="text-3xl font-serif font-bold mb-4">Performance Profiling</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Our main bottleneck was the initialization of huge HDR environment maps. By compressing textures to KTX2 format and using basis universal, we decreased load times by 70%. Additionally, GSAP was employed not just for DOM animations, but for tweening numeric values inside the React Three Fiber loop, enabling perfectly smooth camera sweeps.
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 font-mono text-sm">
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
      className="min-h-screen bg-white"
    >
      {/* Back Button - Mobile/Tablet (Fixed) */}
      <div className="lg:hidden fixed top-32 left-6 md:top-8 md:left-8 z-[110]">
        <button 
          onClick={() => navigate('/#portfolio')} 
          className="group flex items-center justify-center bg-white/90 backdrop-blur-xl w-7 h-7 md:w-auto md:px-4 md:py-2 rounded-full border border-black/5 shadow-xl transition-all duration-300 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-black transition-transform group-hover:-translate-x-1" />
          <span className="hidden md:block text-sm font-semibold tracking-wide ml-2 text-black">Back</span>
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
                {/* Desktop Back Button - Strictly Aligned Above Date */}
                <div className="hidden lg:block mb-8">
                  <button 
                    onClick={() => navigate('/#portfolio')} 
                    className="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-bold tracking-tight">Back to Projects</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-400 font-mono text-sm">{project.year}</span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>
                
                <motion.h1 
                  layoutId={`title-${project.id}`}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#1A1A1A] leading-[1.1] tracking-tighter mb-8 break-words hyphens-auto"
                >
                  {project.title}
                </motion.h1>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.metrics && (
                  <div className="bg-[#FF6B9D]/10 text-[#FF6B9D] px-6 py-4 rounded-xl border border-[#FF6B9D]/20 inline-flex flex-col">
                    <span className="text-xs font-mono font-bold uppercase mb-1">{project.metrics.label}</span>
                    <span className="text-3xl font-serif font-black">{project.metrics.value}</span>
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
            {renderCaseStudyContent()}
          </motion.div>

        </div>
      </SmoothScroll>
    </motion.div>
  );
}
