/**
 * Cart.js - Cart data model (stored in Redis as JSON string)
 * This is a pseudo-model since Redis is key-value.
 */
class Cart {
  constructor(userId, items = []) {
    this.userId = userId;
    this.items = items; // [{ productId, quantity }]
  }
}

module.exports = Cart;
