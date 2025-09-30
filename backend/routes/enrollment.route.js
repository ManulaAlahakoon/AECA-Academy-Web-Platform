import express from 'express';
import { enrollStudent, approveEnrollment, getPendingEnrollments, rejectEnrollment } from '../controllers/enrollment.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/:id/enroll', authenticateToken, upload.single('receipt'), enrollStudent);

// Admin route to approve enrollment
//router.patch('/:enrollmentId/approve', authenticateToken, approveEnrollment);


router.get('/pending', authenticateToken, getPendingEnrollments);
router.patch('/:id/approve', authenticateToken, approveEnrollment);
router.patch('/:id/reject', authenticateToken, rejectEnrollment);


export default router;
