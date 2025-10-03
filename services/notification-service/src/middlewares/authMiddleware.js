/**
 * authMiddleware.js
 * JWT-based protection for notification routes (optional).
 * Example: restrict manual POST /notifications to admins only.
 */
const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Admins only" });
}

module.exports = { protect, adminOnly };
