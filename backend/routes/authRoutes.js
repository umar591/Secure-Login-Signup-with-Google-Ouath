import express from "express";
import { signup, login, googleAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleAuth);

export default router;
