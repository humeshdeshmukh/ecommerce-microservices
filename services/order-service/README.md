# Order Service

Handles order creation and retrieval for the Ecommerce microservices project.  
Publishes `order.created` events to Kafka for Notification Service.

## Features
- Create new orders
- Fetch orders for a user
- Fetch order by ID
- Kafka producer for `order.created`
- JWT authentication required

## Endpoints
- `POST /orders` → Create order
- `GET /orders` → Get all user’s orders
- `GET /orders/:orderId` → Get order details
- `GET /health` → Health check

## Environment Variables
```bash
PORT=3002
POSTGRES_DB=ecommerce
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
KAFKA_BROKER=localhost:9092
JWT_SECRET=changeme
