import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Monitor, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'course-1',
    category: 'Course',
    title: 'The Shader Masterclass',
    description: 'Learn to build GPU-accelerated visuals for the web from scratch.',
    price: '$199',
    level: 'Advanced',
    duration: '12 Hours',
    rating: 4.9,
    icon: Star,
    color: '#FF6B9D',
    tags: ['GLSL', 'R3F', 'Math']
  },
  {
    id: 'build-1',
    category: 'Template',
    title: 'Editorial 3D Portfolio',
    description: 'A high-performance R3F boilerplate with premium scrollytelling.',
    price: '$49',
    level: 'Ready-to-Deploy',
    features: ['GSAP Integrated', 'R3F Scene', 'Responsive'],
    icon: Monitor,
    color: '#F5C518',
    tags: ['React', 'Three.js', 'Vite']
  },
  {
    id: 'course-2',
    category: 'Course',
    title: 'GSAP Scrollytelling Architecture',
    description: 'The definitive guide to building complex scroll-driven animations.',
    price: '$149',
    level: 'Intermediate',
    duration: '8 Hours',
    rating: 4.8,
    icon: BookOpen,
    color: '#FF8C42',
    tags: ['GSAP', 'Lenis', 'Performance']
  }
];

export function StoreSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Course' | 'Template'>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".store-title-anim", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
      
      // Filter Animation
      gsap.from(filterRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6, // Delay after header
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="store" className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="store-title-anim font-bold text-black mb-6">
              Wizard Store & <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#FF6B9D]">Academy</span>
            </h2>
            <p className="store-title-anim text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              Premium Knowledge & Professional Build-Ready Templates
            </p>
          </div>

          <div ref={filterRef} className="flex gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
            <div className="flex gap-2 min-w-max">
              {['All', 'Course', 'Template'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as 'All' | 'Course' | 'Template')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-black text-white shadow-lg' 
                      : 'text-gray-500 hover:text-black hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 px-4 md:px-0 -mx-4 md:mx-0 snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-[85vw] flex-shrink-0 md:w-auto snap-center ml-4 md:ml-0 first:ml-4">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
