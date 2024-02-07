import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

export default authenticateToken;
