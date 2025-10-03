/**
 * errorHandler.js
 * Utility for standardized error responses.
 */
function handleError(res, statusCode, message) {
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

module.exports = { handleError };
