import express from 'express';
import { getProfile, updateProfile, deleteAccount } from '../controllers/profile.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);
router.delete('/', authenticateToken, deleteAccount);

export default router;
