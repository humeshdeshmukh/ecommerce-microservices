/**
 * errorHandler.js
 * Reusable error handler
 */
function handleError(res, status, message) {
  res.status(status).json({ success: false, error: message });
}

module.exports = { handleError };
