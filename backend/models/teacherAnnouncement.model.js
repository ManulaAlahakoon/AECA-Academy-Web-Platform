// models/teacherAnnouncement.model.js
import mongoose from "mongoose";

const teacherAnnouncementSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TeacherAnnouncement = mongoose.model("TeacherAnnouncement", teacherAnnouncementSchema);

export default TeacherAnnouncement;
