import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/sections/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { StatsSection } from '@/sections/StatsSection';
import { AboutSection } from '@/sections/AboutSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { PortfolioSection } from '@/sections/PortfolioSection';
import { ContactCTA } from '@/sections/ContactCTA';
import { Footer } from '@/sections/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { LiquidBackground } from '@/components/ui/LiquidBackground';
import { PremiumIntro } from '@/components/ui/PremiumIntro';
import MeshGradient from '@/components/ui/MeshGradient';
import { ChessMiniGame } from '@/components/ui/ChessMiniGame';

// Lazy Loaded Routes for Performance
const StoreSection = lazy(() => import('@/sections/StoreSection').then(m => ({ default: m.StoreSection })));
const StoreProductPage = lazy(() => import('@/pages/StoreProductPage').then(m => ({ default: m.StoreProductPage })));
const LabPage = lazy(() => import('@/pages/LabPage').then(m => ({ default: m.LabPage })));
const LabDetailsPage = lazy(() => import('./pages/LabDetailsPage').then(m => ({ default: m.LabDetailsPage })));
const SnippetsPage = lazy(() => import('@/pages/SnippetsPage').then(m => ({ default: m.SnippetsPage })));
const SnippetDetailsPage = lazy(() => import('./pages/SnippetDetailsPage').then(m => ({ default: m.SnippetDetailsPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to ensure pages start at the top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
    // Small delay to allow lazy-loaded components to mount and report their height
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

function HomePage({ isIntroDone }: { isIntroDone: boolean }) {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash === '#portfolio' || hash === '#about') {
      const elementId = hash.slice(1);
      // Delay strictly zero to jump instantly before browser layout paint
      setTimeout(() => {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'auto' });
      }, 0);
    }
  }, [hash]);

  return (
    <>
      <HeroSection isIntroDone={isIntroDone} />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactCTA />
    </>
  );
}

// Easter Egg Console Log for Performance
const logEasterEgg = () => {
  console.log(
    '%c100  %c100  %c100  %c100',
    'color: #22C55E; font-size: 32px; font-weight: bold; background: #000; padding: 10px; border-radius: 8px 0 0 8px;',
    'color: #22C55E; font-size: 32px; font-weight: bold; background: #000; padding: 10px;',
    'color: #22C55E; font-size: 32px; font-weight: bold; background: #000; padding: 10px;',
    'color: #22C55E; font-size: 32px; font-weight: bold; background: #000; padding: 10px; border-radius: 0 8px 8px 0;'
  );
  console.log(
    '%cPERFORMANCE  %cACCESSIBILITY  %cBEST PRACTICES  %cSEO',
    'color: white; font-size: 10px; font-weight: bold; background: #000; padding: 4px; margin-top: -10px',
    'color: white; font-size: 10px; font-weight: bold; background: #000; padding: 4px; margin-top: -10px',
    'color: white; font-size: 10px; font-weight: bold; background: #000; padding: 4px; margin-top: -10px',
    'color: white; font-size: 10px; font-weight: bold; background: #000; padding: 4px; margin-top: -10px'
  );
  console.log(
    '%cHey there, Inspector! \nWe take performance seriously. Welcome to the console.',
    'color: #FF6B9D; font-size: 14px; font-weight: bold;'
  );
};

// Professional Suspense Fallback
const PageLoader = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700">
    <div className="w-12 h-12 rounded-full border-2 border-[#FF6B9D]/20 border-t-[#FF6B9D] animate-spin" />
    <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-400">Loading Wizardry</span>
  </div>
);

function AppRoutes({ loading }: { loading: boolean }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage isIntroDone={!loading} />} />
              <Route path="/store" element={<StoreSection />} />
              <Route path="/store/:id" element={<StoreProductPage />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/lab/:id" element={<LabDetailsPage />} />
              <Route path="/snippets" element={<SnippetsPage />} />
              <Route path="/snippets/:id" element={<SnippetDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    logEasterEgg();
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <Router>
      <MeshGradient />
      <ScrollToTop />
      <SmoothScroll>
        <PremiumIntro onComplete={handleComplete} />
        <CustomCursor />
        <LiquidBackground />
        <GrainOverlay />
        <ChessMiniGame />
        <AppRoutes loading={loading} />
      </SmoothScroll>
    </Router>
  );
}

export default App;
