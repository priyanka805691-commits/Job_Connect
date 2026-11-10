import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Eye, 
  Search, 
  Building, 
  UserCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const AdminDashboard = () => {
  const { users } = useAuth();
  const { jobs, approveJob, rejectJob, deleteJob } = useJobs();

  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals', 'jobs', 'users'

  // Job Search / Filters
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('all');

  // User Search / Filters
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Delete modal state
  const [itemToDelete, setItemToDelete] = useState(null); // { type: 'job' | 'user', data: obj }

  // Stats
  const pendingJobs = jobs.filter((j) => j.status === 'pending');
  const approvedJobs = jobs.filter((j) => j.status === 'approved');
  const candidateCount = users.filter((u) => u.role === 'candidate').length;
  const employerCount = users.filter((u) => u.role === 'employer').length;

  // Filtered jobs for tab 2
  const filteredAllJobs = jobs.filter((job) => {
    if (jobStatusFilter !== 'all' && job.status !== jobStatusFilter) return false;
    if (jobSearch) {
      const q = jobSearch.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered users for tab 3
  const filteredUsers = users.filter((u) => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userSearch) {
      const q = userSearch.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.companyName && u.companyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'job') {
      deleteJob(itemToDelete.data.id);
    } else if (itemToDelete.type === 'user') {
      alert(`User ${itemToDelete.data.name} deletion simulated in test mode.`);
    }
    setItemToDelete(null);
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Admin Header Banner */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> JobConnect Super Administrator
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '0.75rem' }}>
              Platform Governance & Approvals
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.25rem', fontSize: '0.95rem' }}>
              Oversee employer verifications, review pending job submissions, and maintain portal trust
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('approvals')}
              className="btn"
              style={{
                background: activeTab === 'approvals' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'approvals' ? '#312e81' : '#ffffff',
                fontWeight: 700
              }}
            >
              <Clock size={16} /> Pending Approvals ({pendingJobs.length})
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Awaiting Approval</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {pendingJobs.length}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Jobs</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {jobs.length}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <UserCheck size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Candidates</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {candidateCount}
              </h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <Building size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hiring Employers</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {employerCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('approvals')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'approvals' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === 'approvals' ? 'var(--primary)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Clock size={16} /> Job Approvals Queue
            <span className="badge badge-warning">{pendingJobs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'jobs' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === 'jobs' ? 'var(--primary)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Briefcase size={16} /> All Portal Jobs ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === 'users' ? 'var(--primary)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Users size={16} /> User Directory ({users.length})
          </button>
        </div>

        {/* TAB 1: PENDING JOB APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Job Approvals Queue
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Review job details and approve them to make them visible to candidates
                </p>
              </div>
            </div>

            {pendingJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  All Caught Up!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  There are no job postings currently waiting for review.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Job Title & Company</th>
                      <th>Location & Type</th>
                      <th>Category</th>
                      <th>Date Submitted</th>
                      <th>Review Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingJobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            {job.title}
                          </div>
                          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                            {job.company}
                          </div>
                        </td>

                        <td>
                          <div style={{ fontSize: '0.88rem' }}>{job.location}</div>
                          <span className="badge badge-secondary" style={{ marginTop: '0.2rem' }}>
                            {job.jobType}
                          </span>
                        </td>

                        <td style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                          {job.category}
                        </td>

                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {new Date(job.postedAt).toLocaleDateString()}
                        </td>

                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              onClick={() => approveJob(job.id)}
                              className="btn btn-sm btn-success"
                              title="Approve job"
                            >
                              <CheckCircle2 size={14} /> Approve
                            </button>
                            <button
                              onClick={() => rejectJob(job.id)}
                              className="btn btn-sm btn-danger-outline"
                              title="Reject job"
                            >
                              <XCircle size={14} /> Reject
                            </button>
                            <Link
                              to={`/jobs/${job.id}`}
                              className="btn btn-sm btn-outline"
                              title="Preview"
                            >
                              <Eye size={14} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE ALL JOBS */}
        {activeTab === 'jobs' && (
          <div className="card">
            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: 260 }}>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <Search size={16} className="input-icon-left" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search jobs by title, company, or location..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>

                <select
                  className="form-control"
                  style={{ width: 'auto' }}
                  value={jobStatusFilter}
                  onChange={(e) => setJobStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Job Title & Company</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Applicants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllJobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                          <Link to={`/jobs/${job.id}`} style={{ color: 'inherit' }}>
                            {job.title}
                          </Link>
                        </div>
                        <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                          {job.company} • {job.location}
                        </div>
                      </td>

                      <td style={{ fontSize: '0.88rem' }}>{job.category}</td>
                      <td style={{ fontSize: '0.88rem' }}>{job.jobType}</td>
                      <td>
                        <StatusBadge status={job.status} />
                      </td>
                      <td style={{ fontSize: '0.88rem' }}>{job.applicantsCount || 0}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {job.status !== 'approved' && (
                            <button
                              onClick={() => approveJob(job.id)}
                              className="btn btn-sm btn-success"
                              title="Approve"
                            >
                              Approve
                            </button>
                          )}
                          <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-outline" title="View">
                            <Eye size={14} />
                          </Link>
                          <button
                            onClick={() => setItemToDelete({ type: 'job', data: job })}
                            className="btn btn-sm btn-danger-outline"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE USERS */}
        {activeTab === 'users' && (
          <div className="card">
            {/* Search & Role Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: 260 }}>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <Search size={16} className="input-icon-left" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search user by name, email, or company..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>

                <select
                  className="form-control"
                  style={{ width: 'auto' }}
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="candidate">Candidates</option>
                  <option value="employer">Employers</option>
                  <option value="admin">Administrators</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>User & Identity</th>
                    <th>Role</th>
                    <th>Company / Title</th>
                    <th>Location</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                          {u.email}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            u.role === 'admin'
                              ? 'badge-warning'
                              : u.role === 'employer'
                              ? 'badge-info'
                              : 'badge-primary'
                          }`}
                          style={{ textTransform: 'capitalize' }}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td style={{ fontSize: '0.88rem' }}>
                        {u.role === 'employer' ? u.companyName : u.title || 'Candidate'}
                      </td>

                      <td style={{ fontSize: '0.88rem' }}>{u.location || '—'}</td>

                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          onClick={() => setItemToDelete({ type: 'user', data: u })}
                          className="btn btn-sm btn-danger-outline"
                          title="Delete user"
                          disabled={u.role === 'admin'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        title={`Confirm Delete ${itemToDelete?.type === 'job' ? 'Job Posting' : 'User Account'}`}
        footer={
          <>
            <button onClick={() => setItemToDelete(null)} className="btn btn-outline">
              Cancel
            </button>
            <button onClick={handleConfirmDelete} className="btn btn-danger">
              Confirm Delete
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Are you sure you want to permanently delete{' '}
          <strong>"{itemToDelete?.data?.title || itemToDelete?.data?.name}"</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

