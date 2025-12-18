import express from 'express';
import {
    register,
    login,
    adminLogin,
    getMe,
    logout,
    updateProfile,
    updatePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
    registerValidation,
    loginValidation,
    updateProfileValidation,
} from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);
router.post('/admin/login', authLimiter, loginValidation, adminLogin);

// Protected routes
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.put('/password', protect, updatePassword);

export default router;
