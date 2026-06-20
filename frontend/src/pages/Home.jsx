import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 FILTER LOGIC (SAFE)
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || p.category === category;

    const matchPrice =
      price === "All" ||
      (price === "low" && p.price < 500) ||
      (price === "mid" && p.price >= 500 && p.price <= 2000) ||
      (price === "high" && p.price > 2000);

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {/* 🔍 SEARCH + FILTER UI */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
            background: "white",
          }}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px", color: "black" }}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>

        {/* Price */}
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", color: "black" }}
        >
          <option value="All">All Prices</option>
          <option value="low">Below ₹500</option>
          <option value="mid">₹500 - ₹2000</option>
          <option value="high">Above ₹2000</option>
        </select>
      </div>

      {/* 🛍 PRODUCTS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </div>
  );
};

export default Home;