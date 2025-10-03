# API Gateway

This is the **entry point** for the Ecommerce Microservices project.  
It routes incoming requests to the appropriate microservice.

## Features
- **JWT Authentication** for protected routes
- **Service proxying** using `http-proxy-middleware`
- **Centralized logging & error handling**
- **Configurable service URLs** via environment variables

## Endpoints
- `/auth/*` → Auth Service
- `/products/*` → Product Service
- `/cart/*` → Cart Service (JWT required)
- `/orders/*` → Order Service (JWT required)
- `/payments/*` → Payment Service (JWT required)
- `/notifications/*` → Notification Service (JWT + admin)

## Environment Variables
```bash
PORT=8080
JWT_SECRET=supersecret

AUTH_SERVICE_URL=http://auth-service:3000
PRODUCT_SERVICE_URL=http://product-service:3001
CART_SERVICE_URL=http://cart-service:3003
ORDER_SERVICE_URL=http://order-service:3002
PAYMENT_SERVICE_URL=http://payment-service:3004
NOTIFICATION_SERVICE_URL=http://notification-service:3005
