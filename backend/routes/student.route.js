import express from 'express';
import { getLectureMaterialsForStudents } from '../controllers/student.controller.js';
import { getEnrolledCourses, submitFeedback } from "../controllers/student.controller.js";
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireStudentRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get('/materials/course/:courseName', authenticateToken, requireStudentRole, getLectureMaterialsForStudents);
router.get("/feedback/enrolled-courses", authenticateToken, requireStudentRole, getEnrolledCourses);
router.post("/feedback/submit-feedback", authenticateToken, requireStudentRole, submitFeedback);
export default router;
