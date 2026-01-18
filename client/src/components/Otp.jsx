import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* ================= LEFT SIDE (SAME AS LOGIN) ================= */}
      <div className="relative w-full h-full overflow-hidden">

        {/* Background */}
        <img
          src="/src/assets/frontlogo.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Brand */}
        <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
          <span className="text-xl font-bold text-indigo-900">Productr</span>
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
        </div>

        {/* Center Card */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-[260px] h-[360px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/src/assets/backlogo.png"
              alt="Runner"
              className="w-full h-full object-cover object-[50%_15%]"
            />
            <div className="absolute bottom-4 w-full text-center text-white text-sm font-medium">
              Uplist your <br /> product to market
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE (OTP FORM) ================= */}
      <div className="w-full h-full flex items-center justify-center px-10 bg-white">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
           Login to Productr Account
          </h2>

          <p className="text-sm text-gray-600 mb-8">
            Enter otp <br />
            
          </p>

          <form onSubmit={handleVerify} className="space-y-6">
            <input
              type="text"
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              text-center tracking-[0.5em] text-xl
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold
              hover:bg-indigo-800 transition"
            >
              Verify OTP
            </button>
          </form>

          {/* Resend */}
          <div className="mt-10 text-center border border-dashed rounded-lg py-4">
            <span className="text-sm text-gray-600">
              Didn’t receive OTP?
            </span>
            <button
              type="button"
              className="ml-1 text-sm font-semibold text-indigo-600"
            >
              Resend
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Otp;
