import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Building, 
  ArrowRight, 
  CheckCircle2,
  Code,
  Palette,
  DollarSign,
  Headphones,
  Database,
  Sparkles
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';

const Home = () => {
  const { jobs, categories } = useJobs();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (selectedCat) params.append('category', selectedCat);
    navigate(`/jobs?${params.toString()}`);
  };

  // Only display approved jobs on the public homepage
  const approvedJobs = jobs.filter((j) => j.status === 'approved');
  const featuredJobs = approvedJobs.slice(0, 4);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={22} color="var(--primary)" />;
      case 'Palette': return <Palette size={22} color="#ec4899" />;
      case 'TrendingUp': return <TrendingUp size={22} color="#10b981" />;
      case 'DollarSign': return <DollarSign size={22} color="#f59e0b" />;
      case 'Headphones': return <Headphones size={22} color="#8b5cf6" />;
      case 'Database': return <Database size={22} color="#06b6d4" />;
      case 'Users': return <Users size={22} color="#f97316" />;
      default: return <Briefcase size={22} color="var(--primary)" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Over <strong>1,200+</strong> verified career opportunities live now
            </span>
          </div>

          <h1 className="hero-title">
            Connect With Your <span className="hero-highlight">Dream Career</span> Today
          </h1>

          <p className="hero-subtitle">
            JobConnect links ambitious professionals with world-class employers. Search thousands of remote and on-site engineering, design, marketing, and leadership openings.
          </p>

          {/* Interactive Hero Search Box */}
          <form onSubmit={handleSearchSubmit} className="hero-search-box">
            <div className="input-with-icon">
              <Search size={18} className="input-icon-left" />
              <input
                type="text"
                className="form-control"
                placeholder="Job title, keywords, or skills"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ border: 'none', background: 'transparent' }}
              />
            </div>

            <div className="input-with-icon" style={{ borderLeft: '1px solid var(--border)' }}>
              <MapPin size={18} className="input-icon-left" />
              <input
                type="text"
                className="form-control"
                placeholder="City, state, or 'Remote'"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ border: 'none', background: 'transparent' }}
              />
            </div>

            <div style={{ borderLeft: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
              <select
                className="form-control"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              <Search size={18} /> Search Jobs
            </button>
          </form>

          {/* Popular Tag Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Popular:</span>
            {['React', 'Remote', 'Full-time', 'Senior Engineer', 'UI/UX Designer', 'DevOps'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/jobs?keyword=${encodeURIComponent(tag)}`)}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Explore by Specialization
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Browse by Top Categories
              </h2>
            </div>
            <Link to="/jobs" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              All Categories <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                className="card card-clickable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'var(--bg-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {cat.name}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {cat.jobCount} Active Openings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Verified Openings
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Featured Opportunities
              </h2>
            </div>
            <Link to="/jobs" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              View All {approvedJobs.length} Jobs <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features / Why JobConnect */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Why JobConnect
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              Built for Modern Careers & Fast-Paced Teams
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
              Everything you need to find the right role or hire exceptional talent with confidence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified Job Postings</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Every employer and job opening undergoes strict administrator verification to guarantee legitimate opportunities.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <TrendingUp size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Application Transparency</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Track the status of your applications live—from submission and screening to interview stages and job offers.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <Building size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Empowered Employers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Comprehensive dashboards to publish listings, review candidate resumes, manage pipeline stages, and hire seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Callout Banner */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: '#ffffff' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: 640 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>
              Hiring Managers & Recruiters
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '1rem', lineHeight: 1.2 }}>
              Looking to Hire Top-Tier Industry Talent?
            </h2>
            <p style={{ opacity: 0.9, marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Publish your openings on JobConnect to reach thousands of qualified software engineers, designers, marketers, and product managers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/employer/post-job"
              className="btn btn-lg"
              style={{ background: '#ffffff', color: 'var(--primary)', fontWeight: 700 }}
            >
              Post a Job Opening
            </Link>
            <Link
              to="/register"
              className="btn btn-lg"
              style={{ background: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.4)', fontWeight: 600 }}
            >
              Employer Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

