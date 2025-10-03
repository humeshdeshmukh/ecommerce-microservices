# E-commerce Microservices Project

A **microservices-based e-commerce platform** built with **Node.js, Express, MongoDB, Postgres, Redis, Kafka, and Docker/Kubernetes**.  
This project is designed for **DevOps practice**: from coding → containerization → orchestration → CI/CD → monitoring/logging.

---

## 🏗️ Architecture

- **API Gateway** → Routes requests to microservices
- **Auth Service** → User authentication & JWT
- **Product Service** → Product catalog (MongoDB)
- **Cart Service** → Shopping cart (Redis)
- **Order Service** → Orders (Postgres + Kafka producer)
- **Payment Service** → Payments (Postgres + Kafka producer)
- **Notification Service** → Kafka consumer (simulated Email/SMS)
- **Event Bus** → Kafka (Zookeeper + Broker)
- **Infra-as-Code** → Docker Compose, Kubernetes manifests, Terraform, Ansible
- **Monitoring** → Prometheus, Grafana, ELK stack
- **CI/CD** → GitHub Actions, Jenkins, GitLab CI

---

## 📂 Project Structure

ecommerce-microservices/
├── services/                              # Microservices
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   └── authController.js
│   │   │   ├── routes/
│   │   │   │   └── authRoutes.js
│   │   │   ├── models/
│   │   │   │   └── User.js
│   │   │   ├── services/
│   │   │   │   └── authService.js
│   │   │   ├── middlewares/
│   │   │   │   └── authMiddleware.js
│   │   │   ├── utils/
│   │   │   │   └── jwtHelper.js
│   │   │   ├── config/
│   │   │   │   └── db.js
│   │   │   └── app.js
│   │   ├── tests/
│   │   │   └── auth.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── product-service/
│   │   ├── src/
│   │   │   ├── controllers/productController.js
│   │   │   ├── routes/productRoutes.js
│   │   │   ├── models/Product.js
│   │   │   ├── services/productService.js
│   │   │   ├── middlewares/errorHandler.js
│   │   │   ├── config/db.js
│   │   │   └── app.js
│   │   ├── tests/product.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── order-service/
│   │   ├── src/controllers/orderController.js
│   │   ├── src/routes/orderRoutes.js
│   │   ├── src/models/Order.js
│   │   ├── src/services/orderService.js
│   │   ├── src/config/db.js
│   │   ├── src/app.js
│   │   ├── tests/order.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── cart-service/
│   │   ├── src/controllers/cartController.js
│   │   ├── src/routes/cartRoutes.js
│   │   ├── src/models/Cart.js
│   │   ├── src/services/cartService.js
│   │   ├── src/config/db.js
│   │   ├── src/app.js
│   │   ├── tests/cart.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── payment-service/
│   │   ├── src/controllers/paymentController.js
│   │   ├── src/routes/paymentRoutes.js
│   │   ├── src/models/Transaction.js
│   │   ├── src/services/paymentService.js
│   │   ├── src/config/db.js
│   │   ├── src/app.js
│   │   ├── tests/payment.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── notification-service/
│   │   ├── src/controllers/notificationController.js
│   │   ├── src/routes/notificationRoutes.js
│   │   ├── src/services/notificationService.js
│   │   ├── src/config/kafka.js
│   │   ├── src/app.js
│   │   ├── tests/notification.test.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── api-gateway/
│       ├── src/routes/index.js
│       ├── src/middlewares/authMiddleware.js
│       ├── src/config/proxy.js
│       ├── src/app.js
│       ├── Dockerfile
│       ├── package.json
│       └── README.md
│
├── infra/                                # Infra-as-Code
│   ├── docker-compose.yml
│   ├── kubernetes/
│   │   ├── namespace.yaml
│   │   ├── ingress.yaml
│   │   ├── auth-deployment.yaml
│   │   ├── product-deployment.yaml
│   │   ├── order-deployment.yaml
│   │   ├── cart-deployment.yaml
│   │   ├── payment-deployment.yaml
│   │   ├── notification-deployment.yaml
│   │   ├── api-gateway-deployment.yaml
│   │   ├── configmaps.yaml
│   │   └── secrets.yaml
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── ansible/
│       └── playbooks.yml
│
├── ci-cd/
│   ├── jenkins/
│   │   └── Jenkinsfile
│   ├── github-actions/
│   │   └── deploy.yml
│   └── gitlab-ci/
│       └── .gitlab-ci.yml
│
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   ├── dashboards/
│   │   │   └── ecommerce-dashboard.json
│   │   └── datasources.yaml
│   └── logging/
│       ├── elasticsearch.yaml
│       ├── logstash.conf
│       └── kibana.yaml
│
├── event-bus/
│   ├── docker-compose.kafka.yml
│   ├── producers/
│   │   └── orderProducer.js
│   └── consumers/
│       └── notificationConsumer.js
│
├── scripts/
│   ├── init-db.sh
│   ├── backup.sh
│   └── cleanup.sh
│
├── docs/
│   ├── architecture.md
│   ├── api-specs.yaml
│   └── README.md
│
├── .gitignore
├── .env.example
└── README.md
