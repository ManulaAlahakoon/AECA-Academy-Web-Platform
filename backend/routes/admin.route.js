import express from 'express';
import {registerTeacher} from "../controllers/admin.controller.js"
const router = express.Router();

router.post("/teacher-registration", registerTeacher)

export default router;