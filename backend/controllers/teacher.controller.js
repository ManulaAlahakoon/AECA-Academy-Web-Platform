import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import LectureMaterial from "../models/lectureMaterial.model.js";
import fs from "fs";
import path from "path";


export const getAssignedEnabledCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;      

    // Check if the teacher is enabled
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher' || teacher.isEnabled === false) {
      return res.status(403).json({ success: false, message: 'Access denied. Teacher account disabled or invalid.' });
    }

    // Fetch only assigned and enabled courses
    const courses = await Course.find({
      assignedTeacher: teacherId,
      isEnabled: true
    }).populate('assignedTeacher', 'name email');

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching assigned courses:", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const uploadLectureMaterial = async (req, res) => {
  try {
    const { course,type, topic, dueDate  } = req.body;

    console.log("🛠 Upload received: ", {
      course,
      dueDate: type === "assignment" ? dueDate : undefined,
      filePath: req.file.path.replace(/\\/g, "/"),
      originalName: req.file.originalname,
      fileName: req.file.filename,
      uploadedBy: req.user.id,
      type: req.body.type || "lecture",
    });

    if (!req.file || !course) {
      console.log("❌ req.file missing. Upload failed")
      return res.status(400).json({ success: false, message: "Course and file are required." });
    }

    const material = new LectureMaterial({
      course,
      topic,
      dueDate: type === "assignment" ? dueDate : null,
      filePath: req.file.path.replace(/\\/g, "/"),
      originalName: req.file.originalname,
      fileName: req.file.filename,
      uploadedBy: req.user.id,
      type: req.body.type || "lecture",
    });

    await material.save();

    res.status(201).json({ success: true, material });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllLectureMaterialsByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const materials = await LectureMaterial.find({ uploadedBy: teacherId }).sort({
      uploadedAt: -1,
    });

    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error fetching all materials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteLectureMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.id;

    const material = await LectureMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }

    // Confirm only the uploader (teacher) can delete
    if (material.uploadedBy.toString() !== teacherId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Delete file from backend folder
    const filePath = path.resolve(material.filePath); // Convert relative to absolute
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted from:", filePath);
    } else {
      console.warn("⚠️ File not found at:", filePath);
    }

    // Delete document from MongoDB
    await LectureMaterial.findByIdAndDelete(id);
    console.log("DB document deleted:", id);

    res.json({ success: true, message: "Material fully deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get students enrolled in a specific course
// export const getEnrolledStudentsByCourseId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const course = await Course.findById(id)
//       .populate("enrolledStudents", "name email");

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json({ students: course.enrolledStudents });
//   } catch (error) {
//     console.error("Error fetching enrolled students:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const uploadAssignmentController = async (req, res) => {
  try {
    const { course, topic, dueDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    const newAssignment = new LectureMaterial({
      course,
      topic,
      type: "assignment",   //  distinguish assignment from lecture
      dueDate,
      uploadedBy: req.user.id,
      filePath: req.file.path.replace(/\\/g, "/"),
      fileName: req.file.filename,
      originalName: req.file.originalname,
    });

    await newAssignment.save();

    res.status(201).json({ success: true, assignment: newAssignment });
  } catch (err) {
    console.error("Upload assignment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};