import express from 'express';
//mport { getAssignedEnabledCourses } from '../controllers/teacher.controller.js';
import { authenticateToken } from "../middlewares/auth.middleware.js";
//import { uploadLectureMaterial } from "../controllers/teacher.controller.js";
import { lectureMaterialUpload } from "../middlewares/lectureMaterialUpload.middleware.js";
//import { getAllLectureMaterialsByTeacher } from '../controllers/teacher.controller.js';
//import { uploadAssignment } from "../middlewares/assignmentUpload.middleware.js";
//import { deleteLectureMaterial } from "../controllers/teacher.controller.js";
import { getCourseFeedbackSentiments } from '../controllers/sentimentalAnalysis.controller.js';

import { getAssignedEnabledCourses,uploadLectureMaterial,getAllLectureMaterialsByTeacher,deleteLectureMaterial,uploadAssignmentController } from '../controllers/teacher.controller.js';
//import { authenticateToken} from "../middlewares/auth.middleware.js";
//import { lectureMaterialUpload } from "../middlewares/lectureMaterialUpload.middleware.js";
import { uploadAssignment,checkFileReceived } from "../middlewares/assignmentUpload.middleware.js";
import { getAssignmentsWithSubmissions  } from "../controllers/submission.controller.js";

const router = express.Router();

// GET /api/teacher/courses - Only assigned + enabled
router.get('/courses', getAssignedEnabledCourses);


router.post(
  "/materials/upload",
  authenticateToken,
  lectureMaterialUpload,
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

//router.get("/courses", getAssignedCourses);


router.get("/feedbacks/:courseId", getCourseFeedbackSentiments);

//newcode

router.post(
  "/assignments/upload",
  authenticateToken,
  uploadAssignment,
  checkFileReceived,
  uploadAssignmentController
);

router.get(
  "/submissions/:assignmentId",
  authenticateToken,
  getAssignmentsWithSubmissions
);

export default router;

