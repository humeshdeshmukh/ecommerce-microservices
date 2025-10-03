# Payment Service

Handles payment processing for the Ecommerce microservices project.  
Publishes `payment.completed` events to Kafka for Notification Service.

## Features
- Process new payments (simulated)
- Fetch user’s payment history
- Publishes Kafka event `payment.completed`
- JWT authentication required

## Endpoints
- `POST /payments` → Make a payment (`{ orderId, amount }`)
- `GET /payments` → Get user transactions
- `GET /health` → Health check

## Environment Variables
```bash
PORT=3004
POSTGRES_DB=ecommerce
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
KAFKA_BROKER=localhost:9092
JWT_SECRET=changeme
