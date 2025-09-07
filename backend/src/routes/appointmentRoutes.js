import express from 'express';
import { requireAuth } from '../middlewares/auth.js';
import {
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

// All routes are protected
router.post('/book', requireAuth, bookAppointment);
router.get('/my-appointments', requireAuth, getUserAppointments);
router.put('/:appointmentId/cancel', requireAuth, cancelAppointment);
router.get('/doctor-appointments', requireAuth, getDoctorAppointments);
router.put('/:appointmentId/status', requireAuth, updateAppointmentStatus);

export default router;

