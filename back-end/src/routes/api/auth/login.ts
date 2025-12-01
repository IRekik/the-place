import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail, User } from "../../../models/userModels";

dotenv.config();

const SECRET_KEY = String(process.env.SECRET_KEY) || "undefined";

const router = express.Router();

// Login route: expects { email, password } in body
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) return res.status(400).json({ error: "Invalid credentials" });

    const passwordMatches = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatches) return res.status(400).json({ error: "Invalid credentials" });

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    } as Partial<User>;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const { password: _pw, ...userWithoutPassword } = existingUser as any;

    res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
