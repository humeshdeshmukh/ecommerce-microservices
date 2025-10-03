const express = require("express");
const morgan = require("morgan");
const { connectKafka, consumer } = require("./config/kafka");
const notificationRoutes = require("./routes/notificationRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/notifications", notificationRoutes);

// Health
app.get("/health", (req, res) =>
  res.json({ status: "ok", service: "notification-service" })
);

// Error handler middleware
app.use(errorHandler);

// (Kafka consumer logic same as before)

module.exports = app;
