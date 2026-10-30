import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Check, Sparkles, Layers, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function ProjectsSection() {
  const { data } = usePortfolio();
  const { projects } = data;

  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="section projects-section section-shell" id="projects">
      <div className="section-label">
        <span>03</span>
        <i />
        FEATURED WORK & INNOVATIONS
      </div>

      <div className="section-header-row">
        <div>
          <span className="section-badge">
            <Sparkles size={13} /> SELECTED ENGINEERING WORKS
          </span>
          <h2 className="section-title">
            IDEAS INTO <br />
            <span className="gradient-text">CINEMATIC REALITY.</span>
          </h2>
        </div>
        <p className="section-subtitle">
          Engineered architectures combining cutting-edge Generative AI, Computer Vision, real-time analytics, and high-performance Web applications.
        </p>
      </div>

      {/* Featured Projects Interactive Showcase */}
      <div className="projects-grid">
        {projects.map((project, idx) => {
          const isSelected = activeProject === idx;

          return (
            <motion.article
              key={project.id}
              className={`cinematic-project-card ${isSelected ? 'active-card' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onMouseEnter={() => setActiveProject(idx)}
              style={{ '--project-accent': project.accentColor }}
            >
              <div className="project-top-meta">
                <span className="project-index">/{project.number}</span>
                <span className="project-badge" style={{ borderColor: project.accentColor }}>
                  <i style={{ background: project.accentColor }} />
                  {project.badge}
                </span>
              </div>

              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3 className="project-heading">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {/* Key Features Bullet List */}
                <div className="project-features-list">
                  <h4 className="features-label">
                    <Cpu size={13} /> Core Capabilities:
                  </h4>
                  <ul>
                    {project.features.slice(0, 4).map((feat, fIdx) => (
                      <li key={fIdx}>
                        <Check size={12} className="check-icon" style={{ color: project.accentColor }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="project-tech-tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="project-actions">
                {project.liveUrl && project.liveUrl !== '#contact' ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn primary-btn"
                  >
                    <span>LAUNCH DEMO</span>
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <a href="#contact" className="project-btn secondary-btn">
                    <span>INQUIRE ACCESS</span>
                    <ArrowUpRight size={15} />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn icon-btn"
                  aria-label={`GitHub repo for ${project.title}`}
                  title="View Source on GitHub"
                >
                  <Github size={16} />
                </a>
              </div>

              {/* Futuristic Glassmorphism Visual Preview Panel */}
              <div className="project-hologram-preview">
                <div className="holo-grid-lines" />
                <div className="holo-header">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                  <span className="holo-title">{project.title.toUpperCase()} // SYS.RENDER</span>
                </div>
                <div className="holo-content">
                  {/* Dynamic waveform / visualizer mock */}
                  <div className="holo-bars">
                    {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85].map((h, bIdx) => (
                      <div
                        key={bIdx}
                        className="bar"
                        style={{
                          height: `${h}%`,
                          backgroundColor: project.accentColor,
                          animationDelay: `${bIdx * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="holo-spec">
                    <span>STATUS: 200 OK</span>
                    <span>LATENCY: 18ms</span>
                    <span>AI PIPELINE: ONLINE</span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
