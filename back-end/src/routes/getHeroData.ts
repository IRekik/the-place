import express from "express";
import pool from "../utils/db";
import authenticateToken from "../middleware/authMiddleware";

const router = express.Router();

// GET API endpoint: fetches information related to home page's hero section, comments and users' numbers are just placeholders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT count(*) AS exact_count FROM blogs_table"
    );
    const threadNumber = Number(result.rows[0].exact_count);
    const commentNumber = 37;
    const userNumber = 43;
    console.log("Threads, comments and users retrieved:", threadNumber);
    res.json({
      threads: threadNumber,
      comments: commentNumber,
      users: userNumber,
    });
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
