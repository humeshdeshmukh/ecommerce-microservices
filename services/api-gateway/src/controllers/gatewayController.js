/**
 * gatewayController.js
 * Controller with minimal logic (mostly for custom gateway endpoints).
 */

exports.healthCheck = (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
};

// Example: expose a status endpoint showing available services
exports.servicesStatus = (req, res) => {
  const services = {
    auth: process.env.AUTH_SERVICE_URL,
    product: process.env.PRODUCT_SERVICE_URL,
    cart: process.env.CART_SERVICE_URL,
    order: process.env.ORDER_SERVICE_URL,
    payment: process.env.PAYMENT_SERVICE_URL,
    notification: process.env.NOTIFICATION_SERVICE_URL,
  };
  res.json({ services });
};
