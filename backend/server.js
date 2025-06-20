import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import courseRoutes from './routes/course.route.js';  
import { authenticateToken } from './middlewares/auth.middleware.js';
import enrollmentRoutes from './routes/enrollment.route.js';
import teacherRoutes from './routes/teacher.route.js';
import { checkUserEnabled } from "./middlewares/checkUserEnabled.middleware.js";

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

//Image 
app.use('/uploads', express.static('uploads'));



app.get("/user", (req, res) => {
   res.send("Server is ready") 
})

app.listen(5000, () => {
    connectDB()
    console.log("Server started at http://localhost:5000")
})


//GK3LWEDP5xRYO1fa