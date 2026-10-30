import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Terminal, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Navbar() {
  const { setIsAdminOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link detection
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`floating-nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" aria-label="Milan Raj Home">
          <div className="logo-badge">
            <span className="logo-letters">MR</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">
              MILAN RAJ<span className="brand-dot">.</span>
            </span>
            <span className="brand-tagline">3D PORTFOLIO</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="nav-link-text">{item.label}</span>
              {activeSection === item.id && <span className="nav-link-glow" />}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Admin CMS Trigger */}
        <div className="nav-cta-wrap">
          <button
            type="button"
            className="admin-nav-trigger"
            onClick={() => setIsAdminOpen(true)}
            title="Open Live Portfolio CMS / Admin"
          >
            <Sliders size={14} />
            <span>CMS</span>
          </button>

          <a href="#contact" className="talk-button">
            <span>LET'S TALK</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>


      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-list">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a
              href="#contact"
              className="button button-primary mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>INITIATE CONTACT</span>
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
