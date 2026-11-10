import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  User, 
  LogOut, 
  PlusCircle, 
  Bookmark, 
  FileText, 
  ShieldCheck, 
  Menu, 
  X,
  ChevronDown,
  Layers,
  Building
} from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout, switchRole, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const handleRoleSwitch = (role) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    if (role === 'candidate') navigate('/candidate/dashboard');
    else if (role === 'employer') navigate('/employer/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div style={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(37,99,235,0.3)'
            }}>
              <Briefcase size={22} />
            </div>
            <span>Job<span style={{ color: '#1e40af' }}>Connect</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="nav-links">
              <li>
                <NavLink to="/jobs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Find Jobs
                </NavLink>
              </li>

              {/* Conditional Links based on Role */}
              {isAuthenticated && currentUser?.role === 'candidate' && (
                <>
                  <li>
                    <NavLink to="/candidate/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/candidate/applications" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/candidate/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Saved Jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/candidate/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Profile
                    </NavLink>
                  </li>
                </>
              )}

              {isAuthenticated && currentUser?.role === 'employer' && (
                <>
                  <li>
                    <NavLink to="/employer/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/employer/post-job" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Post a Job
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/employer/applicants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Applicants
                    </NavLink>
                  </li>
                </>
              )}

              {isAuthenticated && currentUser?.role === 'admin' && (
                <>
                  <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                      Admin Console
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Quick Role Switcher Pill for Easy Testing */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                title="Switch role for testing"
              >
                <Layers size={14} />
                <span>Role: <strong>{currentUser?.role || 'Guest'}</strong></span>
                <ChevronDown size={14} />
              </button>

              {roleDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: 220,
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem',
                    zIndex: 200
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', padding: '0.3rem 0.5rem', textTransform: 'uppercase' }}>
                    Switch Demo Role
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('candidate')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: currentUser?.role === 'candidate' ? 'var(--primary-light)' : 'transparent',
                      color: currentUser?.role === 'candidate' ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <User size={15} /> Candidate (John Doe)
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('employer')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: currentUser?.role === 'employer' ? 'var(--primary-light)' : 'transparent',
                      color: currentUser?.role === 'employer' ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <Building size={15} /> Employer (TechCorp)
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: currentUser?.role === 'admin' ? 'var(--primary-light)' : 'transparent',
                      color: currentUser?.role === 'admin' ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <ShieldCheck size={15} /> Admin (Alex Vance)
                  </button>
                </div>
              )}
            </div>

            {/* Auth Actions */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  className="user-greeting"
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </span>
                  <span className="user-name-text" style={{ maxWidth: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline"
                  title="Logout"
                  style={{ padding: '0.4rem 0.65rem' }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-sm btn-outline">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-burger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '6px',
                borderRadius: '6px',
                color: 'var(--text-main)'
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '1rem 0 1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            <Link
              to="/jobs"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>

            {isAuthenticated && currentUser?.role === 'candidate' && (
              <>
                <Link to="/candidate/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/candidate/applications" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  My Applications
                </Link>
                <Link to="/candidate/saved" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Saved Jobs
                </Link>
                <Link to="/candidate/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Profile & Resume
                </Link>
              </>
            )}

            {isAuthenticated && currentUser?.role === 'employer' && (
              <>
                <Link to="/employer/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Employer Dashboard
                </Link>
                <Link to="/employer/post-job" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Post New Job
                </Link>
                <Link to="/employer/applicants" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Manage Applicants
                </Link>
              </>
            )}

            {isAuthenticated && currentUser?.role === 'admin' && (
              <Link to="/admin/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Admin Management Console
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-burger-btn {
            display: block !important;
          }
          .user-name-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;

