/**
 * kafka.js
 * Kafka connection setup using kafkajs
 */
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });
const producer = kafka.producer();

async function connectKafka() {
  try {
    await producer.connect();
    await consumer.connect();
    console.log("[Kafka] Connected successfully");
  } catch (err) {
    console.error("[Kafka] Connection error:", err);
  }
}

module.exports = { kafka, producer, consumer, connectKafka };
