import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Cpu, Target, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function AboutSection() {
  const { data } = usePortfolio();
  const { profile } = data;


  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      desc: 'Developing computer vision architectures and generative AI workflows that solve practical problems.'
    },
    {
      icon: Code,
      title: 'Modern Full-Stack',
      desc: 'Crafting responsive, secure, and performant web applications using React, Python, and cloud infrastructure.'
    },
    {
      icon: Cpu,
      title: 'Automation & Systems',
      desc: 'Building automated screening, data pipelines, and sentiment listening monitors with real-time feedback.'
    },
    {
      icon: Target,
      title: 'Product-First Mindset',
      desc: 'Obsessed with turning rough concepts into intuitive, reliable digital products people love using.'
    }
  ];

  return (
    <section className="section about-section section-shell" id="about">
      <div className="section-label">
        <span>01</span>
        <i />
        BIOGRAPHY & PHILOSOPHY
      </div>

      <div className="about-grid-layout">
        {/* Left Column: Big Typographic Statement */}
        <motion.div
          className="about-headline-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">
            <Sparkles size={13} /> {profile.bioHeading}
          </span>
          <h2 className="about-big-title">
            I TURN COMPLEX <br />
            TECHNOLOGY INTO <br />
            <span className="gradient-text">INTUITIVE EXPERIENCES.</span>
          </h2>

          <div className="about-metrics-row">
            {profile.metrics.map((metric, i) => (
              <div key={i} className="metric-box">
                <span className="metric-val">{metric.value}</span>
                <span className="metric-lbl">{metric.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Bio Narrative & High-Tech 3D Cards */}
        <motion.div
          className="about-content-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="bio-lead-card">
            <p className="bio-lead-text">{profile.bio}</p>
            <p className="bio-secondary-text">{profile.extendedBio}</p>
          </div>

          {/* Interactive Feature Cards */}
          <div className="about-features-grid">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="about-feature-card">
                  <div className="card-top-icon">
                    <Icon size={18} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
