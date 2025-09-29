// backend/controllers/submission.controller.js
import LectureMaterial from "../models/lectureMaterial.model.js";
import Submission from "../models/submission.model.js";

// Get all assignments (uploaded by teacher) + their submissions
export const getAssignmentsWithSubmissions = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Find assignments uploaded by this teacher
    const assignments = await LectureMaterial.find({
      uploadedBy: teacherId,
      type: "assignment",
    });

    const results = await Promise.all(
      assignments.map(async (assignment) => {
        const submissions = await Submission.find({
          assignmentId: assignment._id,
        })
          .populate("studentId", "name email")
          .populate("assignmentId", "topic course");

        return {
          assignmentId: assignment._id,
          title: assignment.topic, // your LectureMaterial schema uses `topic`
          dueDate: assignment.dueDate,
          course: assignment.course,
          submissions,
        };
      })
    );

    res.json({ success: true, assignments: results });
  } catch (err) {
    console.error("Error fetching assignments with submissions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Teacher: update grade for a submission
export const updateGrade = async (req, res) => {
  try {
    const { assignmentId, studentId, grade } = req.body;

    const submission = await Submission.findOneAndUpdate(
      { assignmentId, studentId },
      { grade },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json({ message: "Grade updated", submission });
  } catch (err) {
    console.error("Error updating grade:", err);
    res.status(500).json({ message: "Error updating grade" });
  }
};
