// backend/routes/profile.route.js
import express from "express";
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfilePicture,
  handleProfilePictureUpload,
  // getTeacherProfile,
  // updateTeacherProfile,
  // updateTeacherPassword,
  // uploadTeacherPicture,
  // handleTeacherPictureUpload,
} from "../controllers/profile.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Student routes
router.get("/", getProfile);
router.put("/update", updateProfile);
router.patch("/password", updatePassword);
router.post(
  "/upload-picture",
  uploadProfilePicture.single("profilePicture"),
  handleProfilePictureUpload
);
/*
// Teacher routes
router.get("/teacher/profile", getTeacherProfile);
router.put("/teacher/profile", updateTeacherProfile);
router.patch("/teacher/profile/password", updateTeacherPassword);
router.post(
  "/teacher/profile/upload-picture",
  uploadTeacherPicture.single("profilePicture"),
  handleTeacherPictureUpload
);

*/
export default router;
