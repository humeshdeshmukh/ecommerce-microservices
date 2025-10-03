/**
 * orderController.js - Express handlers
 */
const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;
    const order = await orderService.createOrder(userId, items, total);
    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getOrdersByUser(userId);
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};
