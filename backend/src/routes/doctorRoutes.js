import express from 'express';
import { requireAuth } from '../middlewares/auth.js';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  searchDoctors,
  addReview
} from '../controllers/doctorController.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/search', searchDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.post('/', requireAuth, createDoctor);
router.put('/', requireAuth, updateDoctor);
router.post('/:doctorId/reviews', requireAuth, addReview);

export default router;

