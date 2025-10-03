/**
 * authService.js - Auth business logic
 */
const User = require("../models/User");
const { generateToken } = require("../utils/jwtHelper");

async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user);
  return { user, token };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { user, token };
}

module.exports = { registerUser, loginUser };
