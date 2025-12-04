// backend/routes/userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ ok: false, error: "email_password_required" });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ ok: false, error: "user_exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();

    const token = jwt.sign(
      { uid: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(201).json({
      ok: true,
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "db_error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ ok: false, error: "email_password_required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ ok: false, error: "invalid_credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(400).json({ ok: false, error: "invalid_credentials" });

    const token = jwt.sign(
      { uid: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({
      ok: true,
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "db_error" });
  }
});

export default router;
