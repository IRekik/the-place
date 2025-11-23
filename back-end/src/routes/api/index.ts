import express from "express";
import blogPostRouter from "./blog-post/index";
import registerRouter from "./auth/index"

const apiRouter = express.Router();

apiRouter.use("/blog-post", blogPostRouter)
apiRouter.use("/auth", registerRouter)

export default apiRouter;