import express from 'express';
import { registerTeacher, getAdminDashboardStats, getCourseEnrollmentChart } from "../controllers/admin.controller.js"

const router = express.Router();

router.post("/teacher-registration", registerTeacher)
router.get('/dashboard', getAdminDashboardStats);
router.get('/enrollment-chart', getCourseEnrollmentChart);

export default router;