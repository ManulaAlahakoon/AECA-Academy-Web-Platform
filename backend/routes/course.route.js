import {
  createCourse,
  getCourses,
  updateCourse,
  toggleCourse
} from '../controllers/course.controller.js';
import express from 'express';

const router = express.Router();

router.post("/create-course", createCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.patch("/:id/toggle", toggleCourse);

export default router;