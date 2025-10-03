/**
 * validator.js
 * Basic input validation helpers for cart operations.
 */

function validateAddToCart(body) {
  if (!body.productId) {
    throw new Error("Product ID is required");
  }
  if (!body.quantity || body.quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
}

module.exports = { validateAddToCart };
