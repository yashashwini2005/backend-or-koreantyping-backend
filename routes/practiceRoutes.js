// backend/routes/practiceRoutes.js
const express = require("express");
const PracticeText = require("../models/PracticeText");

const router = express.Router();

// GET /api/practice?level=basic&limit=5
router.get("/practice", async (req, res) => {
  try {
    const level = req.query.level || "basic";
    const limit = parseInt(req.query.limit || "10", 10);

    const texts = await PracticeText.find({ level }).limit(limit);
    res.json({ texts });
  } catch (err) {
    console.error("Error fetching practice texts:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// optional: get all texts
router.get("/practice/all", async (req, res) => {
  try {
    const texts = await PracticeText.find({});
    res.json({ texts });
  } catch (err) {
    console.error("Error fetching all texts:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
