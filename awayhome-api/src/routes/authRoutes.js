// src/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getUserDetails } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getUserDetails); // Protected route

export default router;
