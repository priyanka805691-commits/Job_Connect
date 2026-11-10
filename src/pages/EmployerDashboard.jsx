import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  AlertCircle,
  Building,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const EmployerDashboard = () => {
  const { currentUser } = useAuth();
  const { jobs, applications, deleteJob } = useJobs();
  const navigate = useNavigate();

  // Find all jobs posted by this employer (or default matching company/employerId)
  const myJobs = jobs.filter(
    (job) => job.employerId === currentUser?.id || job.company === currentUser?.companyName
  );

  // Find all applications submitted to this employer's jobs
  const myJobIds = myJobs.map((j) => j.id);
  const myApplicants = applications.filter((app) => myJobIds.includes(app.jobId));

  // Compute stats
  const activeJobsCount = myJobs.filter((j) => j.status === 'approved').length;
  const pendingJobsCount = myJobs.filter((j) => j.status === 'pending').length;
  const totalApplicantsCount = myApplicants.length;
  const shortlistedApplicantsCount = myApplicants.filter((a) =>
    ['shortlisted', 'interviewing', 'accepted'].includes(a.status)
  ).length;

  // Deletion modal state
  const [jobToDelete, setJobToDelete] = useState(null);

  const confirmDelete = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      setJobToDelete(null);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Employer Welcome Banner */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
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
              Employer Hiring Console
            </span>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.75rem' }}>
              {currentUser?.companyName || 'TechCorp Solutions'}
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.25rem', fontSize: '0.95rem' }}>
              Recruiter: {currentUser?.name} • {currentUser?.location || 'New York, NY'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/employer/post-job" className="btn btn-primary" style={{ fontWeight: 700 }}>
              <PlusCircle size={18} /> Post New Job
            </Link>
            <Link to="/employer/applicants" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Users size={18} /> Review All Applicants ({myApplicants.length})
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Active Jobs</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {activeJobsCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Applicants</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {totalApplicantsCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Shortlisted Candidates</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {shortlistedApplicantsCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Awaiting Approval</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {pendingJobsCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Posted Jobs Section */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Your Posted Job Listings
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Manage, edit, or track applications for your company roles
              </p>
            </div>

            <Link to="/employer/post-job" className="btn btn-sm btn-primary">
              <PlusCircle size={16} /> Create Another Job
            </Link>
          </div>

          {myJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Briefcase size={44} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                No job openings posted yet
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
                Create your first job listing to start receiving applications from qualified candidates.
              </p>
              <Link to="/employer/post-job" className="btn btn-primary">
                Post Your First Job Opening
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Job Title & Location</th>
                    <th>Type & Category</th>
                    <th>Approval Status</th>
                    <th>Applicants</th>
                    <th>Date Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myJobs.map((job) => {
                    const jobAppCount = applications.filter((a) => a.jobId === job.id).length;
                    return (
                      <tr key={job.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            <Link to={`/jobs/${job.id}`} style={{ color: 'inherit' }}>
                              {job.title}
                            </Link>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            {job.location}
                          </div>
                        </td>

                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{job.jobType}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{job.category}</span>
                          </div>
                        </td>

                        <td>
                          <StatusBadge status={job.status} />
                        </td>

                        <td>
                          <Link
                            to={`/employer/applicants?jobId=${job.id}`}
                            className="badge badge-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.825rem' }}
                          >
                            <Users size={13} /> {jobAppCount} candidates
                          </Link>
                        </td>

                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {new Date(job.postedAt).toLocaleDateString()}
                        </td>

                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Link
                              to={`/employer/edit-job/${job.id}`}
                              className="btn btn-sm btn-outline"
                              title="Edit job"
                            >
                              <Edit3 size={14} />
                            </Link>
                            <Link
                              to={`/jobs/${job.id}`}
                              className="btn btn-sm btn-outline"
                              title="Preview posting"
                            >
                              <Eye size={14} />
                            </Link>
                            <button
                              type="button"
                              onClick={() => setJobToDelete(job)}
                              className="btn btn-sm btn-danger-outline"
                              title="Delete job"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!jobToDelete}
        onClose={() => setJobToDelete(null)}
        title="Confirm Delete Job"
        footer={
          <>
            <button onClick={() => setJobToDelete(null)} className="btn btn-outline">
              Cancel
            </button>
            <button onClick={confirmDelete} className="btn btn-danger">
              Yes, Delete Permanently
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Are you sure you want to delete the job posting{' '}
          <strong style={{ color: 'var(--text-main)' }}>"{jobToDelete?.title}"</strong>?
          This action will remove the listing and all candidate applications associated with it.
        </p>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;

