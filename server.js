// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const practiceRoutes = require("./routes/practiceRoutes");
// const userRoutes = require("./routes/userRoutes"); // only if you created this

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Korean typing backend is running ✅");
});

// routes
app.use("/api", practiceRoutes);
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

connectDB();
