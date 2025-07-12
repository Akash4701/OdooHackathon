import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from './lib/db.config';
import questionRouter from "./routes/questionRoutes";

import answerRouter from "./routes/answerRoutes"
import voteRouter from "./routes/voteRoutes"

import routes from "./routes";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.get("/api/healthcheck", async (_req, res) => {
  try {
    await prisma.user.findFirst();
    res.status(200).json({ status: "ok", message: "Database connected" });
  } catch (err) {
    console.error("Healthcheck DB error:", err);
    res.status(500).json({ status: "error", message: "Database connection error" });
  }
});
app.use("/api/v1", routes);
app.use("/api/v1/question", questionRouter)
app.use("/api/v1/answer", answerRouter)
app.use("/api/v1/answer", voteRouter)

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
