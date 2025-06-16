import Enrollment from '../models/enrollement.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';

export const enrollStudent = async (req, res) => {
  const { id } = req.params; // Course ID
  const studentId = req.user.id; // From authenticateToken middleware

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    const student = await User.findById(studentId);
    if (!student || !student.isEnabled) {
      return res.status(403).json({ message: 'Account disabled or user not found.' });
    }
console.log(req.file)
    // Check if receipt uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a payment receipt.' });
    }

    const newEnrollment = new Enrollment({
      student: studentId,
      course: id,
      receipt: req.file.path
    });

    await newEnrollment.save();

    res.json({ success: true, message: 'Enrollment submitted. Awaiting admin approval.' });
  } catch (err) {
    console.error('Enrollment error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Admin approval 
export const approveEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment = await Enrollment.findById(enrollmentId).populate('student');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found.' });
    }

    enrollment.status = 'approved';
    enrollment.validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await enrollment.save();

    res.json({ success: true, message: 'Enrollment approved and valid for 30 days.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};
