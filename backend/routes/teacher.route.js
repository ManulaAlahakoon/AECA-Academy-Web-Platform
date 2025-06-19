import express from 'express';
import { getAssignedEnabledCourses } from '../controllers/teacher.controller.js';


const router = express.Router();

// GET /api/teacher/courses - Only assigned + enabled
router.get('/courses', getAssignedEnabledCourses);

export default router;