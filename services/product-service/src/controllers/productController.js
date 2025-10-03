/**
 * productController.js - Express handlers (refactored with utils)
 */
const productService = require("../services/productService");
const errorResponse = require("../utils/errorResponse");
const { successResponse, createdResponse } = require("../utils/responseHelper");
const { validateProductInput } = require("../utils/validator");

exports.createProduct = async (req, res, next) => {
  try {
    validateProductInput(req.body); // validate before saving
    const product = await productService.createProduct(req.body);
    return createdResponse(res, product, "Product created successfully");
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    return successResponse(res, products, "Products fetched successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, product, "Product fetched successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    validateProductInput(req.body); // validate update too
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, product, "Product updated successfully");
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, null, "Product deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
