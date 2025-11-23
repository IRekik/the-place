import express from "express";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../../../models/userModels";
import authenticateToken from "../../../middleware/authMiddleware";

const router = express.Router();

// Register new user
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await createUser({ username, email, password: hashedPassword });

    // Return success (excluding password)
    const userWithoutPassword = { ...newUser[0], password: undefined };
    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;