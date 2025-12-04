// backend/models/PracticeText.js
import mongoose from "mongoose";

const PracticeTextSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { type: String, default: "basic" }, // basic | phrase | sentence
  language: { type: String, default: "ko" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.PracticeText ||
  mongoose.model("PracticeText", PracticeTextSchema);
