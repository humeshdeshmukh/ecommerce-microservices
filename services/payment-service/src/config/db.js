/**
 * db.js - Postgres connection using Sequelize ORM
 */
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "ecommerce",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "postgres",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("[Postgres] Payment Service connected successfully");
  } catch (err) {
    console.error("[Postgres] Connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
