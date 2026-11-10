import Job from '../models/Job.js';
import Application from '../models/Application.js';

/**
 * @desc    Get all approved jobs (public browse with search and filtering)
 * @route   GET /api/jobs
 * @access  Public
 */
export const getJobs = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      category,
      jobType,
      experienceLevel,
      minSalary,
      sort
    } = req.query;

    // Public query always enforces approved status
    const query = { status: 'approved' };

    // Keyword search
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { requirements: { $regex: keyword, $options: 'i' } }
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Job Types (can be array or single)
    if (jobType) {
      const types = Array.isArray(jobType) ? jobType : jobType.split(',');
      query.jobType = { $in: types };
    }

    // Experience Levels
    if (experienceLevel) {
      const levels = Array.isArray(experienceLevel) ? experienceLevel : experienceLevel.split(',');
      query.experienceLevel = { $in: levels };
    }

    // Min Salary filter
    if (minSalary && Number(minSalary) > 0) {
      query.salaryMax = { $gte: Number(minSalary) };
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'salary-high') {
      sortOptions = { salaryMax: -1 };
    } else if (sort === 'salary-low') {
      sortOptions = { salaryMin: 1 };
    } else if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const jobs = await Job.find(query).sort(sortOptions).populate('employer', 'name email companyName companyLogo');

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      'employer',
      'name email companyName companyLogo companyWebsite companyDescription location'
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found.'
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new job posting (Requires Admin Approval)
 * @route   POST /api/jobs
 * @access  Private (Employer)
 */
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      category,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      currency,
      description,
      responsibilities,
      requirements,
      benefits
    } = req.body;

    const jobData = {
      title,
      company: company || req.user.companyName || req.user.name,
      employer: req.user._id,
      companyLogo: req.user.companyLogo || '',
      location: location || 'Remote',
      category: category || 'Software Development',
      jobType: jobType || 'Full-time',
      experienceLevel: experienceLevel || 'Mid',
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      currency: currency || 'USD',
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? responsibilities.split('\n').filter(Boolean) : []),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split('\n').filter(Boolean) : []),
      benefits: Array.isArray(benefits) ? benefits : (benefits ? benefits.split('\n').filter(Boolean) : []),
      status: 'pending' // Admin review queue
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: 'Job posted successfully and submitted to Administrator review queue.',
      job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update an existing job posting
 * @route   PUT /api/jobs/:id
 * @access  Private (Employer Owner or Admin)
 */
export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership
    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this job listing.'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a job posting & associated applications
 * @route   DELETE /api/jobs/:id
 * @access  Private (Employer Owner or Admin)
 */
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership
    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this job listing.'
      });
    }

    await job.deleteOne();
    // Delete associated applications
    await Application.deleteMany({ job: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Job posting and related applications deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all jobs posted by the logged in employer
 * @route   GET /api/jobs/employer/my-jobs
 * @access  Private (Employer)
 */
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    next(err);
  }
};

