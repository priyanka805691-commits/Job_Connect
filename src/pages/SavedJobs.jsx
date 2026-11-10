import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { Bookmark, ArrowRight, Trash2, MapPin, Building } from 'lucide-react';
import JobCard from '../components/JobCard';

const SavedJobs = () => {
  const { jobs, savedJobIds, toggleSaveJob } = useJobs();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Saved Job Bookmarks
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              You have <strong>{savedJobs.length}</strong> opportunities saved for later review
            </p>
          </div>

          <Link to="/jobs" className="btn btn-primary">
            Explore More Jobs <ArrowRight size={16} />
          </Link>
        </div>

        {savedJobs.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <Bookmark size={48} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No saved jobs yet
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
              When you find a position you like, click the bookmark icon to save it here for fast access and applying.
            </p>
            <Link to="/jobs" className="btn btn-primary">
              Find Jobs to Save
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

