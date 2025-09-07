import express from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { getUserProfile, updateUserProfile, createOrUpdateUser } from '../controllers/userController.js';

const router = express.Router();

// Public route for user registration (Clerk webhook)
router.post('/register', createOrUpdateUser);

// Protected routes - require authentication
router.get('/profile', requireAuth, getUserProfile);
router.put('/profile', requireAuth, updateUserProfile);

export default router;