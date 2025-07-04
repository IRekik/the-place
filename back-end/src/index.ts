import express from "express";
import cors from "cors";
import http from "http";

import getAllPostsRouter from "./routes/getAllPosts";
import editPostRouter from "./routes/editPost";
import deletePostRouter from "./routes/deletePost";
import getPostByIdRouter from "./routes/getPostById";
import submitDataRouter from "./routes/submitData";
import getHeroData from "./routes/getHeroData";

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/get-all-posts", getAllPostsRouter);
app.use("/edit-post", editPostRouter);
app.use("/delete-post", deletePostRouter);
app.use("/get-post-by-id", getPostByIdRouter);
app.use("/submit-data", submitDataRouter);
app.use("/get-hero-data", getHeroData);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
