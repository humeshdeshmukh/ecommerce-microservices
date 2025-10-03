const cartService = require("../services/cartService");
const { handleError } = require("../utils/errorHandler");
const { successResponse } = require("../utils/responseHelper");
const { validateAddToCart } = require("../utils/validator");

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    successResponse(res, cart, "Cart fetched successfully");
  } catch (err) {
    handleError(res, 500, err.message);
  }
};

exports.addToCart = async (req, res) => {
  try {
    validateAddToCart(req.body);
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user.id, productId, quantity);
    successResponse(res, cart, "Item added to cart");
  } catch (err) {
    handleError(res, 400, err.message);
  }
};
