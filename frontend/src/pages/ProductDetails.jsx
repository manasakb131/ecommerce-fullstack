import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
      });
  }, [id]);

  const handleBuy = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: product.price }
      );

      const options = {
        key: "rzp_test_T1PiLIh2keK5Jc",
        amount: data.amount,
        currency: "INR",
        name: product.name,
        description: "Purchase",
        order_id: data.id,

        handler: function () {
          // ✅ SAVE ORDER
          const orders = JSON.parse(localStorage.getItem("orders")) || [];

          orders.push({
            ...product,
            date: new Date().toLocaleString(),
          });

          localStorage.setItem("orders", JSON.stringify(orders));

          alert("Payment Successful 🎉");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-10 text-white">
      <img src={product.image} className="w-64 mb-4" />

      <h1 className="text-2xl font-bold text-black">{product.name}</h1>
      <p className="text-green-400">₹ {product.price}</p>
      <p>{product.description}</p>
      <p>⭐ {product.rating} ({product.reviews} reviews)</p>

      <button
        onClick={handleBuy}
        className="mt-4 bg-green-600 px-6 py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;