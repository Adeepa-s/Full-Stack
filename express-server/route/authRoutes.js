import express from 'express';
import { signup, login, checkAuth } from '../controllers/authController.js';
import { logout, verifyToken } from '../controllers/logoutController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/check', authenticateToken, checkAuth);

export default router;