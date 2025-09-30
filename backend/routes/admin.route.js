import express from 'express';

import { registerTeacher, getAdminDashboardStats, getCourseEnrollmentChart, getRecentActivity, getWeeklySignups, getEnrolledStudentsByCourse, updateStudentStatus, getMaterialsByCourse, toggleMaterialStatus, getCourseMaterials } from "../controllers/admin.controller.js"


const router = express.Router();

router.post("/teacher-registration", registerTeacher)
router.get('/dashboard', getAdminDashboardStats);
router.get('/enrollment-chart', getCourseEnrollmentChart);
router.get('/recent-activity', getRecentActivity);
router.get('/weekly-signups', getWeeklySignups);

 //User management
router.get("/course/:courseId/enrolled-students", getEnrolledStudentsByCourse);
router.patch("/user/:userId/toggle-status", updateStudentStatus);

// Material management
router.get("/materials/:course", getMaterialsByCourse);
router.patch("/materials/:id/toggle", toggleMaterialStatus);

//Lecture material viewing
router.get("/materials/course/:courseName",getCourseMaterials);     

export default router;