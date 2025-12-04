// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import practiceRoutes from "./routes/practiceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dbConnect from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// connect to MongoDB
dbConnect();

// routes
app.use("/api/practice", practiceRoutes);
app.use("/api/users", userRoutes);

// health check
app.get("/api/health", (req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV || "dev" })
);

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
