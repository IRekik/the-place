import express from "express";
import knexInstance from "../../../../utils/db";
import { authenticateToken } from "../../../../middleware/authMiddleware";
import { numberOfUsers } from "../../../../models/userModels";

const router = express.Router();

// GET API endpoint: fetches information related to home page's hero section, comments and users' numbers are just placeholders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const theadNumberQ = await knexInstance("blog_post")
      .count("* as exact_count")
      .first();
      if (!theadNumberQ || !theadNumberQ.exact_count) {
        throw new Error("No data found for the threads");
      }
    const threadNumber = Number(theadNumberQ.exact_count);
    
    const userNumber = await numberOfUsers();
    console.log("User number retrieved:", userNumber);

    // No comments at the moment
    const commentNumber = 0;
    process.env.NODE_ENV === "development" && console.log("Threads, comments and users retrieved:", threadNumber);
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
