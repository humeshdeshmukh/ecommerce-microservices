const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { services } = require("../config/proxy");
const { healthCheck, servicesStatus } = require("../controllers/gatewayController");

const router = express.Router();

// Health/status endpoints
router.get("/health", healthCheck);
router.get("/status", servicesStatus);

// Auth proxy
router.use(
  "/auth",
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);

// ... (rest of proxies stay as before)
module.exports = router;
