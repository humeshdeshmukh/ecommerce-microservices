/**
 * notificationConsumer.js
 * Consumes "order.created" events and simulates sending notifications.
 *
 * This simulates Notification Service subscribing to Kafka events.
 */

const { Kafka } = require("kafkajs");

// Kafka client setup
const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"], // external port exposed in docker-compose
});

// Consumer instance
const consumer = kafka.consumer({ groupId: "notification-group" });

async function consumeNotifications() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "orders", fromBeginning: true });

    console.log("[Kafka] Listening for 'orders' events...");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());

        if (payload.eventType === "order.created") {
          console.log(
            `[Notification Service] Received order.created → Sending notification to user ${payload.data.userId}`
          );
          // Simulated notification
          console.log(
            `📩 Email sent: "Order ${payload.data.id} created successfully!"`
          );
        }
      },
    });
  } catch (err) {
    console.error("Error consuming Kafka message:", err);
  }
}

// Run consumer if file executed directly
if (require.main === module) {
  consumeNotifications();
}

module.exports = { consumeNotifications };
