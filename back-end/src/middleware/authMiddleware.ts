import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = String(process.env.SECRET_KEY) || "undefined";

// Middleware that takes the secret key from the environment and uses JWT to verify the token from the http request
// It will verfies if the token signature is coherent and matches with the secret key. If not, it denies the request.
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  const [, rawToken] = tokenHeader.split(" ");
  const token = String(rawToken);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Forbidden - Token Expired" });
      } else {
        return res.status(403).json({ error: "Forbidden - Invalid Token" });
      }
    }
    if (typeof user !== "string" && typeof user === "object") {
      req.user = user as User;
    }
    next();
  });
};

// Middleware that checks a page password from request headers or body
const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // You can pass the password via header or body
  const pagePassword = req.header("x-page-password") || req.body?.pagePassword;

  if (!pagePassword) {
    return res.status(401).json({ error: "Unauthorized - Missing password" });
  }

  const correctPassword = process.env.PAGE_ACCESS_PWD;

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PWD is not set in environment variables.");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  if (pagePassword !== correctPassword) {
    return res.status(403).json({ error: "Forbidden - Incorrect password" });
  }

  // Password is correct, allow access
  next();
};

export { authenticateToken, loginMiddleware };
