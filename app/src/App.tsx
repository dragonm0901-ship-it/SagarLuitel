import { useEffect, useState } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to ensure pages start at the top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
}

function HomePage({ isIntroDone }: { isIntroDone: boolean }) {
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <PremiumIntro onComplete={() => setLoading(false)} />
        <CustomCursor />
        <LiquidBackground />
        <GrainOverlay />
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage isIntroDone={!loading} />} />
              <Route path="/store" element={<StoreSection />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
