import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      console.log(user)
      await user.save();
      res.status(201).json({ success: true, message: 'User registered' });
    } catch (error) {
      console.error("Error in Register user: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
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