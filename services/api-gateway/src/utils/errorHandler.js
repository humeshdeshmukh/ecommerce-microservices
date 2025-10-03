/**
 * errorHandler.js
 * Reusable error response helper
 */
function handleError(res, status, message) {
  res.status(status).json({ error: message });
}

module.exports = { handleError };
