/**
 * app.js - API Gateway entry point
 */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const routes = require("./routes/index");

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("dev"));

// JSON parsing
app.use(express.json());

// Routes
app.use("/", routes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("API Gateway Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

module.exports = app;
