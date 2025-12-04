// backend/models/PracticeText.js
const mongoose = require("mongoose");

const practiceTextSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },         // Korean phrase
    level: { type: String, default: "basic" },      // basic / sentence etc.
    meaning: { type: String, default: "" },         // English meaning
    romanized: { type: String, default: "" }        // e.g. annyeonghaseyo
  },
  { timestamps: true }
);

const PracticeText = mongoose.model("PracticeText", practiceTextSchema);

module.exports = PracticeText;
