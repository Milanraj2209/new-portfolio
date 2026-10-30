import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, MessageSquare, Check, Sparkles, User, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending with high-polish feedback & celebratory confetti
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#a855f7', '#38bdf8', '#ec4899', '#ffffff']
      });
    }, 600);
  };

  return (
    <section className="section contact-section section-shell" id="contact">
      <div className="section-label">
        <span>05</span>
        <i />
        TRANSMISSION & COLLABORATION
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Column: Direct Info & Futuristic Status Orb */}
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Sparkles size={13} /> INITIATE DIALOGUE
            </span>
            <h2 className="contact-main-heading">
              LET'S CREATE <br />
              <span className="gradient-text">SOMETHING AMAZING.</span>
            </h2>

            <p className="contact-intro-text">
              Have a cutting-edge vision, an AI engineering initiative, or a complex web application waiting to be built? I'm ready to turn your ideas into functional, beautifully engineered digital experiences.
            </p>

            {/* Live Status indicator card */}
            <div className="contact-status-card">
              <div className="pulse-signal">
                <span className="pulse-dot" />
                <span className="pulse-ring" />
              </div>
              <div className="status-text">
                <strong>{profile.status}</strong>
                <span>Open for select full-stack, AI, and creative contracts</span>
              </div>
            </div>

            {/* Quick Connect details */}
            <div className="contact-quick-links">
              <a href={profile.socials.email} className="quick-item">
                <div className="quick-icon">
                  <Mail size={16} />
                </div>
                <div>
                  <small>PRIMARY DIRECT INBOX</small>
                  <span>{profile.email}</span>
                </div>
              </a>

              <div className="quick-item">
                <div className="quick-icon">
                  <User size={16} />
                </div>
                <div>
                  <small>GEOGRAPHIC LOCATION</small>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="contact-socials-row">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="social-btn"
                aria-label="Email Milan"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-tech Glassmorphism Contact Form */}
          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-glow-backdrop" />

            {submitted ? (
              <div className="form-success-box">
                <div className="success-icon-wrap">
                  <Check size={32} />
                </div>
                <h3>MESSAGE SENT SUCCESSFULLY!</h3>
                <p>
                  Thank you for reaching out, <strong>{formData.name || 'friend'}</strong>. I will review your note and respond within 24 hours.
                </p>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="futuristic-form">
                <div className="form-header">
                  <div className="window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="window-label">TERMINAL TRANSMISSION // SECURE CHANNEL</span>
                </div>

                <div className="input-group">
                  <label htmlFor="name">
                    <User size={13} /> YOUR NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                    <Mail size={13} /> YOUR EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="subject">
                    <FileText size={13} /> SUBJECT
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="Project Inquiry, AI Architecture, or Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">
                    <MessageSquare size={13} /> MESSAGE DETAILS
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Describe your vision, scope, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button button-primary submit-btn"
                >
                  {loading ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
