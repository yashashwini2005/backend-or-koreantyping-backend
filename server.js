// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const practiceRoutes = require("./routes/practiceRoutes");
// if you have userRoutes, you can also import them:
// const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// simple health check route
app.get("/", (req, res) => {
  res.send("Korean typing backend is running ✅");
});

// API routes
app.use("/api", practiceRoutes);
// app.use("/api/users", userRoutes); // only if you created this

// 🔥 IMPORTANT: use Render's PORT env variable
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

// connect to Mongo
connectDB();

module.exports = app;
