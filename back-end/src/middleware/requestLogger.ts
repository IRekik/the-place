import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime(); // High-res timer

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
    console.log(
      `[${req.originalUrl}] with ${req.method} method in ${durationInMs} ms`
    );
  });

  next();
};

export default requestLogger;
