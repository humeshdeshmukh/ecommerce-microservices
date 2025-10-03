/**
 * paymentRoutes.js
 */
const express = require("express");
const { makePayment, getUserTransactions } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", makePayment);
router.get("/", getUserTransactions);

module.exports = router;
