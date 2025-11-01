// backend/controllers/adminController.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; 
import Course from '../models/course.model.js';
import Enrollment from '../models/enrollement.model.js';
import LectureMaterial from "../models/lectureMaterial.model.js";
import { sendEmail } from "../utils/sendEmail.js";


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

export const getRecentActivity = async (req, res) => {
  try {
    const [recentUsers, recentCourses, recentEnrollments] = await Promise.all([
      User.find().sort({ createdAt: -1 }).limit(5),
      Course.find().sort({ createdAt: -1 }).limit(5),
      Enrollment.find({ status: "approved" })
        .sort({ updatedAt: -1 })
        .limit(5)
        .populate("student")
        .populate("course"),
    ]);

    res.json({
      success: true,
      data: {
        users: recentUsers,
        courses: recentCourses,
        enrollments: recentEnrollments,
      },
    });
  } catch (err) {
    console.error("Recent activity error:", err);
    res.status(500).json({ message: "Failed to fetch recent activity" });
  }
};

export const getWeeklySignups = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // includes today

    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          role: "student"
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill missing days
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const str = date.toISOString().slice(0, 10);
      const match = data.find(d => d._id === str);
      result.push({ date: str, count: match ? match.count : 0 });
    }

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Weekly signup error:", err);
    res.status(500).json({ message: "Could not fetch signup stats" });
  }
};

// User enabling and disabling

export const getEnrolledStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ course: courseId, status: "approved" })
      .populate("student", "name email role dateOfBirth phone address country occupation bio profilePicture isEnabled createdAt"); 

    const students = enrollments.map((e) => e.student);
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students." });
  }
};

export const updateStudentStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    user.isEnabled = !user.isEnabled;
    await user.save();

    res.json({ success: true, isEnabled: user.isEnabled });
  } catch (error) {
    res.status(500).json({ message: "Error updating student status" });
  }

};


//Lecture material enabaling and diabling

// Get materials for a specific course
export const getMaterialsByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    const materials = await LectureMaterial.find({ course })
      .populate('uploadedBy', 'name email')
      .sort({ uploadedAt: -1 });

    res.status(200).json({ success: true, materials });
  } catch (err) {
    console.error("Fetch failed:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Toggle enable/disable material
export const toggleMaterialStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await LectureMaterial.findById(id).populate('uploadedBy');
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }

    material.isEnabled = !material.isEnabled;
    await material.save();

    // Send email if disabled
    if (!material.isEnabled) {
      await sendEmail(
        material.uploadedBy.email,
        "Your material was disabled",
        `Hello ${material.uploadedBy.name},

Your uploaded material "${material.originalName}" in course "${material.course}" was disabled by admin.`
      );
    }

    res.json({ success: true, message: `Material ${material.isEnabled ? 'enabled' : 'disabled'}` });
  } catch (err) {
    console.error("Toggle failed:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Vieving lecture materials for admin


export const getCourseMaterials = async (req, res) => {
  const { courseName } = req.params;
  try {
    const materials = await LectureMaterial.find({ course: courseName })
      .populate('uploadedBy', 'name email')
      .sort({ uploadedAt: -1 });
    
    res.json({ success: true, materials });
  } catch (err) {
    console.error("Error fetching course materials:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


import Feedback from "../models/feedback.model.js";
import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY || "YOUR_HF_API_KEY";

// Get all courses (Admin can see all)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isEnabled: true }).select("name");
    res.json({ courses });
  } catch (err) {
    console.error("getAllCourses error:", err);
    res.status(500).json({ message: "Server error fetching courses." });
  }
};


// Get feedbacks + sentiment for a course (Admin)
export const getCourseFeedbackSentimentsAdmin = async (req, res) => {
  try {
    const { courseId } = req.params;

    const feedbacks = await Feedback.find({ course: courseId }).select("feedback");
    if (!feedbacks.length)
      return res.json({ feedbacks: [], summary: { POSITIVE: 0, NEGATIVE: 0 } });

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
    console.error("getCourseFeedbackSentimentsAdmin error:", err);
    res.status(500).json({ message: "Server error fetching feedbacks." });
  }
};