// controllers/teacher.controller.js
import Feedback from "../models/feedback.model.js";
import Course from "../models/course.model.js";
import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY || "YOUR_HF_API_KEY";

// Get all courses assigned to the teacher
export const getAssignedCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const courses = await Course.find({ assignedTeacher: teacherId }).select("name");
    res.json({ courses });
  } catch (err) {
    console.error("getAssignedCourses error:", err);
    res.status(500).json({ message: "Server error fetching courses." });
  }
};

// Get feedback + sentiment analysis for a course
export const getCourseFeedbackSentiments = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, assignedTeacher: teacherId });
    if (!course) return res.status(403).json({ message: "You do not teach this course." });

    const feedbacks = await Feedback.find({ course: courseId, teacher: teacherId }).select("feedback");
    if (!feedbacks.length) return res.json({ feedbacks: [], summary: { POSITIVE: 0, NEGATIVE: 0 } });

    let sentimentCounts = { POSITIVE: 0, NEGATIVE: 0 };
    const analyzedFeedbacks = [];

    for (const f of feedbacks) {
      try {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
          { inputs: f.feedback },
          { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );

        const result = Array.isArray(response.data) ? response.data[0] : response.data;
        const labelObj = Array.isArray(result)
          ? result.reduce((max, cur) => (cur.score > max.score ? cur : max), result[0])
          : result;

        const label = labelObj.label;
        if (label === "POSITIVE" || label === "NEGATIVE") sentimentCounts[label]++;
        analyzedFeedbacks.push({ feedback: f.feedback, sentiment: label });

      } catch (err) {
        analyzedFeedbacks.push({ feedback: f.feedback, sentiment: "UNKNOWN" });
      }
    }

    const total = feedbacks.length;
    const summary = {
      POSITIVE: ((sentimentCounts.POSITIVE / total) * 100).toFixed(1),
      NEGATIVE: ((sentimentCounts.NEGATIVE / total) * 100).toFixed(1),
    };

    res.json({ feedbacks: analyzedFeedbacks, summary });

  } catch (err) {
    console.error("getCourseFeedbackSentiments error:", err);
    res.status(500).json({ message: "Server error fetching feedbacks." });
  }
};
