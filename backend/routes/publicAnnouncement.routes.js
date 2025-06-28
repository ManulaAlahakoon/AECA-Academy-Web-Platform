// routes/publicAnnouncement.routes.js
import express from "express";
import {
  createPublicAnnouncement,
  getPublicAnnouncements,
} from "../controllers/publicAnnouncement.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/admin/announcement", authenticateToken, createPublicAnnouncement);
router.get("/student/public-announcements", getPublicAnnouncements);

export default router;
