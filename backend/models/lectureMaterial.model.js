import mongoose from "mongoose";

const lectureMaterialSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  type: {
  type: String,
  enum: ["lecture", "assignment"],
  default: "lecture"
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  isEnabled: {
    type: Boolean,
    default: true
  }
});

const LectureMaterial = mongoose.model("LectureMaterial", lectureMaterialSchema);

export default LectureMaterial;
