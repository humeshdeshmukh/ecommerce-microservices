/**
 * product.test.js - Jest test
 */
const request = require("supertest");
const app = require("../src/app");

describe("Product Service", () => {
  it("should return health check", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
