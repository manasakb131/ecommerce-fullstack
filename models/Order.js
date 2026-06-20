const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,      // ✅ REQUIRED
      price: Number,     // ✅ REQUIRED
      image: String,     // ✅ REQUIRED
      quantity: Number   // ✅ REQUIRED
    }
  ],
  totalAmount: Number,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);