import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { FileText, Send, Building, Calendar, ArrowRight, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const Applications = () => {
  const { currentUser } = useAuth();
  const { applications } = useJobs();
  const [statusFilter, setStatusFilter] = useState('all');

  const myApplications = applications.filter((app) => app.candidateId === currentUser?.id);

  const filteredApps = myApplications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  const filterTabs = [
    { key: 'all', label: 'All Applications', count: myApplications.length },
    { key: 'pending', label: 'Pending', count: myApplications.filter((a) => a.status === 'pending').length },
    { key: 'reviewed', label: 'Reviewed', count: myApplications.filter((a) => a.status === 'reviewed').length },
    { key: 'shortlisted', label: 'Shortlisted', count: myApplications.filter((a) => ['shortlisted', 'interviewing'].includes(a.status)).length },
    { key: 'accepted', label: 'Accepted', count: myApplications.filter((a) => a.status === 'accepted').length },
    { key: 'rejected', label: 'Archived / Rejected', count: myApplications.filter((a) => a.status === 'rejected').length }
  ];

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            My Job Applications
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Monitor real-time progress and notes from employers on your submitted applications
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: statusFilter === tab.key ? 'var(--primary)' : 'var(--border)',
                background: statusFilter === tab.key ? 'var(--primary-light)' : '#ffffff',
                color: statusFilter === tab.key ? 'var(--primary)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)'
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  background: statusFilter === tab.key ? 'var(--primary)' : 'var(--bg-muted)',
                  color: statusFilter === tab.key ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <FileText size={48} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No applications in this category
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
              {statusFilter === 'all'
                ? "You haven't applied to any jobs yet. Browse available listings and submit your first application!"
                : `There are currently no applications with status "${statusFilter}".`}
            </p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Open Positions
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredApps.map((app) => (
              <div key={app.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      <Link to={`/jobs/${app.jobId}`} style={{ color: 'inherit' }}>
                        {app.jobTitle}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building size={14} /> {app.company}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <StatusBadge status={app.status} />
                    <Link to={`/jobs/${app.jobId}`} className="btn btn-sm btn-outline">
                      View Posting <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Cover Letter Excerpt */}
                {app.coverNote && (
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Cover Note:</strong> "{app.coverNote}"
                  </div>
                )}

                {/* Employer Notes if any */}
                {app.employerNotes && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', color: '#1e40af', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', border: '1px solid var(--primary-border)' }}>
                    <MessageSquare size={16} />
                    <span>
                      <strong>Employer Feedback:</strong> {app.employerNotes}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;

