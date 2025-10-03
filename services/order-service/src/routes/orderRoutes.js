/**
 * orderRoutes.js
 */
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createOrder, getOrders, getOrder } = require("../controllers/orderController");

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrder);

module.exports = router;
