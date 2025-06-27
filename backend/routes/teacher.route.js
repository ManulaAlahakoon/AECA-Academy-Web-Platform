import express from 'express';
import { getAssignedEnabledCourses } from '../controllers/teacher.controller.js';
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { uploadLectureMaterial } from "../controllers/teacher.controller.js";
import { uploadLectureMaterial as uploadMiddleware } from "../middlewares/lectureMaterialUpload.middleware.js";
import { getAllLectureMaterialsByTeacher } from '../controllers/teacher.controller.js';
import { uploadAssignment } from "../middlewares/assignmentUpload.middleware.js";
import { deleteLectureMaterial } from "../controllers/teacher.controller.js";


const router = express.Router();

// GET /api/teacher/courses - Only assigned + enabled
router.get('/courses', getAssignedEnabledCourses);


router.post(
  "/materials/upload",
  authenticateToken,
  uploadMiddleware,
  uploadLectureMaterial
);
router.get("/materials-by-teacher", authenticateToken, getAllLectureMaterialsByTeacher);

router.post(
  "/assignments/upload",
  authenticateToken,
  uploadAssignment,
  uploadLectureMaterial
);

router.delete(
  "/materials/:id",
  authenticateToken,
  deleteLectureMaterial
);

export default router;

