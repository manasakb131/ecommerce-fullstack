import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 GET ALL PRODUCTS
export const getProducts = () => API.get("/products");

// 🔹 CREATE PRODUCT
export const createProduct = (data) =>
  API.post("/products", data);

// 🔹 DELETE PRODUCT
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);