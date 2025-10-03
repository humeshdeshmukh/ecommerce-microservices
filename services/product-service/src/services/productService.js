/**
 * productService.js - Business logic
 */
const Product = require("../models/Product");

async function createProduct(data) {
  const product = new Product(data);
  return await product.save();
}

async function getProducts() {
  return await Product.find();
}

async function getProductById(id) {
  return await Product.findById(id);
}

async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
