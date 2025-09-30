// studentSubmission.controller.js
import Assignment from "../models/assignment.model.js";
import LectureMaterial from "../models/lectureMaterial.model.js";
import fs from "fs";

export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, course } = req.body;
    const studentId = req.user.id;

    const lectureAssignment = await LectureMaterial.findById(assignmentId);
if (!lectureAssignment) {
  return res.status(404).json({ message: "Assignment not found" });
}

await Assignment.deleteOne({ assignmentId, studentId });

const now = new Date();
const deadline = new Date(lectureAssignment.dueDate);
const isLate = now > deadline;

const newSubmission = new Assignment({
  assignmentId,
  studentId,
  course,
  filePath: req.file.path,
  fileName: req.file.filename,
  originalName: req.file.originalname,
  submittedAt: now,
  isLate,
});

await newSubmission.save();

    res.status(201).json({ success: true, submission: newSubmission });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { assignmentId } = req.params;
    const submission = await Assignment.findOne({ assignmentId, studentId });
    res.json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ message: "Error fetching submission" });
  }
};

export const deleteSubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { submissionId } = req.params;

    const submission = await Assignment.findById(submissionId);
    if (!submission) return res.status(404).json({ message: "Not found" });
    if (submission.studentId.toString() !== studentId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (fs.existsSync(submission.filePath)) {
      fs.unlinkSync(submission.filePath);
    }

    await Assignment.findByIdAndDelete(submissionId);
    res.json({ success: true, message: "Submission removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

