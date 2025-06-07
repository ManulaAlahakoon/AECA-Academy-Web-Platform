// backend/controllers/adminController.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; 

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
