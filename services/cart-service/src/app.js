/**
 * app.js - Entry point for Cart Service
 */
const express = require("express");
const morgan = require("morgan");
const { connectRedis } = require("./config/db");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect Redis
connectRedis();

// Routes
app.use("/cart", cartRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "cart-service" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("[Cart Service Error]", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`[Cart Service] Running on port ${PORT}`));

module.exports = app;
