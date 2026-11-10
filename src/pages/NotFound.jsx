import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1, marginBottom: '1rem', opacity: 0.85 }}>
          404
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page or career listing you are looking for has been moved, renamed, or no longer exists.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link to="/jobs" className="btn btn-outline">
            <Search size={16} /> Browse All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

