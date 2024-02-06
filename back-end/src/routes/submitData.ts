import express from "express";
import uploadBase64Image from "../utils/cloudinaryIntegration";
import pool from "../utils/db";
import authenticateToken from "../utils/authMiddleware";

const router = express.Router();

// Post API endpoint: inserts post's attributes inside the database
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, text_content, img_reference } = req.body;
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const creation_date = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);

    let query;
    let params;
    if (title && text_content) {
      // Conditional for database insertion, depending whether an image has been provided or not
      if (img_reference) {
        const img_link = await uploadBase64Image(img_reference);
        query =
          "INSERT INTO blogs_table (title, content, creation_date, img_reference) VALUES ($1, $2, $3, $4) RETURNING *";
        params = [title, text_content, creation_date, img_link];
      } else {
        query =
          "INSERT INTO blogs_table (title, content, creation_date) VALUES ($1, $2, $3) RETURNING *";
        params = [title, text_content, creation_date];
      }
      const result = await pool.query(query, params);

      console.log("Data inserted into the database:", result.rows[0]);

      res.json({
        message: "Data received and inserted successfully",
        blog_id: result.rows[0].blog_id,
      });
      console.log(res);
    } else {
      console.log(
        "Error submitting post data to the database, one or multiple fields are missing"
      );
      res
        .status(404)
        .json({ error: "The request is either missing a title or content" });
    }
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
