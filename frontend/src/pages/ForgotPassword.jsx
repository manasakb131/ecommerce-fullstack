import { useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendOTP = async () => {
    try {
      await API.post("/users/forgot-password", { email });
      alert("OTP sent to your email");
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow w-80">
        <h2 className="text-lg font-bold mb-3">Forgot Password</h2>

        <input
          placeholder="Enter Email"
          className="w-full p-2 border mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOTP}
          className="w-full bg-blue-600 text-white p-2"
        >
          Send OTP
        </button>

        <p className="mt-3 text-sm text-center">
          <Link to="/login" className="text-blue-600">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}