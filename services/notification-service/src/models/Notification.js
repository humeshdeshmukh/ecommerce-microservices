/**
 * Notification.js
 * Simple in-memory model structure
 * (In real case, you’d use Mongo/Postgres to persist notifications)
 */
class Notification {
  constructor(userId, type, message) {
    this.userId = userId;
    this.type = type; // e.g., "email", "sms"
    this.message = message;
    this.timestamp = new Date();
  }
}

module.exports = Notification;
