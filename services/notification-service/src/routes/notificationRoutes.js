const express = require("express");
const { createNotification } = require("../controllers/notificationController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { validateNotification } = require("../middlewares/validateMiddleware");

const router = express.Router();

// Secure manual notification creation
router.post("/", protect, adminOnly, validateNotification, createNotification);

module.exports = router;
