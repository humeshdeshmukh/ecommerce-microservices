/**
 * api-gateway.test.js
 * Simple Jest test for API Gateway
 */

const request = require("supertest");
const app = require("../src/app");

describe("API Gateway", () => {
  it("should return health check", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("should return service status", async () => {
    const res = await request(app).get("/status");
    expect(res.statusCode).toBe(200);
    expect(res.body.services).toBeDefined();
  });
});
