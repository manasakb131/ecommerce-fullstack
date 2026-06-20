import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // ✅ VERY IMPORTANT

const router = express.Router();

// ✅ DEBUG (REMOVE LATER)
console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const safeAmount = Math.min(Number(amount), 500000);

    const order = await razorpay.orders.create({
      amount: safeAmount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.log("RAZOR ERROR:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;