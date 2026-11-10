import express from 'express';
import {
  applyJob,
  getMyApplications,
  getJobApplications,
  getEmployerAllApplications,
  updateApplicationStatus
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

// Candidate routes
router.post('/:jobId', protect, authorize('candidate'), applyJob);
router.get('/my-applications', protect, authorize('candidate'), getMyApplications);

// Employer routes
router.get('/employer/all', protect, authorize('employer', 'admin'), getEmployerAllApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

export default router;

