# Docs — Ecommerce Microservices

This `docs/` folder contains architecture and API specifications for the `ecommerce-microservices` project.

## Files
- `architecture.md` — High-level architecture, deployment model, and operational notes.
- `api-specs.yaml` — Consolidated OpenAPI 3.0 spec describing the primary endpoints exposed through the API Gateway.
- `README.md` — This file (basic usage).

## How to use these docs

### 1. API (OpenAPI)
- Use `docs/api-specs.yaml` with tools like Swagger UI, ReDoc or Postman.
  - Example to run locally using `redoc-cli`:
    ```bash
    npm install -g redoc-cli
    redoc-cli serve docs/api-specs.yaml
    # Then open http://127.0.0.1:8080 in browser
    ```
- Or import `api-specs.yaml` into Postman to generate a collection for manual / automated tests.

### 2. Architecture
- Read `architecture.md` for deployment guidance, patterns to enforce, and checklists.
- Use the "Deployment checklist" when setting up a cluster or wiring CI/CD.

### 3. Extending the spec or architecture
- As you implement endpoints in each service, keep `api-specs.yaml` updated. You can split the monolithic OpenAPI into per-service specs later (recommended).
- Keep `infra/kubernetes/*.yaml` manifest placeholders consistent with token names in CI pipelines:
  - Use placeholders like `IMAGE_AUTH-SERVICE`, `IMAGE_PRODUCT-SERVICE`, etc.
  - CI pipelines use `sed`/replacement to substitute the actual registry image name and tag.

## Example: add
