import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) setWishlist([...wishlist, product]);
  };

  return (
    <ShopContext.Provider
      value={{ cart, wishlist, addToCart, addToWishlist }}
    >
      {children}
    </ShopContext.Provider>
  );
};