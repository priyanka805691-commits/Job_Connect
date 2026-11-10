import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { Briefcase, MapPin, Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob, categories } = useJobs();

  const job = jobs.find((j) => j.id === id);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Mid');
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setCompany(job.company || '');
      setLocation(job.location || '');
      setCategory(job.category || 'Software Development');
      setJobType(job.jobType || 'Full-time');
      setExperienceLevel(job.experienceLevel || 'Mid');
      setSalaryMin(job.salaryMin || 0);
      setSalaryMax(job.salaryMax || 0);
      setCurrency(job.currency || 'USD');
      setDescription(job.description || '');
      setResponsibilitiesText((job.responsibilities || []).join('\n'));
      setRequirementsText((job.requirements || []).join('\n'));
      setBenefitsText((job.benefits || []).join('\n'));
    }
  }, [job]);

  if (!job) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <Link to="/employer/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const benefits = benefitsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    updateJob(job.id, {
      title,
      company,
      location,
      category,
      jobType,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency,
      description,
      responsibilities,
      requirements,
      benefits
    });

    navigate('/employer/dashboard');
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 880 }}>
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
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Edit Job: {job.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', marginTop: '0.25rem' }}>
            Update requirements, compensation, and details for this role
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <div className="input-with-icon">
                <Briefcase size={16} className="input-icon-left" />
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <div className="input-with-icon">
                  <Building2 size={16} className="input-icon-left" />
                  <input
                    type="text"
                    className="form-control"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Job Location *</label>
                <div className="input-with-icon">
                  <MapPin size={16} className="input-icon-left" />
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select
                  className="form-control"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Experience Level</label>
                <select
                  className="form-control"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior Level</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Min Salary</label>
                <input
                  type="number"
                  className="form-control"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Salary</label>
                <input
                  type="number"
                  className="form-control"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Currency / Period</label>
                <select
                  className="form-control"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD ($/year)</option>
                  <option value="USD/hr">USD/hr ($/hour)</option>
                  <option value="EUR">EUR (€/year)</option>
                  <option value="GBP">GBP (£/year)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Description *</label>
              <textarea
                className="form-control"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Responsibilities (one per line)</label>
              <textarea
                className="form-control"
                rows={4}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Requirements (one per line)</label>
              <textarea
                className="form-control"
                rows={4}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Benefits (one per line)</label>
              <textarea
                className="form-control"
                rows={3}
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <Link to="/employer/dashboard" className="btn btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary btn-lg">
                <CheckCircle2 size={18} /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EditJob;

