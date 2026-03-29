import { useEffect, useState, useCallback } from 'react';
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
import { StoreSection } from '@/sections/StoreSection';
import { ContactCTA } from '@/sections/ContactCTA';
import { Footer } from '@/sections/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { LiquidBackground } from '@/components/ui/LiquidBackground';
import { PremiumIntro } from '@/components/ui/PremiumIntro';
import MeshGradient from '@/components/ui/MeshGradient';
import { ProjectDetails } from '@/pages/ProjectDetails';
import { LabPage } from '@/pages/LabPage';
import { SnippetsPage } from '@/pages/SnippetsPage';

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to ensure pages start at the top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [pathname, hash]);
  return null;
}

function HomePage({ isIntroDone }: { isIntroDone: boolean }) {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash === '#portfolio') {
      // Delay strictly zero to jump instantly before browser layout paint
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'auto' });
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

function AppRoutes({ loading }: { loading: boolean }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage isIntroDone={!loading} />} />
            <Route path="/store" element={<StoreSection />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/snippets" element={<SnippetsPage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </AnimatePresence>
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
        <AppRoutes loading={loading} />
      </SmoothScroll>
    </Router>
  );
}

export default App;
