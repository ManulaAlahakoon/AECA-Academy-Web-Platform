// studentSubmission.route.js
import express from "express";
import { uploadSubmission } from "../middlewares/submissionUpload.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { submitAssignment, getSubmission, deleteSubmission } from "../controllers/studentSubmission.controller.js";

const router = express.Router();

router.post("/submit", authenticateToken, uploadSubmission, submitAssignment);
router.get("/:assignmentId", authenticateToken, getSubmission);
router.delete("/:submissionId", authenticateToken, deleteSubmission);

export default router;
