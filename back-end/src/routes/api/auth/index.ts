import express from "express";
import register from "./register";
import login from "./login";


const authRouter = express.Router();

authRouter.use("/register", register);
authRouter.use("/login", login);

export default authRouter;