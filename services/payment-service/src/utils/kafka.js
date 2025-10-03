/**
 * kafka.js - Kafka producer setup
 */
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

async function connectKafka() {
  try {
    await producer.connect();
    console.log("[Kafka] Producer connected (Payment Service)");
  } catch (err) {
    console.error("[Kafka] Connection failed:", err.message);
  }
}

connectKafka();

module.exports = { producer };
