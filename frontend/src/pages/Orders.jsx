import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  return (
    <div className="p-10 min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-white mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-300">No orders yet</p>
      ) : (
        orders.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 mb-4 rounded shadow flex gap-4"
          >
            <img src={item.image} className="w-20 h-20 object-cover" />

            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p>₹ {item.price}</p>
              <p className="text-sm text-gray-600">{item.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;