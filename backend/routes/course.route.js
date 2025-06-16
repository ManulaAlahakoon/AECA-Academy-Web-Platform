import {
  createCourse,
  getCourses,
  updateCourse,
  toggleCourse,
  getEnabledCourses,
  getApprovedCourses
} from '../controllers/course.controller.js';
import express from 'express';

const router = express.Router();

router.post("/create-course", createCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.patch("/:id/toggle", toggleCourse);
router.get('/enabled-courses', getEnabledCourses);
router.get('/enrolled-courses', getApprovedCourses);



export default router;