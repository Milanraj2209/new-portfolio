import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Footer() {
  const { data } = usePortfolio();
  const { profile } = data;


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cinematic-footer">
      <div className="footer-top-accent" />

      <div className="footer-shell">
        <div className="footer-main-row">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="brand-badge">MR</span>
              <span className="brand-title">
                MILAN RAJ<span className="brand-dot">.</span>
              </span>
            </div>
            <p className="footer-motto">
              Engineering intelligent systems, generative AI integrations, and cinematic 3D digital experiences.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="footer-group-title">SITEMAP</span>
            <div className="footer-nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-social-col">
            <span className="footer-group-title">CONNECT</span>
            <div className="footer-social-links">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {new Date().getFullYear()} MILAN RAJ. ALL RIGHTS RESERVED.
          </div>

          <div className="footer-tag">
            <Sparkles size={12} className="tag-sparkle" />
            <span>DESIGNED WITH PASSION & CINEMATIC 3D WEBGL</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <span>TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
