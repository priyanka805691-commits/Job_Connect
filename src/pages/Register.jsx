import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, UserCheck, Building, Mail, Lock, User, MapPin, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('candidate'); // 'candidate' or 'employer'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');

  // Employer specifics
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('10-50 employees');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        location
      };

      if (role === 'candidate') {
        payload.title = title || 'Professional';
        payload.skills = skills ? skills.split(',').map((s) => s.trim()) : [];
        payload.resumeName = null;
      } else {
        payload.companyName = companyName || name;
        payload.companyIndustry = companyIndustry || 'Technology';
        payload.companyWebsite = companyWebsite || '';
        payload.companySize = companySize;
        payload.companyLogo = '';
      }

      register(payload);

      if (role === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 1rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 540 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              borderRadius: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 6px 16px rgba(37,99,235,0.25)',
              marginBottom: '1rem'
            }}
          >
            <Briefcase size={28} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Create Your JobConnect Account
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            Join thousands of professionals and high-growth hiring teams
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '2.25rem' }}>
          {/* Role Selection Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <button
              type="button"
              onClick={() => setRole('candidate')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${role === 'candidate' ? 'var(--primary)' : 'var(--border)'}`,
                background: role === 'candidate' ? 'var(--primary-light)' : '#ffffff',
                color: role === 'candidate' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.925rem',
                transition: 'var(--transition)'
              }}
            >
              <UserCheck size={18} /> Candidate / Job Seeker
            </button>

            <button
              type="button"
              onClick={() => setRole('employer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${role === 'employer' ? 'var(--primary)' : 'var(--border)'}`,
                background: role === 'employer' ? 'var(--primary-light)' : '#ffffff',
                color: role === 'employer' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.925rem',
                transition: 'var(--transition)'
              }}
            >
              <Building size={18} /> Employer / Hiring Team
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{role === 'employer' ? 'Contact Full Name' : 'Full Name'}</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon-left" />
                <input
                  type="text"
                  className="form-control"
                  placeholder={role === 'employer' ? 'e.g. Sarah Jenkins' : 'e.g. John Doe'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{role === 'employer' ? 'Work Email Address' : 'Email Address'}</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon-left" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Create Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Candidate Specific Fields */}
            {role === 'candidate' && (
              <>
                <div className="form-group">
                  <label className="form-label">Professional Headline / Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Full Stack React & Node Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Skills (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, TypeScript, MongoDB"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Employer Specific Fields */}
            {role === 'employer' && (
              <>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <div className="input-with-icon">
                    <Building size={18} className="input-icon-left" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. TechCorp Solutions"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Software, Fintech"
                      value={companyIndustry}
                      onChange={(e) => setCompanyIndustry(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Size</label>
                    <select
                      className="form-control"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="10-50 employees">10-50 employees</option>
                      <option value="50-200 employees">50-200 employees</option>
                      <option value="200-1000 employees">200-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Company Website URL</label>
                  <div className="input-with-icon">
                    <Globe size={18} className="input-icon-left" />
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://company.example.com"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Location</label>
              <div className="input-with-icon">
                <MapPin size={18} className="input-icon-left" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.75rem' }}
            >
              {loading ? 'Creating Account...' : `Register as ${role === 'employer' ? 'Employer' : 'Candidate'}`}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign In Here <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

