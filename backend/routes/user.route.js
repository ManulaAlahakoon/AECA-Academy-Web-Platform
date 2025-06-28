import express from 'express';
import {register, login,getUsersByRole} from "../controllers/user.controller.js"
import {
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get('/', getUsersByRole);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;