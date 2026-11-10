import express from 'express';
import {
  getAdminStats,
  getPendingJobs,
  approveJob,
  rejectJob,
  getAllAdminJobs,
  getAllUsers,
  deleteUser
} from '../controllers/adminController.js';
import { deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

// Enforce admin protection on all admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/pending-jobs', getPendingJobs);
router.put('/jobs/:id/approve', approveJob);
router.put('/jobs/:id/reject', rejectJob);
router.get('/jobs', getAllAdminJobs);
router.delete('/jobs/:id', deleteJob);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export default router;

