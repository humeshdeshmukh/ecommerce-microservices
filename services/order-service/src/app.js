/**
 * app.js - Entry point for Order Service
 */
const express = require("express");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();
sequelize.sync(); // auto-create tables

// Routes
app.use("/orders", orderRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "order-service" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("[Order Service Error]", err.message);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`[Order Service] Running on port ${PORT}`));

module.exports = app;
