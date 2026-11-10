import fs from 'fs';
import path from 'path';
import { uploadToCloudinary, isConfigured } from '../config/cloudinary.js';
import User from '../models/User.js';

/**
 * Helper to save buffer to local uploads folder when Cloudinary is not configured
 */
const saveFileLocally = async (file, subfolder = 'documents') => {
  const uploadDir = path.join(process.cwd(), 'uploads', subfolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
  const filePath = path.join(uploadDir, safeFilename);

  fs.writeFileSync(filePath, file.buffer);
  return `/uploads/${subfolder}/${safeFilename}`;
};

/**
 * @desc    Upload candidate resume document
 * @route   POST /api/upload/resume
 * @access  Private (Candidate)
 */
export const uploadCandidateResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume document provided.'
      });
    }

    let fileUrl = '';
    const originalName = req.file.originalname;

    if (isConfigured) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, {
          folder: 'jobconnect/resumes',
          resource_type: 'raw'
        });
        fileUrl = result.secure_url;
      } catch (cloudErr) {
        console.warn('[Upload] Cloudinary upload failed, using local storage fallback:', cloudErr.message);
        fileUrl = await saveFileLocally(req.file, 'resumes');
      }
    } else {
      fileUrl = await saveFileLocally(req.file, 'resumes');
    }

    // Automatically update candidate profile if user is authenticated
    if (req.user && req.user.role === 'candidate') {
      await User.findByIdAndUpdate(req.user._id, {
        resumeUrl: fileUrl,
        resumeName: originalName
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully!',
      resumeUrl: fileUrl,
      resumeName: originalName,
      size: req.file.size
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Upload user avatar or company logo
 * @route   POST /api/upload/image
 * @access  Private
 */
export const uploadImageFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided.'
      });
    }

    let imageUrl = '';

    if (isConfigured) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, {
          folder: 'jobconnect/images',
          resource_type: 'image'
        });
        imageUrl = result.secure_url;
      } catch (cloudErr) {
        console.warn('[Upload] Cloudinary upload failed, using local storage fallback:', cloudErr.message);
        imageUrl = await saveFileLocally(req.file, 'images');
      }
    } else {
      imageUrl = await saveFileLocally(req.file, 'images');
    }

    // Update user avatar or company logo
    if (req.user) {
      const field = req.user.role === 'employer' ? 'companyLogo' : 'avatar';
      await User.findByIdAndUpdate(req.user._id, { [field]: imageUrl });
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      url: imageUrl
    });
  } catch (err) {
    next(err);
  }
};

