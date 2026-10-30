import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function ExperienceSection() {
  const { data } = usePortfolio();
  const { experience } = data;


  return (
    <section className="section experience-section section-shell" id="experience">
      <div className="section-label">
        <span>04</span>
        <i />
        CAREER TRACK & PROFESSIONAL JOURNEY
      </div>

      <div className="section-header-row">
        <div>
          <span className="section-badge">
            <Sparkles size={13} /> PROFESSIONAL TRACK RECORD
          </span>
          <h2 className="section-title">
            WHERE I'VE BEEN <br />
            <span className="gradient-text">CREATING VALUE.</span>
          </h2>
        </div>
        <p className="section-subtitle">
          Real-world industry impact, brand protection, digital governance, and independent innovation in emerging technology domains.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line-glow" />

        {experience.map((item, idx) => (
          <motion.article
            key={idx}
            className="timeline-card-wrapper"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Timeline Marker Pulse */}
            <div className="timeline-dot-box">
              <span className="timeline-dot-ring" />
              <span className="timeline-dot-core" />
            </div>

            <div className="timeline-card-content">
              <div className="timeline-top-bar">
                <span className="timeline-period-badge">
                  <Calendar size={13} /> {item.period}
                </span>
                <span className="timeline-location-badge">
                  <MapPin size={13} /> {item.location}
                </span>
              </div>

              <div className="timeline-title-group">
                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-org">
                  <Building size={14} />
                  <span>{item.organization}</span>
                </h4>
              </div>

              <p className="timeline-desc">{item.description}</p>

              {item.achievements && (
                <div className="timeline-achievements">
                  <span className="achievements-heading">
                    <TrendingUp size={13} /> Key Contributions & Outcomes:
                  </span>
                  <ul>
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>
                        <CheckCircle2 size={13} className="ach-icon" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
