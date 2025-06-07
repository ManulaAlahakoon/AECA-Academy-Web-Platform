import express from 'express';
import {register, login,getUsersByRole} from "../controllers/user.controller.js"
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get('/', getUsersByRole);


export default router;