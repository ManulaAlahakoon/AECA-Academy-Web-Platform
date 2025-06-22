import express from 'express';
import {register, login,getUsersByRole} from "../controllers/user.controller.js"
import { uploadProfilePicture } from '../middlewares/upload.middleware.js';

const router = express.Router();

//router.post("/register", register)
router.post("/login", login)
router.get('/', getUsersByRole);
router.post('/register', uploadProfilePicture.single('profilePicture'), register);
//router.post('/register', upload.single("profilePicture"), register);

export default router;