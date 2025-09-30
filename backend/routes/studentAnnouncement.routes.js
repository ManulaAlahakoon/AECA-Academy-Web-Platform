import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getStudentAnnouncements } from "../controllers/studentAnnouncement.controller.js";

const router = express.Router();

router.get("/announcements", authenticateToken, getStudentAnnouncements);

export default router;
