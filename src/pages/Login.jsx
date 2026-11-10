import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Mail, Lock, LogIn, ArrowRight, UserCheck, ShieldCheck, Building } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = login(email, password);
      // Route based on role
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'candidate') {
        navigate('/candidate/dashboard');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div style={{ padding: '4rem 1rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Brand Header */}
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Welcome Back to JobConnect
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            Sign in to access your dashboard, jobs, and applications
          </p>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: '2.25rem' }}>
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon-left" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset simulation: Please use default password123 or select a demo account below.'); }} style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Forgot?
                </a>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
            >
              <LogIn size={18} /> {loading ? 'Signing In...' : 'Sign In to Account'}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.75rem', textAlign: 'center' }}>
              Quick 1-Click Demo Login Fill
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleDemoFill('john@example.com', 'password123')}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
              >
                <UserCheck size={14} color="var(--primary)" />
                <span>Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('recruiter@techcorp.com', 'password123')}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
              >
                <Building size={14} color="#0ea5e9" />
                <span>Employer</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin@jobconnect.com', 'admin123')}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Link to Register */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create an Account <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

