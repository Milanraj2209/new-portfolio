import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar from './components/Navbar.jsx';
import AdminModal from './components/AdminModal.jsx';
import HeroSection from './sections/HeroSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Scroll to top on first mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PortfolioProvider>
      <div className="portfolio-app-root">
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <Navbar />
        <AdminModal />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </PortfolioProvider>
  );
}

