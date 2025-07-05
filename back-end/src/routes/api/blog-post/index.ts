import express from "express";
import getAllPostsRouter from "./endpoints/getAllPosts";
import editPostRouter from "./endpoints/editPost";
import deletePostRouter from "./endpoints/deletePost";
import getPostByIdRouter from "./endpoints/getPostById";
import submitDataRouter from "./endpoints/submitData";
import getHeroDataRouter from "./endpoints/getHeroData";

const blogPostRouter = express.Router();

blogPostRouter.use("/get-all-posts", getAllPostsRouter);
blogPostRouter.use("/edit-post", editPostRouter);
blogPostRouter.use("/delete-post", deletePostRouter);
blogPostRouter.use("/get-post-by-id", getPostByIdRouter);
blogPostRouter.use("/submit-data", submitDataRouter);
blogPostRouter.use("/get-hero-data", getHeroDataRouter);

export default blogPostRouter;