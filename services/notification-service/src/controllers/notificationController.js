/**
 * notificationController.js
 * Controller for manual notification triggers
 */
const { sendNotification } = require("../services/notificationService");

exports.createNotification = async (req, res, next) => {
  try {
    const { userId, type, message } = req.body;
    const notification = await sendNotification(userId, type, message);
    res.status(201).json({ success: true, notification });
  } catch (err) {
    next(err);
  }
};
