import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Plus, 
  X, 
  Download, 
  GraduationCap,
  Sparkles
} from 'lucide-react';

const CandidateProfile = () => {
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [title, setTitle] = useState(currentUser?.title || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [experienceYears, setExperienceYears] = useState(currentUser?.experienceYears || 3);
  const [education, setEducation] = useState(currentUser?.education || '');

  // Skills chip management
  const [skills, setSkills] = useState(currentUser?.skills || ['React', 'Node.js', 'JavaScript']);
  const [skillInput, setSkillInput] = useState('');

  // Resume state
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || '');
  const [resumeFile, setResumeFile] = useState(null);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleRemoveResume = () => {
    setResumeName('');
    setResumeFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      location,
      title,
      bio,
      skills,
      experienceYears: Number(experienceYears),
      education,
      resumeName
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Candidate Profile & Resume
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Keep your credentials up to date to stand out to verified hiring teams
          </p>
        </div>

        {savedSuccess && (
          <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Profile Updated Successfully!</strong> All your changes and resume updates have been saved.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }} className="candidate-profile-layout">
            {/* Left Column: Personal & Professional Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Basic Info Card */}
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                  Personal Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon-left" />
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (Read-only)</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon-left" />
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                        style={{ background: 'var(--bg-muted)' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon-left" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location (City, State / Country)</label>
                    <div className="input-with-icon">
                      <MapPin size={16} className="input-icon-left" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. San Francisco, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Credentials Card */}
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                  Professional Background
                </h3>

                <div className="form-group">
                  <label className="form-label">Professional Headline / Role Title</label>
                  <div className="input-with-icon">
                    <Briefcase size={16} className="input-icon-left" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Senior Full Stack React & Node Developer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="40"
                      className="form-control"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Highest Education</label>
                    <div className="input-with-icon">
                      <GraduationCap size={16} className="input-icon-left" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. B.S. in Computer Science"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bio & Executive Summary</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Describe your technical expertise, notable project impacts, and what roles you are seeking..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              {/* Skills Card */}
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Core Skills & Technologies
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Tag your top technical proficiencies so employers can match your profile to openings.
                </p>

                {/* Add Skill Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a skill (e.g. TypeScript, Docker, GraphQL)..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(e);
                      }
                    }}
                  />
                  <button type="button" onClick={handleAddSkill} className="btn btn-secondary">
                    <Plus size={16} /> Add
                  </button>
                </div>

                {/* Skill Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {skill}
                      <X
                        size={14}
                        style={{ cursor: 'pointer', opacity: 0.75 }}
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      No skills added yet. Type a skill above and press Enter.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Resume Card & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Resume Document
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                  Your primary resume used for 1-click job applications.
                </p>

                {resumeName ? (
                  <div
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '8px',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <FileText size={24} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {resumeName}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.1rem' }}>
                          PDF Document • Attached to profile
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <button
                        type="button"
                        onClick={() => alert(`Simulating download of ${resumeName}`)}
                        className="btn btn-sm btn-outline"
                        style={{ flex: 1 }}
                      >
                        <Download size={14} /> Download
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveResume}
                        className="btn btn-sm btn-danger-outline"
                        title="Remove resume"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      border: '2px dashed var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      background: 'var(--bg-subtle)'
                    }}
                  >
                    <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
                    <p style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-main)' }}>
                      Upload your latest Resume
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                      Supported: PDF, DOC, DOCX (Max 10MB)
                    </p>
                    <label
                      htmlFor="profile-resume-input"
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '1rem', cursor: 'pointer' }}
                    >
                      <Upload size={14} /> Select File
                    </label>
                  </div>
                )}

                <input
                  type="file"
                  id="profile-resume-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                {resumeName && (
                  <label
                    htmlFor="profile-resume-input"
                    className="btn btn-sm btn-outline"
                    style={{ marginTop: '0.75rem', width: '100%', cursor: 'pointer' }}
                  >
                    <Upload size={14} /> Replace with New File
                  </label>
                )}
              </div>

              {/* Save Card */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <CheckCircle2 size={18} /> Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .candidate-profile-layout {
            grid-template-columns: 1fr !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidateProfile;

