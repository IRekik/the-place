import express from "express";
import knexInstance from "../../../../utils/db";
import authenticateToken from "../../../../middleware/authMiddleware";

const router = express.Router();

// Delete API endpoint: deletes element from the database using provided ID
router.delete("/:postId", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      console.log(
        "Error deleting post from the database: The request does not include a post ID"
      );
      return res
        .status(404)
        .json({ error: "The request does not include a post ID" });
    }

    // Delete the element from the database using knex
    const rowsAffected = await knexInstance("blog_post")
      .where("blog_id", postId)
      .del();

    if (rowsAffected === 1) {
      process.env.NODE_ENV === "development" && console.log("Post deleted from the database:", postId);
      return res.status(204).send();
    } else {
      console.error("Post not found:", postId);
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post from the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
