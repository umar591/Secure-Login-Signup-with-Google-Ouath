import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { OAuth2Client } from "google-auth-library";

const User = db.User;
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signup failed", error: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password)
      return res
        .status(400)
        .json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
};

// ✅ Google Auth
export const googleAuth = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // 1. Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // 2. Check if user already exists
    let user = await User.findOne({ where: { email } });

    // 3. If not, create new user
    if (!user) {
      user = await User.create({ name, email, googleId });
    }

    // 4. Generate token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ user, token });
  } catch (err) {
    if (
      err.message.includes("Token used too late") ||
      err.message.includes("used too late")
    ) {
      return res
        .status(401)
        .json({ message: "Google token expired. Please try again." });
    }

    console.error("Google login error:", err);
    res
      .status(500)
      .json({ message: "Google login failed", error: err.message });
  }
};






