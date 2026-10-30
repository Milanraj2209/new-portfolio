import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Server, BrainCircuit, Wrench, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function SkillsSection() {
  const { data } = usePortfolio();
  const { skills } = data;
  const [activeTab, setActiveTab] = useState('all');


  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'frontend', label: 'Frontend', icon: Code2 },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'ai_ml', label: 'AI & Machine Learning', icon: BrainCircuit },
    { id: 'tools', label: 'Tools & Cloud', icon: Wrench }
  ];

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        ...skills.frontend.map((s) => ({ ...s, group: 'Frontend' })),
        ...skills.backend.map((s) => ({ ...s, group: 'Backend' })),
        ...skills.ai_ml.map((s) => ({ ...s, group: 'AI & ML' })),
        ...skills.tools.map((s) => ({ ...s, group: 'Tools' }))
      ];
    }
    return (skills[activeTab] || []).map((s) => ({
      ...s,
      group: categories.find((c) => c.id === activeTab)?.label || ''
    }));
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section className="section skills-section section-shell" id="skills">
      <div className="section-label">
        <span>02</span>
        <i />
        TECHNICAL ARSENAL & TOOLKIT
      </div>

      <div className="section-header-row">
        <div>
          <span className="section-badge">
            <Sparkles size={13} /> CAPABILITIES MATRIX
          </span>
          <h2 className="section-title">
            ENGINEERING <br />
            <span className="gradient-text">THE FUTURE STACK.</span>
          </h2>
        </div>
        <p className="section-subtitle">
          An evolving, battle-tested repertoire spanning deep learning algorithms, microservices, reactive frontend architectures, and 3D creative technology.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="skills-tabs-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`skills-tab-btn ${isActive ? 'active-tab' : ''}`}
            >
              <Icon size={15} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating 3D Interactive Technology Cards */}
      <div className="skills-interactive-grid">
        {displayedSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card-3d"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ '--skill-color': skill.color }}
          >
            <div className="skill-card-inner">
              <div className="skill-icon-wrap" style={{ borderColor: `${skill.color}40` }}>
                <span className="skill-emoji">{skill.icon}</span>
              </div>

              <div className="skill-info">
                <div className="skill-meta">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-group">{skill.group}</span>
                </div>

                {/* Animated Level Bar */}
                <div className="skill-meter-wrap">
                  <div className="skill-meter-bar">
                    <motion.div
                      className="skill-meter-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 }}
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
              </div>

              {/* Glowing Corner Accent */}
              <div className="skill-card-glow" style={{ background: skill.color }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
