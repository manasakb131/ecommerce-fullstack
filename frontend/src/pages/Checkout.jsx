import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const payNow = async () => {
    if (!user) return navigate("/login");

    const token = user.token;

    const orderRes = await API.post(
      "/orders",
      { orderItems: [{ product: id, qty: 1 }] },
      { headers: { Authorization: "Bearer " + token } }
    );

    const orderId = orderRes.data._id;

    const { data } = await API.post(
      `/orders/${orderId}/razorpay`,
      {},
      { headers: { Authorization: "Bearer " + token } }
    );

    const options = {
      key: "rzp_test_T1PiLIh2keK5Jc",
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      handler: async function (response) {
        await API.post(
          "/orders/verify",
          { ...response, orderId },
          { headers: { Authorization: "Bearer " + token } }
        );

        navigate("/orders");
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2 className="text-xl font-bold mt-3">Checkout</h2>

      <button
        onClick={payNow}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}