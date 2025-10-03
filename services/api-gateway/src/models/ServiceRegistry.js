/**
 * ServiceRegistry.js
 * A simple registry for services (could be extended to pull from Consul/Eureka/etc.)
 */
class ServiceRegistry {
  constructor() {
    this.services = {
      auth: process.env.AUTH_SERVICE_URL || "http://localhost:3000",
      product: process.env.PRODUCT_SERVICE_URL || "http://localhost:3001",
      cart: process.env.CART_SERVICE_URL || "http://localhost:3003",
      order: process.env.ORDER_SERVICE_URL || "http://localhost:3002",
      payment: process.env.PAYMENT_SERVICE_URL || "http://localhost:3004",
      notification:
        process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3005",
    };
  }

  get(name) {
    return this.services[name];
  }

  list() {
    return this.services;
  }
}

module.exports = new ServiceRegistry();
