// routes/teacherAnnouncement.routes.js
import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
  postAnnouncement,
  getTeacherAnnouncements,
  getAnnouncementsByCourse,
} from "../controllers/teacherAnnouncement.controller.js";

const router = express.Router();

// Teacher routes
router.post("/teacher/announcements", authenticateToken, postAnnouncement);
router.get("/teacher/announcements", authenticateToken, getTeacherAnnouncements);

// Student/public route
router.get("/announcements", getAnnouncementsByCourse);

export default router;
