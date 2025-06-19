// backend/controllers/adminController.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; 
import Course from '../models/course.model.js';
import Enrollment from '../models/enrollement.model.js';

export const registerTeacher = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Please provide name and email' });
  }

  try {
    // Check if teacher email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Generate random password
    const generatedPassword = crypto.randomBytes(5).toString('hex'); // 10-char random password

    // Hash the password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create teacher user
    const teacher = new User({
      name,
      email,
      password: hashedPassword,
      role: 'teacher'
    });

    await teacher.save();

    // Send email with credentials
    await sendTeacherWelcomeEmail(email, name, generatedPassword);

    res.status(201).json({ success: true, message: 'Teacher registered and credentials sent by email' });
  } catch (error) {
    console.error('Error registering teacher:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Helper to send email (placeholder example)
const sendTeacherWelcomeEmail = async (email, name, password) => {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'AECA Teacher Account Credentials',
    text: `Hello ${name},

Welcome to AECA Academy!

Your temporary password: ${password}

Please log in with your email and temporary password.

Best regards,
AECA Admin`
  };

  await transporter.sendMail(mailOptions);
};


export const getAdminDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalTeachers, totalStudents, totalCourses, pendingEnrollments] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'student' }),
      Course.countDocuments(),
      Enrollment.countDocuments({ status: 'pending' })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTeachers,
        totalStudents,
        totalCourses,
        pendingEnrollments
      }
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error retrieving dashboard stats" });
  }
};


export const getCourseEnrollmentChart = async (req, res) => {
  try {
    // Aggregate count of approved enrollments grouped by course
    const data = await Enrollment.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: 0,
          courseName: "$course.name",
          count: 1
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    console.error("Chart data error:", err);
    res.status(500).json({ message: "Server error while fetching chart data" });
  }
};