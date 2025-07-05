import express from "express";
import blogPostRouter from "./blog-post/index";

const apiRouter = express.Router();

apiRouter.use("/blog-post", blogPostRouter)

export default apiRouter;