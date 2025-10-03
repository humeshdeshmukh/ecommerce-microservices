#!/bin/bash
# init-db.sh
# Initialize databases for ecommerce microservices (MongoDB, Postgres, Redis)
# Run this script after starting infra with docker-compose or k8s cluster

set -e

echo "=== Initializing databases ==="

# --- MongoDB: Create DBs for auth, product, notifications ---
echo "[MongoDB] Creating databases..."
docker exec -i local-mongo mongosh -u root -p example <<EOF
use auth
db.createCollection("users")
use products
db.createCollection("items")
use notifications
db.createCollection("messages")
EOF

echo "[MongoDB] Databases created: auth, products, notifications"

# --- Postgres: Create ecommerce DB and order/payments tables ---
echo "[Postgres] Creating schemas..."
docker exec -i local-postgres psql -U postgres <<EOF
CREATE DATABASE ecommerce;
\c ecommerce;
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    total NUMERIC(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    amount NUMERIC(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF

echo "[Postgres] Tables created: orders, payments"

# --- Redis: Just flush DB to ensure clean start ---
echo "[Redis] Flushing all keys..."
docker exec -i local-redis redis-cli FLUSHALL

echo "=== DB initialization complete! ==="
