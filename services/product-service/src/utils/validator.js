/**
 * validator.js
 * Input validation helpers for product APIs
 */
function validateProductInput(body) {
  if (!body.name) {
    throw new Error("Product name is required");
  }
  if (body.price == null || body.price < 0) {
    throw new Error("Product price must be a positive number");
  }
  if (body.stock == null || body.stock < 0) {
    throw new Error("Product stock must be a non-negative number");
  }
  if (!body.category) {
    throw new Error("Product category is required");
  }
}

module.exports = { validateProductInput };
