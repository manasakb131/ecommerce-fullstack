import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ CHECK USER LOGIN
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black text-white">
      
      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MyShop
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>

        {/* ✅ LOGIN / LOGOUT TOGGLE */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;