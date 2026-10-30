import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  RotateCcw,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Check,
  User,
  Sliders,
  Briefcase,
  Layers,
  Sparkles,
  Download,
  Upload,
  Wrench,
  Code2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.jsx';


export default function AdminModal() {
  const {
    data,
    updateData,
    resetToDefault,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local draft state for editing
  const [formData, setFormData] = useState(data);

  // Sync draft when opened
  React.useEffect(() => {
    if (isAdminOpen) {
      setFormData(data);
    }
  }, [isAdminOpen, data]);

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleSaveAll = () => {
    updateData(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2200);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'portfolioData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper updates for nested fields
  const updateProfile = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: val
      }
    }));
  };

  const updateSocials = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        socials: {
          ...prev.profile.socials,
          [field]: val
        }
      }
    }));
  };

  const updateProject = (index, field, val) => {
    setFormData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: val };
      return { ...prev, projects };
    });
  };

  const updateProjectTech = (pIdx, techString) => {
    const tags = techString.split(',').map((t) => t.trim()).filter(Boolean);
    updateProject(pIdx, 'techStack', tags);
  };

  const updateProjectFeatures = (pIdx, featString) => {
    const feats = featString.split('\n').map((f) => f.trim()).filter(Boolean);
    updateProject(pIdx, 'features', feats);
  };

  const addProject = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      number: `0${formData.projects.length + 1}`,
      title: 'New Featured Project',
      category: 'AI / Web Application',
      accentColor: '#38bdf8',
      badge: 'Active Work',
      description: 'Enter project description and background here.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      techStack: ['React', 'Python', 'FastAPI'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/milanraj',
      featured: true
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, val) => {
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: val };
      return { ...prev, experience };
    });
  };

  // Skill management helper methods
  const updateSkill = (category, index, field, val) => {
    setFormData((prev) => {
      const catSkills = [...(prev.skills[category] || [])];
      catSkills[index] = { ...catSkills[index], [field]: val };
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: catSkills
        }
      };
    });
  };

  const addSkill = (category) => {
    const newSkill = {
      name: 'New Technology',
      level: 85,
      icon: '⚡',
      color: '#38bdf8'
    };
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), newSkill]
      }
    }));
  };

  const removeSkill = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };


  return (
    <div className="admin-overlay" onClick={() => setIsAdminOpen(false)}>
      <motion.div
        className="admin-modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Modal Header */}
        <div className="admin-header">
          <div className="admin-title-wrap">
            <span className="admin-badge">
              <Sliders size={13} /> LIVE PORTFOLIO CMS
            </span>
            <h2>Admin Control Panel</h2>
            <p>Modify, add, or update any section in real time.</p>
          </div>

          <div className="admin-header-actions">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  className="admin-btn save-btn"
                  onClick={handleSaveAll}
                >
                  {savedSuccess ? (
                    <>
                      <Check size={14} /> SAVED!
                    </>
                  ) : (
                    <>
                      <Save size={14} /> SAVE CHANGES
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="admin-btn export-btn"
                  onClick={handleExportJSON}
                  title="Download Backup JSON"
                >
                  <Download size={14} /> EXPORT
                </button>
                <button
                  type="button"
                  className="admin-btn reset-btn"
                  onClick={() => {
                    if (confirm('Reset all changes back to default portfolio state?')) {
                      resetToDefault();
                      setFormData(data);
                    }
                  }}
                  title="Reset to initial data"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  className="admin-btn lock-btn"
                  onClick={logoutAdmin}
                  title="Log Out"
                >
                  <Unlock size={14} />
                </button>
              </>
            )}

            <button
              type="button"
              className="admin-close-btn"
              onClick={() => setIsAdminOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Authentication Wall */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="admin-auth-box">
            <div className="auth-lock-icon">
              <Lock size={32} />
            </div>
            <h3>Admin Authentication Required</h3>
            <p>Enter the admin passcode to access the live portfolio editor.</p>
            <div className="auth-input-row">
              <input
                type="password"
                autoFocus
                placeholder="Enter passcode (default: milan2026)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
              />
              <button type="submit" className="button button-primary">
                UNLOCK CMS
              </button>
            </div>
            {authError && (
              <span className="auth-err-msg">
                Incorrect passcode. Try <code>milan2026</code>
              </span>
            )}
          </form>
        ) : (
          /* Authenticated Tab Content */
          <div className="admin-body">
            {/* Nav Tabs */}
            <div className="admin-tabs-nav">
              <button
                className={`admin-tab-item ${activeTab === 'hero' ? 'active' : ''}`}
                onClick={() => setActiveTab('hero')}
              >
                <Sparkles size={14} /> HERO & BIO
              </button>
              <button
                className={`admin-tab-item ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <Wrench size={14} /> 02 TECHNICAL SKILLS
              </button>
              <button
                className={`admin-tab-item ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <Layers size={14} /> PROJECTS ({formData.projects.length})
              </button>
              <button
                className={`admin-tab-item ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <Briefcase size={14} /> EXPERIENCE
              </button>
              <button
                className={`admin-tab-item ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <User size={14} /> CONTACT & SOCIALS
              </button>
            </div>


            <div className="admin-tab-panel">
              {/* TAB 1: HERO & ABOUT */}
              {activeTab === 'hero' && (
                <div className="admin-form-grid">
                  <div className="form-group-full">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Hero Tagline / Heading</label>
                    <input
                      type="text"
                      value={formData.profile.title}
                      onChange={(e) => updateProfile('title', e.target.value)}
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Roles Banner (Sub-headline)</label>
                    <input
                      type="text"
                      value={formData.profile.roleString}
                      onChange={(e) => updateProfile('roleString', e.target.value)}
                    />
                  </div>

                  <div className="form-group-half">
                    <label>Availability / Status Tag</label>
                    <input
                      type="text"
                      value={formData.profile.status}
                      onChange={(e) => updateProfile('status', e.target.value)}
                    />
                  </div>

                  <div className="form-group-half">
                    <label>Location</label>
                    <input
                      type="text"
                      value={formData.profile.location}
                      onChange={(e) => updateProfile('location', e.target.value)}
                    />
                  </div>

                  <div className="form-group-full">
                    <label>About Me Lead Bio</label>
                    <textarea
                      rows={3}
                      value={formData.profile.bio}
                      onChange={(e) => updateProfile('bio', e.target.value)}
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Extended Philosophy</label>
                    <textarea
                      rows={3}
                      value={formData.profile.extendedBio}
                      onChange={(e) => updateProfile('extendedBio', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: TECHNICAL ARSENAL & SKILLS TOOLKIT */}
              {activeTab === 'skills' && (
                <div className="admin-skills-editor">
                  {[
                    { key: 'frontend', title: 'Frontend Technologies', icon: '⚛️' },
                    { key: 'backend', title: 'Backend & Server', icon: '⚡' },
                    { key: 'ai_ml', title: 'AI & Machine Learning', icon: '🧠' },
                    { key: 'tools', title: 'Tools & Cloud', icon: '☁️' }
                  ].map((category) => (
                    <div key={category.key} className="admin-project-editor-card">
                      <div className="proj-card-top">
                        <span className="proj-idx">
                          {category.icon} {category.title.toUpperCase()} (
                          {formData.skills[category.key]?.length || 0})
                        </span>
                        <button
                          type="button"
                          className="admin-btn save-btn"
                          onClick={() => addSkill(category.key)}
                          style={{ padding: '5px 12px', fontSize: '0.72rem' }}
                        >
                          <Plus size={13} /> Add Skill
                        </button>
                      </div>

                      <div className="admin-skills-grid">
                        {(formData.skills[category.key] || []).map((skill, sIdx) => (
                          <div key={sIdx} className="admin-skill-item-row">
                            {/* Emoji Icon */}
                            <input
                              type="text"
                              className="skill-input-icon"
                              value={skill.icon || '⚡'}
                              onChange={(e) =>
                                updateSkill(category.key, sIdx, 'icon', e.target.value)
                              }
                              title="Emoji Icon"
                            />

                            {/* Name */}
                            <input
                              type="text"
                              className="skill-input-name"
                              value={skill.name}
                              placeholder="Skill name"
                              onChange={(e) =>
                                updateSkill(category.key, sIdx, 'name', e.target.value)
                              }
                            />

                            {/* Proficiency Level % */}
                            <div className="skill-input-level-wrap">
                              <input
                                type="number"
                                min="10"
                                max="100"
                                value={skill.level}
                                onChange={(e) =>
                                  updateSkill(
                                    category.key,
                                    sIdx,
                                    'level',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                              />
                              <span>%</span>
                            </div>

                            {/* Color Picker */}
                            <input
                              type="color"
                              className="skill-input-color"
                              value={skill.color || '#38bdf8'}
                              onChange={(e) =>
                                updateSkill(category.key, sIdx, 'color', e.target.value)
                              }
                              title="Skill Accent Color"
                            />

                            {/* Delete Button */}
                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() => removeSkill(category.key, sIdx)}
                              title="Delete skill"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: PROJECTS */}
              {activeTab === 'projects' && (

                <div className="admin-projects-list">
                  <div className="admin-section-cta">
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={addProject}
                    >
                      <Plus size={15} /> ADD NEW PROJECT
                    </button>
                  </div>

                  {formData.projects.map((proj, pIdx) => (
                    <div key={proj.id || pIdx} className="admin-project-editor-card">
                      <div className="proj-card-top">
                        <span className="proj-idx">PROJECT #{pIdx + 1}</span>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeProject(pIdx)}
                          title="Remove Project"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>

                      <div className="admin-form-grid">
                        <div className="form-group-half">
                          <label>Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(pIdx, 'title', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Category / Domain</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => updateProject(pIdx, 'category', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Badge Label</label>
                          <input
                            type="text"
                            value={proj.badge}
                            onChange={(e) => updateProject(pIdx, 'badge', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Accent Glow Color (Hex)</label>
                          <div className="color-picker-row">
                            <input
                              type="color"
                              value={proj.accentColor || '#38bdf8'}
                              onChange={(e) => updateProject(pIdx, 'accentColor', e.target.value)}
                            />
                            <input
                              type="text"
                              value={proj.accentColor}
                              onChange={(e) => updateProject(pIdx, 'accentColor', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group-full">
                          <label>Description</label>
                          <textarea
                            rows={3}
                            value={proj.description}
                            onChange={(e) => updateProject(pIdx, 'description', e.target.value)}
                          />
                        </div>

                        <div className="form-group-full">
                          <label>Core Capabilities (One per line)</label>
                          <textarea
                            rows={3}
                            value={proj.features.join('\n')}
                            onChange={(e) => updateProjectFeatures(pIdx, e.target.value)}
                          />
                        </div>

                        <div className="form-group-full">
                          <label>Tech Stack Tags (Comma separated)</label>
                          <input
                            type="text"
                            value={proj.techStack.join(', ')}
                            onChange={(e) => updateProjectTech(pIdx, e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Live Demo URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl}
                            onChange={(e) => updateProject(pIdx, 'liveUrl', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>GitHub Repository URL</label>
                          <input
                            type="text"
                            value={proj.githubUrl}
                            onChange={(e) => updateProject(pIdx, 'githubUrl', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="admin-experience-list">
                  {formData.experience.map((exp, expIdx) => (
                    <div key={expIdx} className="admin-project-editor-card">
                      <div className="proj-card-top">
                        <span className="proj-idx">EXPERIENCE RECORD #{expIdx + 1}</span>
                      </div>

                      <div className="admin-form-grid">
                        <div className="form-group-half">
                          <label>Role / Position</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(expIdx, 'role', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Organization / University</label>
                          <input
                            type="text"
                            value={exp.organization}
                            onChange={(e) => updateExperience(expIdx, 'organization', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Period / Duration</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperience(expIdx, 'period', e.target.value)}
                          />
                        </div>

                        <div className="form-group-half">
                          <label>Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(expIdx, 'location', e.target.value)}
                          />
                        </div>

                        <div className="form-group-full">
                          <label>Role Summary & Impact</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(expIdx, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: CONTACT & SOCIALS */}
              {activeTab === 'socials' && (
                <div className="admin-form-grid">
                  <div className="form-group-half">
                    <label>Primary Email Address</label>
                    <input
                      type="email"
                      value={formData.profile.email}
                      onChange={(e) => {
                        updateProfile('email', e.target.value);
                        updateSocials('email', `mailto:${e.target.value}`);
                      }}
                    />
                  </div>

                  <div className="form-group-half">
                    <label>Resume Download URL (e.g. /resume.pdf)</label>
                    <input
                      type="text"
                      value={formData.profile.resumeUrl}
                      onChange={(e) => updateProfile('resumeUrl', e.target.value)}
                    />
                  </div>

                  <div className="form-group-half">
                    <label>GitHub Profile URL</label>
                    <input
                      type="text"
                      value={formData.profile.socials.github}
                      onChange={(e) => updateSocials('github', e.target.value)}
                    />
                  </div>

                  <div className="form-group-half">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={formData.profile.socials.linkedin}
                      onChange={(e) => updateSocials('linkedin', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
