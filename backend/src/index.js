import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { testConnection } from "./db.js";
import router from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "ScholarGraph backend is running 🚀" });
});

// Route to test Neo4j
app.get("/api/test-db", async (req, res) => {
  try {
    await testConnection();
    res.json({ status: "success", message: "Connected to Neo4j ✅" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
