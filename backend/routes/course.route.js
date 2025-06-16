import {
  createCourse,
  getCourses,
  updateCourse,
  toggleCourse,
  getEnabledCourses
} from '../controllers/course.controller.js';
import express from 'express';

const router = express.Router();

router.post("/create-course", createCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.patch("/:id/toggle", toggleCourse);
router.get('/enabled-courses', getEnabledCourses);


export default router;