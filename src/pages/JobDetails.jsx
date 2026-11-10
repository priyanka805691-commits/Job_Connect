import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  Bookmark, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Building2, 
  ExternalLink, 
  Upload, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, isJobSaved, toggleSaveJob, applyForJob, hasApplied, applications } = useJobs();
  const { currentUser, isAuthenticated } = useAuth();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [customResumeName, setCustomResumeName] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Job Posting Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          The job listing you are looking for might have been closed, deleted, or does not exist.
        </p>
        <Link to="/jobs" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Job Search
        </Link>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const alreadyApplied = currentUser ? hasApplied(job.id, currentUser.id) : false;
  const userApplication = alreadyApplied
    ? applications.find((a) => a.jobId === job.id && a.candidateId === currentUser?.id)
    : null;

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (currentUser.role !== 'candidate') {
      setErrorMessage('Only candidate accounts can submit job applications.');
      return;
    }

    try {
      applyForJob(job.id, {
        candidateId: currentUser.id,
        candidateName: currentUser.name,
        candidateEmail: currentUser.email,
        candidatePhone: currentUser.phone || '',
        resumeName: customResumeName || currentUser.resumeName || 'Candidate_Resume.pdf',
        resumeUrl: currentUser.resumeUrl || '#',
        coverNote
      });

      setApplySuccess(true);
      setTimeout(() => {
        setApplyModalOpen(false);
        setApplySuccess(false);
        setCoverNote('');
      }, 1600);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit application');
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomResumeName(file.name);
    }
  };

  const formatSalary = (min, max, cur = 'USD') => {
    if (!min && !max) return 'Salary Negotiable';
    if (cur.includes('/hr')) return `$${min} - $${max}/hr`;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k / year`;
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/jobs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Back to Job Listings
          </Link>
        </div>

        {/* Job Header Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '14px',
                    objectFit: 'cover',
                    border: '1px solid var(--border)'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '14px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.75rem'
                  }}
                >
                  {job.company ? job.company.charAt(0) : 'J'}
                </div>
              )}

              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25 }}>
                  {job.title}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{job.company}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={16} /> {job.location}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={16} /> Posted {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="btn btn-outline"
                style={{
                  background: saved ? 'var(--primary-light)' : 'transparent',
                  color: saved ? 'var(--primary)' : 'var(--text-main)'
                }}
              >
                <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                <span>{saved ? 'Saved' : 'Save Job'}</span>
              </button>

              {alreadyApplied ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfdf5', color: '#065f46', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 600, border: '1px solid #a7f3d0' }}>
                  <CheckCircle2 size={18} />
                  <span>Applied</span>
                </div>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="btn btn-primary btn-lg"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                Offered Salary
              </span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                Job Type
              </span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {job.jobType}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                Experience Level
              </span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {job.experienceLevel || 'Mid'} Level
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                Industry Category
              </span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {job.category || 'General'}
              </p>
            </div>
          </div>
        </div>

        {/* If user already applied banner */}
        {alreadyApplied && userApplication && (
          <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Application Status:</strong> Your application submitted on{' '}
              {new Date(userApplication.appliedAt).toLocaleDateString()} is currently{' '}
              <strong style={{ textTransform: 'capitalize' }}>{userApplication.status}</strong>.
              {userApplication.employerNotes && (
                <div style={{ marginTop: '0.35rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  Employer Note: "{userApplication.employerNotes}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Layout: 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }} className="job-details-content-grid">
          {/* Main Description Column */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Job Overview & Purpose
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
              {job.description}
            </p>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Key Responsibilities
                </h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Qualifications & Skills
                </h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Compensation & Perks
                </h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {job.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar: Company Card & Application CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Company Info Box */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={20} color="var(--primary)" /> About {job.company}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Leading tech enterprise delivering high-velocity collaborative software solutions. Focused on continuous innovation, human growth, and flexible remote culture.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Primary Location</span>
                  <span style={{ fontWeight: 600 }}>{job.location}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Company Size</span>
                  <span style={{ fontWeight: 600 }}>50 - 250 Employees</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Applicants Received</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{job.applicantsCount || 0} candidates</span>
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #eff6ff, #f8fafc)', border: '1px solid var(--primary-border)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                Ready to take the next step?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Applications are reviewed by the hiring team within 3 business days.
              </p>

              {alreadyApplied ? (
                <button disabled className="btn btn-outline" style={{ width: '100%', opacity: 0.7 }}>
                  <CheckCircle2 size={16} /> Application Submitted
                </button>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Apply for this position
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${job.title}`}
      >
        {applySuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Application Submitted!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
              Your application has been delivered to <strong>{job.company}</strong>. Track status from your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit}>
            {errorMessage && (
              <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
                {errorMessage}
              </div>
            )}

            {!isAuthenticated ? (
              <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                  You need an active Candidate account on JobConnect to apply for jobs.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <Link to="/login" className="btn btn-outline">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Create Account
                  </Link>
                </div>
              </div>
            ) : currentUser.role !== 'candidate' ? (
              <div className="alert alert-danger">
                Only Candidate accounts can apply for jobs. Please switch to a Candidate account.
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentUser.name}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentUser.email}
                    disabled
                  />
                </div>

                {/* Resume Picker */}
                <div className="form-group">
                  <label className="form-label">Candidate Resume / CV</label>
                  <div
                    style={{
                      border: '2px dashed var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      textAlign: 'center',
                      background: 'var(--bg-subtle)'
                    }}
                  >
                    <FileText size={28} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {customResumeName || currentUser.resumeName || 'No resume on profile yet'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                      PDF, DOCX format (Max 10MB)
                    </p>
                    <label
                      htmlFor="modal-resume-file"
                      className="btn btn-sm btn-outline"
                      style={{ marginTop: '0.75rem', cursor: 'pointer' }}
                    >
                      <Upload size={14} /> Upload Alternate Resume
                    </label>
                    <input
                      type="file"
                      id="modal-resume-file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="form-group">
                  <label className="form-label">Brief Pitch / Cover Note</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Describe why you are a great match for this opening..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </Modal>

      <style>{`
        @media (max-width: 860px) {
          .job-details-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobDetails;

