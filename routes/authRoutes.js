import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  toggleSaveJob,
  getSavedJobs
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Candidate saved jobs
router.post('/save-job/:id', protect, authorize('candidate'), toggleSaveJob);
router.get('/saved-jobs', protect, authorize('candidate'), getSavedJobs);

export default router;

