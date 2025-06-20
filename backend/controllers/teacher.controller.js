import Course from '../models/course.model.js';
import User from '../models/user.model.js';

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

