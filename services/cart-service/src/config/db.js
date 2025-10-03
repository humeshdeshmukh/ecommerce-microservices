/**
 * db.js - Redis connection
 */
const { createClient } = require("redis");

let client;

async function connectRedis() {
  client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  client.on("error", (err) => console.error("[Redis] Error:", err));

  await client.connect();
  console.log("[Redis] Connected successfully");
}

function getClient() {
  if (!client) {
    throw new Error("Redis client not initialized. Call connectRedis() first.");
  }
  return client;
}

module.exports = { connectRedis, getClient };
