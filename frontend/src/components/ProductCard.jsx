import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      cart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
  };

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exist = wishlist.find((item) => item._id === product._id);

    if (!exist) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <img src={product.image} className="h-40 w-full object-cover" />

      <h3 className="text-black font-bold">{product.name}</h3>
      <p className="text-green-600">₹ {product.price}</p>

      <div className="flex gap-2 mt-2">
        <button onClick={addToCart} className="bg-black text-white px-3 py-1">
          Add to Cart
        </button>

        <button onClick={addToWishlist} className="bg-pink-500 text-white px-3 py-1">
          Wishlist
        </button>
      </div>

      <Link to={`/product/${product._id}`}>
        <button className="bg-blue-500 text-white px-3 py-1 mt-2 w-full">
          View Product
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;