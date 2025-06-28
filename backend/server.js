
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { connectDB } from './config/db.js'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import courseRoutes from './routes/course.route.js';  
import { authenticateToken } from './middlewares/auth.middleware.js';
import enrollmentRoutes from './routes/enrollment.route.js';
import teacherRoutes from './routes/teacher.route.js';

import teacherAnnouncementRoutes from "./routes/teacherAnnouncement.routes.js";
import studentAnnouncementRoutes from "./routes/studentAnnouncement.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import studentRoutes from './routes/student.route.js';

import { checkUserEnabled } from "./middlewares/checkUserEnabled.middleware.js";

// Risna
import profileRoutes from './routes/profile.route.js';
import path from "path";
import { fileURLToPath } from 'url';
import feedbackRoutes from './routes/feedback.route.js';

// import User from './models/user.model.js';
// import bcrypt from 'bcrypt';

dotenv.config()
const app = express()

app.use(cors());
app.use(express.json())

//import jwt from 'jsonwebtoken';
//export const register =

app.use("/api/user", userRoutes)
app.use("/api/admin",authenticateToken,  adminRoutes)
app.use('/api/courses', authenticateToken,checkUserEnabled, courseRoutes);  // /api/courses
app.use('/api/enrollment', authenticateToken,checkUserEnabled, enrollmentRoutes);

//teacher routes
app.use('/api/teacher', authenticateToken,checkUserEnabled, teacherRoutes);

//teacher routes
app.use('/api/teacher', authenticateToken, teacherRoutes);
app.use("/api", teacherAnnouncementRoutes);
//Image 
app.use('/uploads', express.static('uploads'));
// Serve uploaded files

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/LectureMaterials", express.static(path.join(process.cwd(), "uploads/LectureMaterials")));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use('/LectureMaterials', express.static(path.join(__dirname, 'uploads/LectureMaterials')));
app.use('/assignments', express.static(path.join(__dirname, 'uploads/assignments')));


//student routes
app.use("/api/student", studentAnnouncementRoutes);
app.use('/api/student', studentRoutes);


//Risna
//const __filename = fileURLToPath(import.meta.url);

//Risna modification
//const __dirname = path.dirname(__filename);

//Risna
//app.use('/api/feedback',authenticateToken, feedbackRoutes);
app.use('/api/profile', authenticateToken, profileRoutes);
//app.use('/uploads', express.static(path.join(__dirname, "uploads")));



app.get("/user", (req, res) => {
   res.send("Server is ready") 
})

app.listen(5000, () => {
    connectDB()
    console.log("Server started at http://localhost:5000")
})



//GK3LWEDP5xRYO1fa