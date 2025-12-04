import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import practiceRoutes from "./routes/practice.js";  // <- your routes file name

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", practiceRoutes);

// --- IMPORTANT CHANGE ---
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
