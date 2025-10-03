/**
 * cartService.js - Business logic for cart
 */
const { getClient } = require("../config/db");
const Cart = require("../models/Cart");

const CART_PREFIX = "cart:";

async function getCart(userId) {
  const client = getClient();
  const data = await client.get(CART_PREFIX + userId);
  if (!data) return new Cart(userId, []);
  return JSON.parse(data);
}

async function addToCart(userId, productId, quantity) {
  const cart = await getCart(userId);

  const existingItem = cart.items.find((i) => i.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await saveCart(userId, cart);
  return cart;
}

async function removeFromCart(userId, productId) {
  const cart = await getCart(userId);
  cart.items = cart.items.filter((i) => i.productId !== productId);
  await saveCart(userId, cart);
  return cart;
}

async function clearCart(userId) {
  const client = getClient();
  await client.del(CART_PREFIX + userId);
  return new Cart(userId, []);
}

async function saveCart(userId, cart) {
  const client = getClient();
  await client.set(CART_PREFIX + userId, JSON.stringify(cart), {
    EX: 3600, // Expire in 1 hour
  });
}

module.exports = { getCart, addToCart, removeFromCart, clearCart };
