import Application from '../models/Application.js';
import Job from '../models/Job.js';

/**
 * @desc    Submit a job application
 * @route   POST /api/applications/:jobId
 * @access  Private (Candidate)
 */
export const applyJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'This job posting is not currently accepting applications.'
      });
    }

    // Check if candidate already applied
    const alreadyApplied = await Application.findOne({
      job: job._id,
      candidate: req.user._id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this position.'
      });
    }

    const { coverNote, resumeUrl, resumeName, candidatePhone } = req.body;

    const application = await Application.create({
      job: job._id,
      candidate: req.user._id,
      employer: job.employer,
      candidateName: req.user.name,
      candidateEmail: req.user.email,
      candidatePhone: candidatePhone || req.user.phone || '',
      resumeUrl: resumeUrl || req.user.resumeUrl || '',
      resumeName: resumeName || req.user.resumeName || 'Resume.pdf',
      coverNote: coverNote || '',
      status: 'pending'
    });

    // Increment applicantsCount on the job
    job.applicantsCount = (job.applicantsCount || 0) + 1;
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all applications submitted by current candidate
 * @route   GET /api/applications/my-applications
 * @access  Private (Candidate)
 */
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate('job', 'title company location jobType category status salaryMin salaryMax currency')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all applications for a specific job
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Employer Owner or Admin)
 */
export const getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applicants for this job.'
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('candidate', 'name email phone location skills resumeUrl resumeName title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all applications across all jobs for the logged in employer
 * @route   GET /api/applications/employer/all
 * @access  Private (Employer)
 */
export const getEmployerAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ employer: req.user._id })
      .populate('job', 'title location jobType category')
      .populate('candidate', 'name email phone location skills resumeUrl resumeName title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update applicant stage / status & employer notes
 * @route   PUT /api/applications/:id/status
 * @access  Private (Employer Owner or Admin)
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, employerNotes } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application.'
      });
    }

    if (status) application.status = status;
    if (employerNotes !== undefined) application.employerNotes = employerNotes;

    await application.save();

    res.status(200).json({
      success: true,
      application
    });
  } catch (err) {
    next(err);
  }
};

