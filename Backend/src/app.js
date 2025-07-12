import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import prisma from './db/db.config.js'

dotenv.config({ path: './.env' });


// import useRouter from "./routes/events.route.js";

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.get("/api/healthcheck", async (req, res) => {
  try {
    // Try a basic Prisma call to ensure DB is connected
    await prisma.user.findFirst();  // Doesn't return anything if empty, but checks connection
    res.status(200).json({ status: "ok", message: "Database connected" });
  } catch (err) {
    console.error("Healthcheck DB error:", err);
    res.status(500).json({ status: "error", message: "Database connection error" });
  }
});

// app.use("/api/events", useRouter);


process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

export { app}; 
