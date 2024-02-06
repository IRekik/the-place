import express from "express";
import pool from "../utils/db";
import authenticateToken from "../utils/authMiddleware";

const router = express.Router();

// Get API endpoint: fetches from the database the post defined by the id provided
router.get("/:postId", authenticateToken, async (req, res) => {
  try {
    if (req.params.postId) {
      const postId = req.params.postId;
      const result = await pool.query(
        "SELECT * FROM blogs_table WHERE blog_id = $1",
        [postId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      const post = result.rows[0];
      console.log("Post retrieved from the database:", post);
      res.json(post);
    } else {
      console.log(
        "Error retrieving post from the database, post ID is missing"
      );
      res.status(404).json({ error: "The request does not include a post ID" });
    }
  } catch (error) {
    console.error("Error retrieving post from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
