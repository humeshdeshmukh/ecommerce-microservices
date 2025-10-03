/**
 * paymentController.js - Express handlers
 */
const paymentService = require("../services/paymentService");

exports.makePayment = async (req, res, next) => {
  try {
    const { orderId, amount } = req.body;
    const userId = req.user.id;

    const transaction = await paymentService.processPayment(orderId, userId, amount);

    res.status(201).json({ success: true, transaction });
  } catch (err) {
    next(err);
  }
};

exports.getUserTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const transactions = await paymentService.getTransactions(userId);
    res.json({ success: true, transactions });
  } catch (err) {
    next(err);
  }
};
