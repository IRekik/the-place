import express from "express";
import uploadBase64Image from "../../../../utils/cloudinaryIntegration";
import knexInstance from "../../../../utils/db";
import { authenticateToken } from "../../../../middleware/authMiddleware";

const router = express.Router();

// Post API endpoint: inserts post's attributes inside the database
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, text_content, img_reference } = req.body;
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const creation_date = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);

    let queryBuilder = knexInstance("blog_post").returning("*");

    if (!title || !text_content) {
      console.error(
        "Error submitting post data to the database: One or multiple fields are missing"
      );
      return res
        .status(400)
        .json({ error: "The request is either missing a title or content" });
    }

    if (img_reference) {
      const img_link = await uploadBase64Image(img_reference);
      queryBuilder = queryBuilder.insert({
        title,
        content: text_content,
        creation_date,
        img_reference: img_link,
      });
    } else {
      queryBuilder = queryBuilder.insert({
        title,
        content: text_content,
        creation_date,
      });
    }

    const result = await queryBuilder;

    process.env.NODE_ENV === "development" && console.log("Data inserted into the database:", result[0]);

    res.json({
      message: "Data received and inserted successfully",
      blog_id: result[0].blog_id,
    });
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
