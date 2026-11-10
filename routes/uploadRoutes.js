import express from 'express';
import {
  uploadCandidateResume,
  uploadImageFile
} from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { uploadResume, uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/resume',
  protect,
  authorize('candidate'),
  uploadResume.single('resume'),
  uploadCandidateResume
);

router.post(
  '/image',
  protect,
  uploadImage.single('image'),
  uploadImageFile
);

export default router;

