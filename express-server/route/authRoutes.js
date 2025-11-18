import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { logout, verifyToken } from '../controllers/logoutController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifyToken);

export default router;