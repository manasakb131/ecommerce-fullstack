import React, { useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ✅ UPDATE QUANTITY
  const updateQty = (index, type) => {
    const updated = [...cart];

    if (type === "inc") updated[index].qty += 1;
    if (type === "dec" && updated[index].qty > 1)
      updated[index].qty -= 1;

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ✅ REMOVE
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ✅ TOTAL
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ CHECKOUT PAYMENT (FIXED)
  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      // 🔥 IMPORTANT FIX → convert to paise
      const amountInPaise = totalPrice * 100;

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: amountInPaise }
      );

      const options = {
        key: "rzp_test_T1PiLIh2keK5Jc",
        amount: data.amount,
        currency: "INR",
        name: "My Store",
        description: "Cart Checkout",
        order_id: data.id,
        handler: function () {
  // ✅ SAVE ALL CART ITEMS AS ORDERS
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  cart.forEach(item => {
    orders.push({
      ...item,
      date: new Date().toLocaleString(),
    });
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  setCart([]);

  alert("Payment Successful 🎉");
},
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 mb-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>₹ {item.price}</p>
                <p>Qty: {item.qty}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => updateQty(index, "inc")}
                  className="bg-green-500 px-3 py-1 text-white"
                >
                  +
                </button>

                <button
                  onClick={() => updateQty(index, "dec")}
                  className="bg-yellow-500 px-3 py-1 text-white"
                >
                  -
                </button>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 px-3 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-xl mt-6">
            Total: ₹ {totalPrice}
          </h2>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 px-6 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;