# Auth Service

Handles user registration, login, and JWT authentication for the E-commerce microservices project.

## Features
- Register users with email & password
- Login and receive JWT
- Password hashing with bcrypt
- Role-based access (user/admin)
- Health check endpoint
- MongoDB via Mongoose

## Endpoints
- `POST /auth/register` → Register a new user
- `POST /auth/login` → Login and get token
- `GET /health` → Health check

## Run locally
```bash
npm install
npm run dev
