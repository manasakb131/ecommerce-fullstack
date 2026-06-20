import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="p-10 bg-black min-h-screen">
      <h1 className="text-white text-2xl mb-6">Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-300">No items</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white text-black p-4 mb-4 rounded flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <img src={item.image} className="w-16 h-16" />
              <div>
                <h2>{item.name}</h2>
                <p>₹ {item.price}</p>
              </div>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;