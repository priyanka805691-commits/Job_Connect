import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  HelpCircle
} from 'lucide-react';

const PostJob = () => {
  const { currentUser } = useAuth();
  const { addJob, categories } = useJobs();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser?.companyName || 'TechCorp Solutions');
  const [location, setLocation] = useState('Remote (US)');
  const [category, setCategory] = useState('Software Development');
  const [jobType, setJobType] = useState('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Mid');
  const [salaryMin, setSalaryMin] = useState(90000);
  const [salaryMax, setSalaryMax] = useState(130000);
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
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

      addJob({
        title,
        company,
        employerId: currentUser?.id,
        location,
        category,
        jobType,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        currency,
        description,
        responsibilities: responsibilities.length ? responsibilities : ['Collaborate with engineering and product teams', 'Deliver reliable, tested, maintainable code'],
        requirements: requirements.length ? requirements : ['2+ years of relevant industry experience', 'Strong written and oral communication skills'],
        benefits: benefits.length ? benefits : ['Comprehensive health and wellness benefits', 'Flexible remote-first working culture']
      });

      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to submit job posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 880 }}>
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
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Publish a New Job Opening
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', marginTop: '0.25rem' }}>
            Reach thousands of vetted candidates looking for their next career move
          </p>
        </div>

        {/* Admin Approval Notice Callout */}
        <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
          <ShieldCheck size={22} />
          <div>
            <strong>Administrator Review Process:</strong> Newly published jobs are tagged as{' '}
            <span className="badge badge-warning" style={{ margin: '0 0.2rem' }}>Pending</span>{' '}
            and undergo administrator verification before appearing in public searches.
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* General Info */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Job Information
            </h3>

            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <div className="input-with-icon">
                <Briefcase size={16} className="input-icon-left" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Senior Frontend React Engineer"
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
                    placeholder="e.g. Remote, San Francisco, CA (Hybrid)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Job Category *</label>
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
                <label className="form-label">Employment Type *</label>
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
                <label className="form-label">Experience Level *</label>
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

            {/* Compensation Section */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginTop: '0.5rem' }}>
              Salary & Compensation
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Minimum Salary</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 80000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Salary</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 120000"
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

            {/* Detailed Description */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginTop: '0.5rem' }}>
              Job Details & Bullet Points
            </h3>

            <div className="form-group">
              <label className="form-label">Full Job Description *</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Give a thorough overview of the team, the mission, and what the role entails day-to-day..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Key Responsibilities (one per line)</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Design and ship modular React components&#10;Scale RESTful backend services&#10;Conduct thorough team code reviews"
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Qualifications & Requirements (one per line)</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="4+ years with React and modern JavaScript&#10;Experience with Node.js and MongoDB&#10;Strong understanding of web security and REST API design"
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Perks & Benefits (one per line)</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="100% company-paid medical, dental, and vision insurance&#10;$2,500 annual home office & technology stipend&#10;Flexible PTO"
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
              />
            </div>

            {/* Submit Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <Link to="/employer/dashboard" className="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
              >
                <CheckCircle2 size={18} /> {loading ? 'Submitting...' : 'Post Job Opening'}
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

export default PostJob;

