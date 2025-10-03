/**
 * validateMiddleware.js
 * Simple validation middleware for request bodies
 */

function validateNotification(req, res, next) {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({
      error: "userId, type, and message are required",
    });
  }

  next();
}

module.exports = { validateNotification };
