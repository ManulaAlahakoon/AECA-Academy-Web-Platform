import LectureMaterial from "../models/lectureMaterial.model.js";

// student.controller.js
// export const getLectureMaterialsForStudents = async (req, res) => {
//   try {
//     const { courseName } = req.params;

//     const materials = await LectureMaterial.find({ course: courseName, isEnabled:true }).sort({ uploadedAt: -1 });
//     console.log("Found materials for course:", courseName, materials);
//     res.status(200).json({ success: true, materials });
//   } catch (error) {
//     console.error("Error fetching student materials:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const getLectureMaterialsForStudents = async (req, res) => {
  try {
    const { courseName } = req.params;

    // Lectures only
    const materials = await LectureMaterial.find({
      course: courseName,
      type: { $in: ["lecture", "assignment"] },
      isEnabled: true
    }).sort({ uploadedAt: -1 });

    console.log("Found materials and assignments for course:", courseName);
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error fetching student materials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// controllers/student.controller.js
import Enrollment from "../models/enrollement.model.js";
import Feedback from "../models/feedback.model.js";

// Get courses the student is enrolled in


export const getEnrolledCourses = async (req, res) => {
  const studentId = req.user.id;

  try {
    //  Find only approved + still valid enrollments
    const enrollments = await Enrollment.find({
      student: studentId,
      status: "approved",
      validUntil: { $gt: new Date() }, 
    }).populate({
      path: "course",
      select: "name assignedTeacher", // only return what we need
      populate: { path: "assignedTeacher", select: "name email" },
    });

    //  Extract courses safely (skip deleted/missing courses)
    const courses = enrollments
      .filter((e) => e.course)
      .map((e) => ({
        _id: e.course._id,
        name: e.course.name,
        teacher: e.course.assignedTeacher
          ? {
              _id: e.course.assignedTeacher._id,
              name: e.course.assignedTeacher.name,
              email: e.course.assignedTeacher.email,
            }
          : null,
      }));

    res.json({ success: true, courses });
  } catch (err) {
    console.error("getEnrolledCourses error:", err);
    res.status(500).json({ message: "Failed to fetch enrolled courses." });
  }
};

// Submit anonymous feedback
export const submitFeedback = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId, feedback } = req.body;

    if (!courseId || !feedback?.trim()) {
      return res.status(400).json({ message: "Course and feedback are required." });
    }

    // Verify student really has an approved enrollment
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: "approved"
    }).populate("course", "assignedTeacher");

    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in this course." });
    }

    if (!enrollment.course.assignedTeacher) {
      return res.status(500).json({ message: "Assigned teacher not found for this course." });
    }

    // Create feedback (anonymous: no student field stored)
    const newFeedback = await Feedback.create({
      course: courseId,
      teacher: enrollment.course.assignedTeacher._id,
      feedback: feedback.trim()
    });

    res.json({ message: "Feedback submitted successfully.", feedback: newFeedback });
  } catch (err) {
    console.error("submitFeedback error:", err);
    res.status(500).json({ message: "Error submitting feedback." });
  }
};
