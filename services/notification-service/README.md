# Notification Service

Consumes events from Kafka and simulates sending notifications (email/SMS).

## Features
- Kafka consumer for `orders` and `payments` topics
- Sends simulated email/SMS notifications
- Express routes for manual notification triggers
- Health check endpoint

## Endpoints
- `POST /notifications` → Trigger notification manually
- `GET /health` → Health check

## Environment Variables
```bash
PORT=3005
KAFKA_BROKER=localhost:9092
