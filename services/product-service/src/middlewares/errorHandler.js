/**
 * errorHandler.js
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  console.error("[Product Service Error]", err.stack || err.message);
  res.status(500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
