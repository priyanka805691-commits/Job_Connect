import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 2rem' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--danger-bg)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <ShieldAlert size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Access Restricted
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            You are logged in as a <strong>{currentUser.role}</strong>. This section is reserved for{' '}
            <strong>{allowedRoles.join(' or ')}</strong> roles only.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/" className="btn btn-outline">
              <ArrowLeft size={16} /> Return Home
            </Link>
            {currentUser.role === 'candidate' && (
              <Link to="/candidate/dashboard" className="btn btn-primary">
                My Dashboard
              </Link>
            )}
            {currentUser.role === 'employer' && (
              <Link to="/employer/dashboard" className="btn btn-primary">
                Employer Dashboard
              </Link>
            )}
            {currentUser.role === 'admin' && (
              <Link to="/admin/dashboard" className="btn btn-primary">
                Admin Console
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

