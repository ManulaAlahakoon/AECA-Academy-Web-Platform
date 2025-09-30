import Enrollment from '../models/enrollement.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import nodemailer from 'nodemailer';

// export const enrollStudent = async (req, res) => {
//   const { id } = req.params; // Course ID
//   const studentId = req.user.id; // From authenticateToken middleware

//   try {
//     const course = await Course.findById(id);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found.' });
//     }

//     const student = await User.findById(studentId);
//     if (!student || !student.isEnabled) {
//       return res.status(403).json({ message: 'Account disabled or user not found.' });
//     }
// console.log(req.file)
//     // Check if receipt uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'Please upload a payment receipt.' });
//     }

//     const newEnrollment = new Enrollment({
//       student: studentId,
//       course: id,
//       receipt: req.file.path
//     });

//     await newEnrollment.save();

//     res.json({ success: true, message: 'Enrollment submitted. Awaiting admin approval.' });
//   } catch (err) {
//     console.error('Enrollment error:', err.message);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

export const enrollStudent = async (req, res) => {
  const { id } = req.params; // Course ID
  const studentId = req.user.id;

  try {
    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Check if student is enabled
    const student = await User.findById(studentId);
    if (!student || !student.isEnabled) {
      return res.status(403).json({ message: 'Account disabled or user not found.' });
    }

    // Check if receipt is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a payment receipt.' });
    }

    // Check for existing valid or pending enrollment
    const existing = await Enrollment.findOne({
      student: studentId,
      course: id,
      $or: [
        { status: 'pending' },
        { status: 'approved', validUntil: { $gt: new Date() } }
      ]
    });

    if (existing) {
      return res.status(400).json({
        message: 'You already have an active or pending enrollment for this course.'
      });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({
      student: studentId,
      course: id,
      receipt: req.file.path,
      status: 'pending'
    });

    await newEnrollment.save();

    res.status(201).json({
      success: true,
      message: 'Enrollment submitted. Awaiting admin approval.'
    });
  } catch (err) {
    console.error('Enrollment error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Admin approval 
// export const approveEnrollment = async (req, res) => {
//   const { enrollmentId } = req.params;
//   try {
//     const enrollment = await Enrollment.findById(enrollmentId).populate('student');
//     if (!enrollment) {
//       return res.status(404).json({ message: 'Enrollment not found.' });
//     }

//     enrollment.status = 'approved';
//     enrollment.validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//     await enrollment.save();

//     res.json({ success: true, message: 'Enrollment approved and valid for 30 days.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
};

export const getPendingEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: 'pending' })
      .populate('student', 'name email')
      .populate('course', 'name monthlyFee');
    res.json({ enrollments });
    console.log(enrollments)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findById(id).populate('student').populate('course');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found.' });
    }
    enrollment.status = 'approved';
    enrollment.validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await enrollment.save();

    await sendEmail(
      enrollment.student.email,
      `Enrollment Approved: ${enrollment.course.name}`,
      `Congratulations ${enrollment.student.name}, your enrollment has been approved! You now have 30 days of access.`
    );

    res.json({ success: true, message: 'Enrollment approved and email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const rejectEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findById(id).populate('student').populate('course');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found.' });
    }
    enrollment.status = 'rejected';
    await enrollment.save();

    // Send email to student
    await sendEmail(
      enrollment.student.email,
      `Enrollment Rejected: ${enrollment.course.name}`,
      `Hello ${enrollment.student.name}, unfortunately your enrollment has been rejected. Please contact the admin for more details.`
    );

    res.json({ success: true, message: 'Enrollment rejected and email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

