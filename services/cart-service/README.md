# Cart Service

Manages shopping carts for the Ecommerce microservices project.  
Uses **Redis** as a fast in-memory datastore.

## Features
- Add items to cart
- Remove items from cart
- View cart
- Clear cart
- JWT protected routes

## Endpoints
- `GET /cart` → Get current user’s cart
- `POST /cart` → Add item (`{ productId, quantity }`)
- `DELETE /cart/:productId` → Remove item
- `DELETE /cart` → Clear cart

## Environment Variables
```bash
PORT=3003
REDIS_URL=redis://localhost:6379
JWT_SECRET=changeme
