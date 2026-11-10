import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  FileText, 
  Bookmark, 
  Send, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  MapPin, 
  User, 
  Briefcase,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import JobCard from '../components/JobCard';

const CandidateDashboard = () => {
  const { currentUser } = useAuth();
  const { applications, savedJobIds, jobs } = useJobs();

  // Filter candidate applications
  const myApplications = applications.filter((app) => app.candidateId === currentUser?.id);
  const mySavedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  // Compute metrics
  const totalApps = myApplications.length;
  const inReviewCount = myApplications.filter((a) => ['pending', 'reviewed'].includes(a.status)).length;
  const shortlistedCount = myApplications.filter((a) => ['shortlisted', 'interviewing', 'accepted'].includes(a.status)).length;
  const savedCount = mySavedJobs.length;

  // Profile completeness score
  let completeness = 40;
  if (currentUser?.title) completeness += 15;
  if (currentUser?.skills?.length > 0) completeness += 15;
  if (currentUser?.resumeName) completeness += 20;
  if (currentUser?.bio) completeness += 10;

  // Recommended jobs based on candidate skills or category
  const recommendedJobs = jobs
    .filter((j) => j.status === 'approved' && !myApplications.some((a) => a.jobId === j.id))
    .slice(0, 3);

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #1e40af, #2563eb)',
            color: '#ffffff',
            padding: '2rem',
            marginBottom: '2rem',
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>
              Candidate Control Center
            </span>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.75rem' }}>
              Welcome back, {currentUser?.name}!
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.25rem', fontSize: '0.95rem' }}>
              {currentUser?.title || 'Job Seeker'} • {currentUser?.location || 'San Francisco, CA'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/candidate/profile" className="btn btn-secondary" style={{ background: '#ffffff', color: 'var(--primary)', fontWeight: 600 }}>
              <User size={16} /> Edit Profile & Resume
            </Link>
            <Link to="/jobs" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}>
              <Briefcase size={16} /> Browse New Jobs
            </Link>
          </div>
        </div>

        {/* Profile Completeness Alert if resume missing */}
        {!currentUser?.resumeName && (
          <div className="alert alert-warning" style={{ marginBottom: '2rem' }}>
            <AlertCircle size={20} />
            <div style={{ flex: 1 }}>
              <strong>Resume Missing:</strong> You haven't uploaded your resume yet. Employers are 4x more likely to shortlist candidates with an attached resume.
            </div>
            <Link to="/candidate/profile" className="btn btn-sm btn-primary">
              Upload Resume
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Send size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Applied</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {totalApps}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Under Review</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {inReviewCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Shortlisted / Active</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {shortlistedCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <Bookmark size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Saved Bookmarks</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {savedCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Dashboard 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2rem' }} className="candidate-dash-grid">
          {/* Left Column: Recent Applications */}
          <div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Recent Applications
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Track hiring stage progression
                  </p>
                </div>
                <Link to="/candidate/applications" className="btn btn-sm btn-outline">
                  View All ({myApplications.length})
                </Link>
              </div>

              {myApplications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <Send size={36} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.925rem' }}>
                    You haven't submitted any job applications yet.
                  </p>
                  <Link to="/jobs" className="btn btn-primary btn-sm">
                    Find and Apply for Jobs
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Job Title & Company</th>
                        <th>Applied On</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myApplications.slice(0, 5).map((app) => (
                        <tr key={app.id}>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                              {app.jobTitle}
                            </div>
                            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                              {app.company}
                            </div>
                          </td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </td>
                          <td>
                            <StatusBadge status={app.status} />
                          </td>
                          <td>
                            <Link to={`/jobs/${app.jobId}`} className="btn btn-sm btn-outline">
                              View Job
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Profile Summary & Recommended */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Profile Overview Card */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                Profile Overview
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <span>Profile Strength</span>
                  <span style={{ color: 'var(--primary)' }}>{completeness}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${completeness}%`,
                      height: '100%',
                      background: completeness > 70 ? 'var(--success)' : 'var(--primary)',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Resume:</span>
                  <span style={{ fontWeight: 600, color: currentUser?.resumeName ? 'var(--success-text)' : 'var(--danger-text)' }}>
                    {currentUser?.resumeName || 'Not uploaded'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Skills Tagged:</span>
                  <span style={{ fontWeight: 600 }}>{currentUser?.skills?.length || 0} skills</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                  <span style={{ fontWeight: 600 }}>{currentUser?.location || 'Not set'}</span>
                </div>
              </div>

              <Link to="/candidate/profile" className="btn btn-outline" style={{ width: '100%', marginTop: '1.25rem' }}>
                Manage Profile & Resume
              </Link>
            </div>

            {/* Quick Recommended Jobs */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Recommended Openings
                </h3>
                <Link to="/jobs" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Explore All
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <Link to={`/jobs/${job.id}`} style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>
                        {job.title}
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {job.company} • {job.location}
                      </div>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
                      Apply
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .candidate-dash-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidateDashboard;

