/**
 * app.js - Entry point for Payment Service
 */
const express = require("express");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();
sequelize.sync();

// Routes
app.use("/payments", paymentRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "payment-service" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("[Payment Service Error]", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`[Payment Service] Running on port ${PORT}`));

module.exports = app;
