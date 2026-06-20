const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getMyOrders
} = require("../controllers/orderController"); // ✅ IMPORTANT

const { protect } = require("../middleware/authMiddleware");

// Create order
router.post("/create", protect, createOrder);

// Verify payment
router.post("/verify", protect, verifyPayment);

// Get my orders
router.get("/", protect, getMyOrders);

module.exports = router;