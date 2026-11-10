import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Users, 
  FileText, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  CheckCircle2, 
  MessageSquare, 
  Filter, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const EmployerApplicants = () => {
  const { currentUser } = useAuth();
  const { jobs, applications, updateApplicationStatus } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  // Employer's jobs
  const myJobs = jobs.filter(
    (j) => j.employerId === currentUser?.id || j.company === currentUser?.companyName
  );
  const myJobIds = myJobs.map((j) => j.id);

  // Employer's applicants
  const allMyApplicants = applications.filter((app) => myJobIds.includes(app.jobId));

  const initialJobFilter = searchParams.get('jobId') || 'all';
  const [selectedJobId, setSelectedJobId] = useState(initialJobFilter);
  const [statusFilter, setStatusFilter] = useState('all');

  // Notes Modal state
  const [activeAppForNotes, setActiveAppForNotes] = useState(null);
  const [notesInput, setNotesInput] = useState('');

  const filteredApplicants = allMyApplicants.filter((app) => {
    if (selectedJobId !== 'all' && app.jobId !== selectedJobId) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  const handleOpenNotes = (app) => {
    setActiveAppForNotes(app);
    setNotesInput(app.employerNotes || '');
  };

  const handleSaveNotes = () => {
    if (activeAppForNotes) {
      updateApplicationStatus(activeAppForNotes.id, activeAppForNotes.status, notesInput);
      setActiveAppForNotes(null);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/employer/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Back to Employer Dashboard
          </Link>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Candidate Applicant Management
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Review resumes, schedule interviews, and update application stages for your openings
            </p>
          </div>
          <div className="badge badge-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            <Users size={16} /> {filteredApplicants.length} Total Candidates
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
            {/* Filter by Job */}
            <div style={{ minWidth: 240 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Filter by Job Posting
              </label>
              <select
                className="form-control"
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
              >
                <option value="all">All Jobs ({myJobs.length})</option>
                {myJobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Stage */}
            <div style={{ minWidth: 200 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Filter by Status
              </label>
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewing">Interviewing</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {(selectedJobId !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedJobId('all');
                setStatusFilter('all');
              }}
              className="btn btn-sm btn-outline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <Users size={48} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No candidates found
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
              No applications match your selected filters. Try choosing "All Jobs" or "All Stages".
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredApplicants.map((app) => (
              <div key={app.id} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  {/* Candidate Left Info */}
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: '50%',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.35rem',
                        flexShrink: 0
                      }}
                    >
                      {app.candidateName ? app.candidateName.charAt(0) : 'C'}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {app.candidateName}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                        Applied for: <Link to={`/jobs/${app.jobId}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{app.jobTitle}</Link>
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Mail size={13} /> {app.candidateEmail}
                        </span>
                        {app.candidatePhone && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Phone size={13} /> {app.candidatePhone}
                          </span>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={13} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Status Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Stage:</span>
                      <select
                        className="form-control"
                        style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <StatusBadge status={app.status} />
                  </div>
                </div>

                {/* Cover Note */}
                {app.coverNote && (
                  <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                      Candidate Cover Pitch:
                    </strong>
                    "{app.coverNote}"
                  </div>
                )}

                {/* Recruiter Notes if any */}
                {app.employerNotes && (
                  <div style={{ background: '#f0fdf4', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: '#166534', border: '1px solid #bbf7d0', marginBottom: '1rem' }}>
                    <strong>Private Recruiter Note:</strong> {app.employerNotes}
                  </div>
                )}

                {/* Bottom Action Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      Resume: {app.resumeName || 'Candidate_Resume.pdf'}
                    </span>
                    <button
                      onClick={() => alert(`Simulating viewing/downloading ${app.resumeName || 'resume.pdf'}`)}
                      className="btn btn-sm btn-outline"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      <Download size={12} /> Download CV
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenNotes(app)}
                    className="btn btn-sm btn-secondary"
                  >
                    <MessageSquare size={14} /> Add / Edit Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recruiter Feedback Note Modal */}
      <Modal
        isOpen={!!activeAppForNotes}
        onClose={() => setActiveAppForNotes(null)}
        title={`Internal Notes for ${activeAppForNotes?.candidateName}`}
        footer={
          <>
            <button onClick={() => setActiveAppForNotes(null)} className="btn btn-outline">
              Cancel
            </button>
            <button onClick={handleSaveNotes} className="btn btn-primary">
              Save Note
            </button>
          </>
        }
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Add confidential interview observations or status notes for this applicant.
        </p>
        <textarea
          className="form-control"
          rows={4}
          placeholder="e.g. Cleared round 1 technical interview with flying colors. Scheduling round 2 with CTO."
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default EmployerApplicants;

