import express from "express";
import cors from "cors";
import http from "http";

import apiRouter from "./routes/api";
import requestLogger from "./middleware/requestLogger";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(requestLogger);
app.use("/api", apiRouter);

const httpServer = http.createServer(app);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
