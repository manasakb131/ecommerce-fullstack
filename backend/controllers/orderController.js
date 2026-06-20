const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ CREATE ORDER (RAZORPAY)
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const qty = quantity || 1;

    const amount = product.price * qty * 100;

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR"
    });

    res.json({
      order: {
        amount: razorpayOrder.amount,
        razorpayOrderId: razorpayOrder.id
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create order failed" });
  }
};

// ✅ VERIFY PAYMENT + SAVE FULL PRODUCT DATA
exports.verifyPayment = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const qty = quantity || 1;

    const order = await Order.create({
      user: req.user._id,
      items: [
        {
          product: product._id,
          name: product.name,        // ✅ SAVE NAME
          price: product.price,      // ✅ SAVE PRICE
          image: product.image,      // ✅ SAVE IMAGE
          quantity: qty              // ✅ SAVE QTY
        }
      ],
      totalAmount: product.price * qty,
      status: "paid"
    });

    res.json({ success: true, order });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verify failed" });
  }
};

// ✅ GET ORDERS (RETURN FULL DATA)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch orders failed" });
  }
};