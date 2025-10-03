/**
 * Transaction.js - Sequelize model for payments
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Transaction = sequelize.define("Transaction", {
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, success, failed
});

module.exports = Transaction;
