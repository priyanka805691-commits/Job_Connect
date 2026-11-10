import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Mail, MapPin, Phone, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Briefcase size={18} />
              </div>
              <span>Job<span style={{ color: '#1e40af' }}>Connect</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: 320 }}>
              Connecting high-caliber talent with industry-leading companies worldwide. Discover your next milestone career opportunity today.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Github size={18} />
              </div>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div>
            <h4 className="footer-title">For Candidates</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">Explore All Jobs</Link></li>
              <li><Link to="/candidate/dashboard">Candidate Dashboard</Link></li>
              <li><Link to="/candidate/profile">Build Profile & Resume</Link></li>
              <li><Link to="/candidate/saved">Saved Bookmarks</Link></li>
              <li><Link to="/candidate/applications">Application Tracker</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="footer-title">For Employers</h4>
            <ul className="footer-links">
              <li><Link to="/employer/post-job">Post New Job Opening</Link></li>
              <li><Link to="/employer/dashboard">Employer Dashboard</Link></li>
              <li><Link to="/employer/applicants">Review Applicants</Link></li>
              <li><Link to="/pricing">Hiring Solutions</Link></li>
              <li><Link to="/resources">Talent Playbook</Link></li>
            </ul>
          </div>

          {/* Platform / Contact */}
          <div>
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-links" style={{ gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--primary)" />
                <span>100 Innovation Way, Silicon Valley, CA</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Phone size={16} color="var(--primary)" />
                <span>+1 (800) 555-JOBCONNECT</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Mail size={16} color="var(--primary)" />
                <span>support@jobconnect.portal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} JobConnect Inc. All rights reserved. Built with React & Node.js.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link>
            <Link to="/security" style={{ color: 'var(--text-muted)' }}>Trust & Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

