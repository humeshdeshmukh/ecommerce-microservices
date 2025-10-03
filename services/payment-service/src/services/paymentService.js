/**
 * paymentService.js - Business logic for payments
 */
const Transaction = require("../models/Transaction");
const { producer } = require("../utils/kafka");

async function processPayment(orderId, userId, amount) {
  const transaction = await Transaction.create({
    orderId,
    userId,
    amount,
    status: "pending",
  });

  // Simulate payment success (90% chance success)
  const isSuccess = Math.random() < 0.9;
  transaction.status = isSuccess ? "success" : "failed";
  await transaction.save();

  if (isSuccess) {
    // Publish Kafka event
    const eventPayload = {
      eventType: "payment.completed",
      data: { transactionId: transaction.id, orderId, userId, amount },
      timestamp: new Date().toISOString(),
    };

    await producer.send({
      topic: "payments",
      messages: [{ key: String(transaction.id), value: JSON.stringify(eventPayload) }],
    });

    console.log("[Kafka] payment.completed event published:", eventPayload);
  }

  return transaction;
}

async function getTransactions(userId) {
  return Transaction.findAll({ where: { userId } });
}

module.exports = { processPayment, getTransactions };
