// assignment.model.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LectureMaterial",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    default: "Pending",
  },
  isLate: {
  type: Boolean,
  default: false,
  },
});

export default mongoose.model("Assignment", assignmentSchema);

