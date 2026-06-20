import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.log(err));