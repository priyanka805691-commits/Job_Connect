import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import { Briefcase, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

const JobListings = () => {
  const { jobs } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filter state from search params
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    jobTypes: searchParams.getAll('type') || [],
    experienceLevels: searchParams.getAll('exp') || [],
    minSalary: Number(searchParams.get('minSalary')) || 0
  });

  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL search parameters change
  useEffect(() => {
    const kw = searchParams.get('keyword') || '';
    const loc = searchParams.get('location') || '';
    const cat = searchParams.get('category') || '';
    setFilters((prev) => ({
      ...prev,
      keyword: kw,
      location: loc,
      category: cat
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      category: '',
      jobTypes: [],
      experienceLevels: [],
      minSalary: 0
    });
    setSearchParams({});
  };

  // Filter approved jobs only for public browsing
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Must be approved by admin
      if (job.status !== 'approved') return false;

      // Keyword match (title, company, description, requirements)
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const inTitle = job.title?.toLowerCase().includes(kw);
        const inCompany = job.company?.toLowerCase().includes(kw);
        const inDesc = job.description?.toLowerCase().includes(kw);
        const inReq = job.requirements?.some((r) => r.toLowerCase().includes(kw));
        if (!inTitle && !inCompany && !inDesc && !inReq) return false;
      }

      // Location match
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        if (!job.location?.toLowerCase().includes(loc)) return false;
      }

      // Category match
      if (filters.category && job.category !== filters.category) {
        return false;
      }

      // Job Type match
      if (filters.jobTypes?.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false;
      }

      // Experience Level match
      if (filters.experienceLevels?.length > 0 && !filters.experienceLevels.includes(job.experienceLevel)) {
        return false;
      }

      // Min Salary filter
      if (filters.minSalary > 0) {
        const max = job.salaryMax || 0;
        if (max < filters.minSalary) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.postedAt) - new Date(a.postedAt);
      }
      if (sortBy === 'salary-high') {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      if (sortBy === 'salary-low') {
        return (a.salaryMin || 0) - (b.salaryMin || 0);
      }
      return 0;
    });
  }, [jobs, filters, sortBy]);

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Find Your Next Job Opportunity
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>
            Showing <strong>{filteredJobs.length}</strong> available open positions
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div style={{ display: 'none', marginBottom: '1.25rem' }} className="mobile-filter-bar">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={16} /> Filters & Search
            </span>
            <span className="badge badge-primary">{filteredJobs.length}</span>
          </button>
        </div>

        {/* Main Grid: Sidebar + Listings */}
        <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '2rem', alignItems: 'start' }} className="job-listings-layout">
          {/* Sidebar */}
          <div className={`filter-sidebar-wrapper ${mobileFilterOpen ? 'mobile-visible' : ''}`}>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Listings Column */}
          <div>
            {/* Top Sort / Status Bar */}
            <div
              className="card"
              style={{
                padding: '0.85rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Active Filters:
                </span>
                {filters.keyword && (
                  <span className="badge badge-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Keyword: {filters.keyword}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setFilters({ ...filters, keyword: '' })} />
                  </span>
                )}
                {filters.category && (
                  <span className="badge badge-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {filters.category}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setFilters({ ...filters, category: '' })} />
                  </span>
                )}
                {filters.location && (
                  <span className="badge badge-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Loc: {filters.location}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setFilters({ ...filters, location: '' })} />
                  </span>
                )}
                {!filters.keyword && !filters.category && !filters.location && (
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-light)' }}>None (all jobs displayed)</span>
                )}
              </div>

              {/* Sort By Select */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowUpDown size={15} color="var(--text-muted)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
                <select
                  className="form-control"
                  style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Most Recent</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
              </div>
            </div>

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
              <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'var(--bg-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Briefcase size={28} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  No matching jobs found
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
                  Try adjusting your search keywords, clearing location filters, or resetting filters to see more results.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .job-listings-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-bar {
            display: block !important;
          }
          .filter-sidebar-wrapper {
            display: none;
          }
          .filter-sidebar-wrapper.mobile-visible {
            display: block;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default JobListings;

