import User from '../models/User.js';

/**
 * @desc    Register a new user (Candidate or Employer)
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      location,
      phone,
      title,
      skills,
      companyName,
      companyIndustry,
      companyWebsite,
      companySize
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    // Role cannot be registered as admin publicly
    const safeRole = role === 'admin' ? 'candidate' : (role || 'candidate');

    const userData = {
      name,
      email: email.toLowerCase(),
      password,
      role: safeRole,
      location: location || '',
      phone: phone || ''
    };

    if (safeRole === 'candidate') {
      userData.title = title || 'Professional';
      userData.skills = Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []);
    } else if (safeRole === 'employer') {
      userData.companyName = companyName || name;
      userData.companyIndustry = companyIndustry || 'Technology';
      userData.companyWebsite = companyWebsite || '';
      userData.companySize = companySize || '10-50 employees';
    }

    const user = await User.create(userData);
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        location: user.location,
        phone: user.phone,
        skills: user.skills,
        resumeName: user.resumeName,
        resumeUrl: user.resumeUrl,
        companyName: user.companyName,
        companyIndustry: user.companyIndustry,
        companyWebsite: user.companyWebsite,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login user & return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        location: user.location,
        phone: user.phone,
        skills: user.skills,
        resumeName: user.resumeName,
        resumeUrl: user.resumeUrl,
        savedJobs: user.savedJobs,
        companyName: user.companyName,
        companyIndustry: user.companyIndustry,
        companyWebsite: user.companyWebsite,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update user profile details
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Common fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.location !== undefined) user.location = req.body.location;

    // Candidate fields
    if (user.role === 'candidate') {
      if (req.body.title !== undefined) user.title = req.body.title;
      if (req.body.bio !== undefined) user.bio = req.body.bio;
      if (req.body.experienceYears !== undefined) user.experienceYears = req.body.experienceYears;
      if (req.body.education !== undefined) user.education = req.body.education;
      if (req.body.skills !== undefined) {
        user.skills = Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim());
      }
      if (req.body.resumeName !== undefined) user.resumeName = req.body.resumeName;
      if (req.body.resumeUrl !== undefined) user.resumeUrl = req.body.resumeUrl;
    }

    // Employer fields
    if (user.role === 'employer') {
      if (req.body.companyName !== undefined) user.companyName = req.body.companyName;
      if (req.body.companyIndustry !== undefined) user.companyIndustry = req.body.companyIndustry;
      if (req.body.companyWebsite !== undefined) user.companyWebsite = req.body.companyWebsite;
      if (req.body.companySize !== undefined) user.companySize = req.body.companySize;
      if (req.body.companyDescription !== undefined) user.companyDescription = req.body.companyDescription;
    }

    const updated = await user.save();

    res.status(200).json({
      success: true,
      user: updated
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Toggle save/bookmark a job
 * @route   POST /api/auth/save-job/:id
 * @access  Private (Candidate)
 */
export const toggleSaveJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.id;

    const index = user.savedJobs.indexOf(jobId);
    let isSaved = false;

    if (index > -1) {
      user.savedJobs.splice(index, 1);
      isSaved = false;
    } else {
      user.savedJobs.push(jobId);
      isSaved = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      isSaved,
      savedJobs: user.savedJobs
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all saved jobs for current candidate
 * @route   GET /api/auth/saved-jobs
 * @access  Private (Candidate)
 */
export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedJobs',
      populate: { path: 'employer', select: 'name email companyName companyLogo' }
    });

    res.status(200).json({
      success: true,
      count: user.savedJobs.length,
      jobs: user.savedJobs
    });
  } catch (err) {
    next(err);
  }
};

