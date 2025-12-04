// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const practiceRoutes = require("./routes/practiceRoutes");
// const userRoutes = require("./routes/userRoutes"); // only if you actually have this file

dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// simple health check
app.get("/", (req, res) => {
  res.send("Korean typing backend is running ✅");
});

// API routes
app.use("/api", practiceRoutes);
// app.use("/api/users", userRoutes); // only if userRoutes.js exists and you want auth

// IMPORTANT: Render gives PORT in environment
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

module.exports = app;
