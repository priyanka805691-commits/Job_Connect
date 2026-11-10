import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

/**
 * @desc    Get high-level administrator platform analytics
 * @route   GET /api/admin/stats
 * @access  Private (Admin)
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const candidateCount = await User.countDocuments({ role: 'candidate' });
    const employerCount = await User.countDocuments({ role: 'employer' });
    const totalJobs = await Job.countDocuments();
    const pendingJobsCount = await Job.countDocuments({ status: 'pending' });
    const approvedJobsCount = await Job.countDocuments({ status: 'approved' });
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        candidateCount,
        employerCount,
        totalJobs,
        pendingJobsCount,
        approvedJobsCount,
        totalApplications
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all jobs awaiting administrator review
 * @route   GET /api/admin/pending-jobs
 * @access  Private (Admin)
 */
export const getPendingJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: 'pending' })
      .populate('employer', 'name email companyName companyLogo location')
      .sort({ createdAt: -1 });

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
 * @desc    Approve a job posting (publish live)
 * @route   PUT /api/admin/jobs/:id/approve
 * @access  Private (Admin)
 */
export const approveJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.status = 'approved';
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job posting approved and now publicly visible.',
      job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Reject a job posting
 * @route   PUT /api/admin/jobs/:id/reject
 * @access  Private (Admin)
 */
export const rejectJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.status = 'rejected';
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job posting rejected.',
      job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all jobs across the platform (for admin management)
 * @route   GET /api/admin/jobs
 * @access  Private (Admin)
 */
export const getAllAdminJobs = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(query)
      .populate('employer', 'name email companyName')
      .sort({ createdAt: -1 });

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
 * @desc    Get all registered users across the platform
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const query = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a user account & associated records
 * @route   DELETE /api/admin/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin' && user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Administrators cannot delete their own active account.'
      });
    }

    // Delete jobs if employer
    if (user.role === 'employer') {
      await Job.deleteMany({ employer: user._id });
      await Application.deleteMany({ employer: user._id });
    }

    // Delete applications if candidate
    if (user.role === 'candidate') {
      await Application.deleteMany({ candidate: user._id });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User and all associated data deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

