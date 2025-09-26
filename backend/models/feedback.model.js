import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Teacher
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
