import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import nodemailer from "nodemailer";
// export const register = async (req, res) => {
//     const { name, email, password, role } = req.body;
  
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ success: false, message: "Please provide all fields" });
//     }
  
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ name, email, password: hashedPassword, role });
//       console.log(user)
//       await user.save();
//       res.status(201).json({ success: true, message: 'User registered' });
//     } catch (error) {
//       console.error("Error in Register user: ", error.message);
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// User Controller
export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    dateOfBirth,
    phone,
    address,
    country,
    occupation,
    bio,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password,
      role,
    };
    // Optional fields
    if (dateOfBirth) userData.dateOfBirth = dateOfBirth;
    if (phone) userData.phone = phone;
    if (address) userData.address = address;
    if (country) userData.country = country;
    if (occupation) userData.occupation = occupation;
    if (bio) userData.bio = bio;

    if (req.file) {
      userData.profilePicture = req.file.path;
    }

    const user = new User(userData);
    await user.save();
    res.status(201).json({ success: true, message: "User registered" });
  } catch (error) {
    console.error("Error in Register user:", error.message);
    res.status(500).json({ success: false, message: error.message || "Server Error" });

  }
};

  
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token, role: user.role, name: user.name,});

  } catch (error) {
    console.error("Error in Login user: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



// GET /users?role=teacher
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).json({ message: 'Role query parameter is required.' });
    }
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by role:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 


//forget password

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "If the email exists, reset instructions have been sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // Your frontend reset page

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "clonec641@gmail.com",       
        pass: "llpszdsynsebayss",      
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "AECA Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({ message: "Reset email sent successfully." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log("Reset password called");
  console.log("Received token:", token);
  console.log("Received password:", password);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    console.log("Saving user...");
    await user.save();
    console.log("Password reset success for", user.email);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error during reset:", err.message);
    return res.status(500).json({ message: "Something went wrong on the server" });
  }
};
