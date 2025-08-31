import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/google', AuthController.googleLogin);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/me', authenticateToken, AuthController.getMe);

export default router;