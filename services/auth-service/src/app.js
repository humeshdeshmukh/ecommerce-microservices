/**
 * app.js - Entry point for Auth Service
 */
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "auth-service" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Auth Service Error]", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[Auth Service] Running on port ${PORT}`));

module.exports = app;
