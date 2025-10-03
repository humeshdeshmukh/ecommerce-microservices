/**
 * orderService.js - Business logic
 */
const Order = require("../models/Order");
const { producer } = require("../utils/kafka");

async function createOrder(userId, items, total) {
  const order = await Order.create({ userId, items, total });

  // Publish Kafka event
  const eventPayload = {
    eventType: "order.created",
    data: { id: order.id, userId, items, total },
    timestamp: new Date().toISOString(),
  };

  await producer.send({
    topic: "orders",
    messages: [{ key: String(order.id), value: JSON.stringify(eventPayload) }],
  });

  console.log("[Kafka] order.created event published:", eventPayload);

  return order;
}

async function getOrdersByUser(userId) {
  return Order.findAll({ where: { userId } });
}

async function getOrderById(orderId) {
  return Order.findByPk(orderId);
}

module.exports = { createOrder, getOrdersByUser, getOrderById };
