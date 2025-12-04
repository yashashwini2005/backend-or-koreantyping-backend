// backend/routes/practiceRoutes.js
import express from "express";
import PracticeText from "../models/PracticeText.js";

const router = express.Router();

// GET /api/practice?level=basic&limit=20
router.get("/", async (req, res) => {
  const level = req.query.level || "basic";
  const limit = parseInt(req.query.limit || "30", 10);

  try {
    const docs = await PracticeText.find({ level }).limit(limit).lean();
    res.json({ ok: true, texts: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "db_error" });
  }
});

// POST /api/practice
router.post("/", async (req, res) => {
  const { text, level = "basic" } = req.body;
  if (!text) return res.status(400).json({ ok: false, error: "text_required" });

  try {
    const p = new PracticeText({ text, level });
    await p.save();
    res.status(201).json({ ok: true, text: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "db_error" });
  }
});

export default router;
