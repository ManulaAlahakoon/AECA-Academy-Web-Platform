import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

// Common Multer storage generator
const createStorage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `uploads/${folder}`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, req.user.id + ext);
    },
  });

// Common file filter
const imageFileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and GIF files are allowed.'), false);
  }
  cb(null, true);
};

// Student Multer config
export const uploadProfilePicture = multer({
  storage: createStorage("profile_pictures"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});


// Teacher Multer config
//export const uploadTeacherPicture = multer({
 // storage: createStorage("teacher-profile-pictures"),
  //limits: { fileSize: 5 * 1024 * 1024 },
  //fileFilter: imageFileFilter,
//});

// Helper to build full image URL
const getFullImageUrl = (req, filePath) => `${req.protocol}://${req.get("host")}${filePath}`;

// ==============================
// STUDENT PROFILE MANAGEMENT
// ==============================

// Upload profile picture
export const handleProfilePictureUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = `/uploads/profile_pictures/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: filePath },
      { new: true }
    ).select("-password");

    res.json({ success: true, profile: user });
  } catch (err) {
    console.error("Student image upload error:", err.message);
    res.status(500).json({ message: "Server error while uploading profile picture" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password;

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
};

/*
// TEACHER PROFILE MANAGEMENT
// ==============================

export const handleTeacherPictureUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = `/uploads/teacher-profile-pictures/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: filePath },
      { new: true }
    ).select("-password");

    res.json({ success: true, profile: user });
  } catch (err) {
    console.error("Teacher image upload error:", err.message);
    res.status(500).json({ message: "Upload error" });
  }
};

export const getTeacherProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTeacherProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password;

    const user = await User.findById(req.user.id).select("-password");
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.json({ success: true, profile: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const updateTeacherPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
};*/
