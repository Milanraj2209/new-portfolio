import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, FileText, Sparkles, Terminal } from 'lucide-react';
import CinematicScene from '../three/CinematicScene.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function HeroSection() {
  const { data } = usePortfolio();
  const { profile } = data;


  return (
    <section className="hero section-shell" id="home">
      {/* 3D Interactive Three.js Scene */}
      <CinematicScene />

      {/* Atmospheric Grain and Vignette */}
      <div className="hero-grain" />
      <div className="hero-ambient-glow" />

      {/* Top Meta Status Line */}
      <div className="hero-topline">
        <span className="hero-badge-tag">
          <Terminal size={12} /> {profile.heroTagline}
        </span>
        <span className="live-status">
          <i className="status-blink" /> {profile.status}
        </span>
      </div>

      {/* Main Center-Left Typography with Cinematic Lighting Falloff */}
      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-chip">
            <Sparkles size={13} />
            <span>WELCOME TO THE DIGITAL SPACE OF</span>
          </div>

          <h1 className="hero-main-name">
            MILAN <br />
            <span className="gradient-highlight">
              RAJ<span className="dot-pulse">.</span>
            </span>
          </h1>

          <div className="hero-quote-box">
            <p className="hero-tagline-quote">"{profile.title}"</p>
            <p className="hero-roles-banner">{profile.roleString}</p>
          </div>

          {/* Call to Actions */}
          <div className="hero-actions-row">
            <a href="#projects" className="button button-primary">
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#contact"
              className="button button-secondary"
            >
              <FileText size={16} />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </motion.div>

        {/* 3D Character HUD Caption */}
        <div className="avatar-caption-hud">
          <div className="hud-line" />
          <div className="hud-details">
            <span className="hud-label">INTERACTIVE 3D AVATAR</span>
            <span className="hud-spec">HEADSET / DEV BADGE / ACTIVE TRACKING</span>
          </div>
          <span className="hud-code">SYS.MR — 001</span>
        </div>
      </div>

      {/* Hero Bottom Bar with Scroll Cue */}
      <div className="hero-bottom-bar">
        <a href="#about" className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-mouse-icon">
            <span className="scroll-wheel" />
          </div>
        </a>

        <div className="hero-geo">
          <span>31.3260° N, 75.5762° E</span>
          <span className="geo-divider">/</span>
          <span>PUNJAB, INDIA</span>
        </div>
      </div>
    </section>
  );
}
