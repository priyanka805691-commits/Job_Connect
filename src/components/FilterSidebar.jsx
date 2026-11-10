import React from 'react';
import { Search, MapPin, Filter, RotateCcw, Briefcase, DollarSign } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const FilterSidebar = ({ filters, setFilters, onReset }) => {
  const { categories } = useJobs();

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];
  const experienceLevels = ['Entry', 'Mid', 'Senior'];

  const handleCheckboxChange = (group, value) => {
    const current = filters[group] || [];
    if (current.includes(value)) {
      setFilters({ ...filters, [group]: current.filter((item) => item !== value) });
    } else {
      setFilters({ ...filters, [group]: [...current, value] });
    }
  };

  return (
    <div className="card" style={{ padding: '1.25rem', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--primary)" /> Filters
        </h3>
        <button
          onClick={onReset}
          className="btn btn-sm btn-outline"
          style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', color: 'var(--text-muted)' }}
          title="Reset all filters"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Keyword Search */}
      <div className="form-group">
        <label className="form-label">Search Keyword</label>
        <div className="input-with-icon">
          <Search size={16} className="input-icon-left" />
          <input
            type="text"
            className="form-control"
            placeholder="Title, skills, company..."
            value={filters.keyword || ''}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />
        </div>
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label">Location</label>
        <div className="input-with-icon">
          <MapPin size={16} className="input-icon-left" />
          <input
            type="text"
            className="form-control"
            placeholder="City, state, or 'Remote'"
            value={filters.location || ''}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-control"
          value={filters.category || ''}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label className="form-label">Job Type</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
          {jobTypes.map((type) => {
            const checked = (filters.jobTypes || []).includes(type);
            return (
              <label
                key={type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange('jobTypes', type)}
                  style={{ accentColor: 'var(--primary)', width: 16, height: 16, cursor: 'pointer' }}
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label className="form-label">Experience Level</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
          {experienceLevels.map((lvl) => {
            const checked = (filters.experienceLevels || []).includes(lvl);
            return (
              <label
                key={lvl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange('experienceLevels', lvl)}
                  style={{ accentColor: 'var(--primary)', width: 16, height: 16, cursor: 'pointer' }}
                />
                <span>{lvl} Level</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Annual Salary */}
      <div className="form-group" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label className="form-label">Min Salary (USD/yr)</label>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            {filters.minSalary ? `$${Number(filters.minSalary).toLocaleString()}` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200000"
          step="10000"
          value={filters.minSalary || 0}
          onChange={(e) => setFilters({ ...filters, minSalary: Number(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.5rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)' }}>
          <span>$0</span>
          <span>$100k</span>
          <span>$200k+</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

