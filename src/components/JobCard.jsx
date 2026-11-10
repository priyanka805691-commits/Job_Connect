import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Bookmark, Calendar, ArrowRight, Building2, Briefcase } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from './StatusBadge';

const JobCard = ({ job, showStatus = false }) => {
  const { isJobSaved, toggleSaveJob } = useJobs();
  const { currentUser } = useAuth();
  const saved = isJobSaved(job.id);

  const formatSalary = (min, max, cur = 'USD') => {
    if (!min && !max) return 'Salary Negotiable';
    if (cur.includes('/hr')) {
      return `$${min} - $${max}/hr`;
    }
    const fMin = min ? `$${(min / 1000).toFixed(0)}k` : '';
    const fMax = max ? `$${(max / 1000).toFixed(0)}k` : '';
    return `${fMin} - ${fMax} / year`;
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diffDays = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="card card-clickable" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              style={{
                width: 48,
                height: 48,
                borderRadius: '10px',
                objectFit: 'cover',
                border: '1px solid var(--border)'
              }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '10px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}
            >
              {job.company ? job.company.charAt(0) : 'J'}
            </div>
          )}

          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
              <Link to={`/jobs/${job.id}`} style={{ color: 'inherit' }}>
                {job.title}
              </Link>
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{job.company}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} /> {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bookmark button */}
        {currentUser?.role !== 'employer' && currentUser?.role !== 'admin' && (
          <button
            onClick={() => toggleSaveJob(job.id)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: saved ? 'var(--primary-light)' : '#ffffff',
              color: saved ? 'var(--primary)' : 'var(--text-light)',
              transition: 'var(--transition)'
            }}
            title={saved ? 'Remove from saved' : 'Save job'}
            aria-label="Save job"
          >
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {/* Description Snippet */}
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        lineHeight: 1.5,
        marginBottom: '1.25rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {job.description}
      </p>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span className="badge badge-primary">{job.jobType}</span>
        {job.category && <span className="badge badge-secondary">{job.category}</span>}
        {job.experienceLevel && <span className="badge badge-info">{job.experienceLevel} Level</span>}
        {showStatus && <StatusBadge status={job.status} />}
      </div>

      {/* Footer Info & Action */}
      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.975rem' }}>
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} /> {timeAgo(job.postedAt)}
          </span>
          <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

