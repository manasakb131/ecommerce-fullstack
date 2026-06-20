import { useParams, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-2">Order ID: {id}</p>

      <button
        onClick={() => navigate("/orders")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Orders
      </button>
      
    </div>
  );
}