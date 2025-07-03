import express from "express";
import knexInstance from "../utils/db";
import authenticateToken from "../middleware/authMiddleware";

const router = express.Router();

// Edit API endpoint: update the database using a new title, text content of a given post id, while logging edit date
router.post("/:postId", authenticateToken, async (req, res) => {
  const { title, text_content } = req.body;

  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const edit_date = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);

  try {
    const postId = req.params.postId;

    if (!postId || !title || !text_content) {
      console.log(
        "Error editing post in the database: one or multiple fields are missing"
      );
      return res.status(404).json({
        error: "The request is either missing a title, content, or a blog ID",
      });
    }

    // Update the database using knex
    await knexInstance("blog_post").where("blog_id", postId).update({
      title,
      content: text_content,
      edit_date,
    });

    console.log("Data edited in the database");
    res.json({ message: "Data received and inserted successfully" });
  } catch (error) {
    console.error("Error editing data in the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
