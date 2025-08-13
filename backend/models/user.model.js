// import mongoose from 'mongoose';

import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: true,
    default: 'student',
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  dateOfBirth: {  
    type: Date 
  },
  phone: { 
    type: String 
  },
  address: { 
    type: String 
  },
  country: { 
    type: String 
  },
  occupation: { 
    type: String 
  },
  profilePicture: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true,
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User = mongoose.model('User', userSchema);

export default User;

