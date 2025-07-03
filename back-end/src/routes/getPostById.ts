import express from "express";
import knexInstance from "../utils/db";
import authenticateToken from "../middleware/authMiddleware";

const router = express.Router();

// Get API endpoint: fetches from the database the post defined by the id provided
router.get("/:postId", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      console.log(
        "Error retrieving post from the database: The request does not include a post ID"
      );
      return res
        .status(404)
        .json({ error: "The request does not include a post ID" });
    }

    // Fetch the post from the database using knex
    const post = await knexInstance("blog_post")
      .where("blog_id", postId)
      .first();

    if (!post) {
      console.log("Post not found:", postId);
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("Post retrieved from the database:", post);
    return res.json(post);
  } catch (error) {
    console.error("Error retrieving post from the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
