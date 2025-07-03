import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import db from './config/db.js';




dotenv.config();
const app = express();

// Middleware
// app.use(cors({
//   origin: 'http://localhost:5000',
  
//   credentials: true
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRoutes);


db.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
