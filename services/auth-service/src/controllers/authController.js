/**
 * authController.js - Request handlers
 */
const { registerUser, loginUser } = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    next(err);
  }
};
