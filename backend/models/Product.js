import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    image: String,
    description: String,
    rating: { type: Number, default: 4 },
    reviews: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;