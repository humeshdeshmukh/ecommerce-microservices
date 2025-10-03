/**
 * notificationService.js
 * Handles notification logic
 */
const Notification = require("../models/Notification");

async function sendNotification(userId, type, message) {
  const notification = new Notification(userId, type, message);

  // Simulate sending notification (log instead of real email/SMS)
  console.log(`[Notification] (${notification.type}) → User ${userId}: ${notification.message}`);

  return notification;
}

module.exports = { sendNotification };
