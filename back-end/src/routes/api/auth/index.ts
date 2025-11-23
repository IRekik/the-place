import express from "express";
import register from "./register";

const authRouter = express.Router();

authRouter.use("/register", register);

export default authRouter;