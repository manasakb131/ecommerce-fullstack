const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  {
    name: "iPhone 14",
    price: 79999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    name: "Samsung Galaxy S23",
    price: 69999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
  },
  {
    name: "Nike Shoes",
    price: 4999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    name: "Adidas Hoodie",
    price: 2999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
];

// generate more automatically
for (let i = 1; i <= 20; i++) {
  products.push({
    name: `Product ${i}`,
    price: 1000 + i * 200,
    category: "General",
    image: `https://picsum.photos/300?random=${i}`,
  });
}

const seed = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("✅ Products Seeded");
  process.exit();
};

seed();