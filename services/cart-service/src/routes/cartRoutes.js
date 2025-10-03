/**
 * cartRoutes.js
 */
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

module.exports = router;
