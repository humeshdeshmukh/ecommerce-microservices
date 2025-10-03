/**
 * app.js - Entry point
 */
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Routes
app.use("/products", productRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "product-service" }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`[Product Service] Running on port ${PORT}`));

module.exports = app;
