/**
 * Order.js - Sequelize Order model
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Order", {
  userId: { type: DataTypes.STRING, allowNull: false },
  items: { type: DataTypes.JSONB, allowNull: false }, // [{ productId, quantity }]
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "created" },
});

module.exports = Order;
