# E-Commerce Microservices — Architecture

## Overview
This repository implements an **E-Commerce microservices architecture** composed of independent services, an API Gateway, an event bus, and infrastructure-as-code for deployment. The goal is to provide a realistic end-to-end project for practicing DevOps: containerization, CI/CD, Kubernetes, observability, secrets management, and deployment strategies.

### Major components
- **API Gateway** (`api-gateway`) — single entry point, authentication, routing to services.
- **Auth Service** (`auth-service`) — user registration, login, JWT issuance, basic RBAC.
- **Product Service** (`product-service`) — product catalog CRUD and search.
- **Cart Service** (`cart-service`) — manage shopping carts (per-user).
- **Order Service** (`order-service`) — create/track orders, orchestration with payment.
- **Payment Service** (`payment-service`) — mock/real payment processing (webhook-friendly).
- **Notification Service** (`notification-service`) — async notifications (email/SMS simulated).
- **Event Bus** (`event-bus`) — Kafka for asynchronous, event-driven flows.
- **Infra / IaC** — `docker-compose` for local dev, Kubernetes YAMLs under `infra/kubernetes/`, Terraform under `infra/terraform/`.
- **CI/CD** — Jenkinsfile, GitHub Actions, and GitLab CI definitions in `ci-cd/`.
- **Monitoring & Logging** — Prometheus, Grafana, and ELK/Loki stacks for metrics & logs.

## Interaction patterns
- **Synchronous**: API Gateway → Services via HTTP/REST (or gRPC optionally).
- **Asynchronous**: Services publish events to Kafka (e.g., `order.created`, `payment.completed`) consumed by Notification Service, Analytics or other consumers.
- **Data**: Each microservice owns its database (per-service DB pattern). Use small DBs: MongoDB for auth/product, PostgreSQL for orders, Redis for cart caching — adjust as needed.
- **Service Discovery**: For cluster environments, use DNS-based discovery (Kubernetes Services). For local dev, API Gateway routes to services by stable hostnames.

## Deployment model
- Local development: `docker-compose` brings up services, Kafka, and local DBs.
- Staging/Production: Images built in CI are pushed to a container registry and deployed to Kubernetes (`infra/kubernetes/`). Use namespaces per environment.
- Secrets: Do *not* store secrets in repo. Use Kubernetes Secrets or an external secret manager (HashiCorp Vault, AWS Secrets Manager).

## High-level data flow example
1. User logs in via API Gateway → Auth Service returns `JWT`.
2. User adds items to cart → Cart Service updates Redis and emits `cart.updated` to Kafka (optional).
3. User places order → API Gateway → Order Service:
   - validates cart and user
   - creates Order record
   - publishes `order.created` to Kafka
   - triggers Payment Service (sync call or via queue)
4. Payment Service processes payment, publishes `payment.completed` or `payment.failed`.
5. Notification Service consumes `order.created` and `payment.completed` and sends emails (simulated).

## Non-functional considerations
- **Scalability**: Stateless services scale horizontally. Use HPA in Kubernetes. Stateful DBs scaled separately.
- **Resiliency**: Add retries, circuit breakers (e.g., via library or service mesh). Use liveness/readiness probes in K8s.
- **Observability**: Expose Prometheus metrics (use `/metrics`), instrument tracing (Jaeger), and centralized logs (ELK or Loki).
- **Security**:
  - TLS for all inter-service communication in production.
  - Store secrets in vault or K8s Secrets.
  - Use RBAC in Kubernetes clusters and least-privilege IAM for cloud resources.
- **CI/CD**:
  - Immutable image tags: use commit SHA.
  - Blue/Green or Canary deployments for production rollouts.
  - Automated tests + SCA (Trivy/Snyk) in pipeline.

## File & repo mapping (quick)
- `services/` — contains all services, each with `src/`, `Dockerfile`, `package.json`, and `tests/`.
- `infra/kubernetes/` — Kubernetes manifests; each deployment YAML includes image placeholder tokens like `IMAGE_AUTH-SERVICE`.
- `ci-cd/` — Jenkinsfile, GitHub Actions, GitLab CI pipeline definitions.
- `event-bus/` — Kafka docker-compose and simple producer/consumer examples.
- `monitoring/` — Prometheus, Grafana, logging configs.
- `docs/` — this file, API OpenAPI spec, README.

## Deployment checklist
1. Create container registry and ensure CI has credentials (`REGISTRY`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`).
2. Create Kubernetes cluster (EKS/GKE/AKS or minikube/kind for local).
3. Create a Kubeconfig and store it as base64 in CI secret `KUBE_CONFIG_DATA`.
4. Ensure DB services (managed or self-hosted) are reachable by services or run via k8s statefulsets.
5. Configure monitoring & logging stacks.
6. Run CI pipeline to build & push images; deploy to K8s using the provided workflows.

## Next steps (recommended)
- Implement one service (Auth) end-to-end, including Dockerfile, manifest placeholders and a minimal test.
- Wire CI to build & deploy that service to cluster; confirm health checks and logs.
- Incrementally add Product → Cart → Order → Payment → Notification.
- Add automated E2E tests (e.g., postman / newman in CI/CD).
