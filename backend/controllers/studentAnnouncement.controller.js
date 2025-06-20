import Enrollment from "../models/enrollement.model.js";
import Course from "../models/course.model.js";
import TeacherAnnouncement from "../models/teacherAnnouncement.model.js";

export const getStudentAnnouncements = async (req, res) => {
  try {
    const studentId = req.user.id;

    //  Get approved enrollments for this student
    const enrollments = await Enrollment.find({
      student: studentId,
      status: "approved"
    });

    const courseIds = enrollments.map(e => e.course);

    // Find course names by their _id
    const courses = await Course.find({ _id: { $in: courseIds } });

    const courseNames = courses.map(c => c.name);

    // Find announcements for those course names
    const announcements = await TeacherAnnouncement.find({
      course: { $in: courseNames },
    }).sort({ date: -1 });

    res.status(200).json({ success: true, announcements });

  } catch (error) {
    console.error("Error fetching student announcements:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};