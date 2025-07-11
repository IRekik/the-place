import express from "express";
import knexInstance from "../../../../utils/db";
import authenticateToken from "../../../../middleware/authMiddleware";

const router = express.Router();

// Get API endpoint: fetches all blog posts from the database, including all fields
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await knexInstance("blog_post")
      .select("*")
      .orderBy("creation_date", "desc");
    const data = result;

    if (!result) {
      throw new Error("No data found");
    }

    process.env.NODE_ENV === "development" && console.log("All blogs retrieved from the database:", data);
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
