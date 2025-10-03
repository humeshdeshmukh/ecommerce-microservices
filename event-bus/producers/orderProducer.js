/**
 * orderProducer.js
 * Publishes "order.created" events to Kafka when an order is placed.
 *
 * This simulates integration with Order Service.
 */

const { Kafka } = require("kafkajs");

// Kafka client setup
const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"], // external port exposed in docker-compose
});

// Producer instance
const producer = kafka.producer();

async function publishOrderCreated(order) {
  try {
    await producer.connect();

    const eventPayload = {
      eventType: "order.created",
      data: order, // order object from Order Service
      timestamp: new Date().toISOString(),
    };

    // Send to "orders" topic
    await producer.send({
      topic: "orders",
      messages: [{ key: String(order.id), value: JSON.stringify(eventPayload) }],
    });

    console.log(`[Kafka] Published event to "orders":`, eventPayload);
  } catch (err) {
    console.error("Error producing Kafka message:", err);
  } finally {
    await producer.disconnect();
  }
}

// Example run (for dev/testing)
if (require.main === module) {
  publishOrderCreated({
    id: "ord_12345",
    userId: "user_001",
    items: [{ productId: "prod_001", quantity: 2 }],
    total: 99.99,
    status: "created",
  });
}

module.exports = { publishOrderCreated };
