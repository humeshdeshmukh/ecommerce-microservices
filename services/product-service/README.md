# Product Service

Handles product management for the Ecommerce microservices project.

## Features
- Create new products
- Get all products
- Get product by ID
- Update products
- Delete products
- MongoDB with Mongoose

## Endpoints
- `POST /products` → Create product
- `GET /products` → List all products
- `GET /products/:id` → Get single product
- `PUT /products/:id` → Update product
- `DELETE /products/:id` → Delete product
- `GET /health` → Health check

## Environment Variables
```bash
PORT=3001
MONGO_URI=mongodb://localhost:27017/products
