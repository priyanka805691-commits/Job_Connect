import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { initialJobs, initialApplications, initialSavedJobs, initialCategories } from '../data/sampleData';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobconnect_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobconnect_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('jobconnect_saved_jobs');
    return saved ? JSON.parse(saved) : initialSavedJobs;
  });

  const [categories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // Sync state to LocalStorage as resilient client cache
  useEffect(() => {
    localStorage.setItem('jobconnect_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobconnect_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('jobconnect_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Normalize backend Job document to client model
  const normalizeJob = (j) => ({
    id: j._id || j.id,
    title: j.title,
    company: j.company,
    employerId: j.employer?._id || j.employer || j.employerId,
    companyLogo: j.companyLogo || j.employer?.companyLogo || '',
    location: j.location,
    jobType: j.jobType,
    category: j.category,
    experienceLevel: j.experienceLevel,
    salaryMin: j.salaryMin,
    salaryMax: j.salaryMax,
    currency: j.currency || 'USD',
    description: j.description,
    responsibilities: j.responsibilities || [],
    requirements: j.requirements || [],
    benefits: j.benefits || [],
    status: j.status || 'approved',
    featured: Boolean(j.featured),
    applicantsCount: j.applicantsCount || 0,
    postedAt: j.createdAt || j.postedAt || new Date().toISOString()
  });

  // Normalize backend Application document to client model
  const normalizeApp = (a) => ({
    id: a._id || a.id,
    jobId: a.job?._id || a.job || a.jobId,
    jobTitle: a.job?.title || a.jobTitle || 'Opportunity',
    company: a.job?.company || a.company || 'Hiring Team',
    employerId: a.employer?._id || a.employer || a.employerId,
    candidateId: a.candidate?._id || a.candidate || a.candidateId,
    candidateName: a.candidateName || a.candidate?.name || 'Applicant',
    candidateEmail: a.candidateEmail || a.candidate?.email || '',
    candidatePhone: a.candidatePhone || a.candidate?.phone || '',
    resumeName: a.resumeName || 'Resume.pdf',
    resumeUrl: a.resumeUrl || '#',
    coverNote: a.coverNote || '',
    status: a.status || 'pending',
    appliedAt: a.createdAt || a.appliedAt || new Date().toISOString(),
    employerNotes: a.employerNotes || ''
  });

  // Fetch live jobs and applications from backend API
  const refreshData = async () => {
    try {
      setLoading(true);
      // Fetch public jobs
      const jobsRes = await api.get('/jobs');
      if (jobsRes.data?.success && jobsRes.data.jobs) {
        const fetchedJobs = jobsRes.data.jobs.map(normalizeJob);
        // Merge with any local pending jobs so admin queue remains visible
        setJobs((prev) => {
          const map = new Map();
          fetchedJobs.forEach((j) => map.set(j.id, j));
          prev.forEach((j) => {
            if (!map.has(j.id)) map.set(j.id, j);
          });
          return Array.from(map.values());
        });
      }

      // If token present, fetch user applications
      const token = localStorage.getItem('jobconnect_token');
      if (token) {
        try {
          const appRes = await api.get('/applications/my-applications');
          if (appRes.data?.success && appRes.data.applications) {
            const fetchedApps = appRes.data.applications.map(normalizeApp);
            setApplications((prev) => {
              const map = new Map();
              fetchedApps.forEach((a) => map.set(a.id, a));
              prev.forEach((a) => {
                if (!map.has(a.id)) map.set(a.id, a);
              });
              return Array.from(map.values());
            });
          }
        } catch (err) {
          // Candidate might not have applications yet
        }
      }
    } catch (err) {
      console.warn('[JobContext] Backend connection unavailable, operating on local state:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Employer actions
  const addJob = async (jobData) => {
    try {
      const res = await api.post('/jobs', jobData);
      if (res.data?.success && res.data.job) {
        const newJob = normalizeJob(res.data.job);
        setJobs((prev) => [newJob, ...prev]);
        return newJob;
      }
    } catch (err) {
      console.warn('[JobContext] API addJob failed, saving locally:', err.message);
    }

    const fallbackJob = {
      id: `job-${Date.now()}`,
      status: 'pending',
      applicantsCount: 0,
      postedAt: new Date().toISOString(),
      ...jobData
    };
    setJobs((prev) => [fallbackJob, ...prev]);
    return fallbackJob;
  };

  const updateJob = async (id, updatedData) => {
    try {
      await api.put(`/jobs/${id}`, updatedData);
    } catch (err) {
      console.warn('[JobContext] API updateJob failed, updating locally:', err.message);
    }
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updatedData } : job))
    );
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
    } catch (err) {
      console.warn('[JobContext] API deleteJob failed, removing locally:', err.message);
    }
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setApplications((prev) => prev.filter((app) => app.jobId !== id));
    setSavedJobIds((prev) => prev.filter((savedId) => savedId !== id));
  };

  // Admin actions
  const approveJob = async (id) => {
    try {
      await api.put(`/admin/jobs/${id}/approve`);
    } catch (err) {
      console.warn('[JobContext] API approveJob failed, updating locally:', err.message);
    }
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: 'approved' } : job))
    );
  };

  const rejectJob = async (id) => {
    try {
      await api.put(`/admin/jobs/${id}/reject`);
    } catch (err) {
      console.warn('[JobContext] API rejectJob failed, updating locally:', err.message);
    }
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: 'rejected' } : job))
    );
  };

  // Candidate actions
  const applyForJob = async (jobId, applicationData) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) throw new Error('Job not found');

    try {
      const res = await api.post(`/applications/${jobId}`, applicationData);
      if (res.data?.success && res.data.application) {
        const newApp = normalizeApp(res.data.application);
        setApplications((prev) => [newApp, ...prev]);
        setJobs((prev) =>
          prev.map((j) =>
            j.id === jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j
          )
        );
        return newApp;
      }
    } catch (err) {
      console.warn('[JobContext] API applyForJob failed, recording locally:', err.response?.data?.message || err.message);
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
    }

    const fallbackApp = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job.title,
      company: job.company,
      employerId: job.employerId,
      status: 'pending',
      appliedAt: new Date().toISOString(),
      employerNotes: '',
      ...applicationData
    };

    setApplications((prev) => [fallbackApp, ...prev]);
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j
      )
    );
    return fallbackApp;
  };

  const updateApplicationStatus = async (applicationId, status, notes = '') => {
    try {
      await api.put(`/applications/${applicationId}/status`, {
        status,
        employerNotes: notes
      });
    } catch (err) {
      console.warn('[JobContext] API updateApplicationStatus failed, updating locally:', err.message);
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? { ...app, status, employerNotes: notes || app.employerNotes }
          : app
      )
    );
  };

  const toggleSaveJob = async (jobId) => {
    try {
      await api.post(`/auth/save-job/${jobId}`);
    } catch (err) {
      console.warn('[JobContext] API toggleSaveJob failed, toggling locally:', err.message);
    }

    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  const hasApplied = (jobId, candidateId) => {
    return applications.some(
      (app) => app.jobId === jobId && (app.candidateId === candidateId || app.candidate === candidateId)
    );
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        savedJobIds,
        categories,
        loading,
        refreshData,
        addJob,
        updateJob,
        deleteJob,
        approveJob,
        rejectJob,
        applyForJob,
        updateApplicationStatus,
        toggleSaveJob,
        isJobSaved,
        hasApplied
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
