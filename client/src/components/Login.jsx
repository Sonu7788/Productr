import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import frontLogo from "../assets/frontlogo.png";
import backLogo from "../assets/backlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/send-otp", { email });

    // save email for OTP verify page
    localStorage.setItem("otpEmail", email);

    
    alert(`Your OTP is: ${res.data.otp}`);

    navigate("/otp");
  } catch (err) {
    alert(err.response?.data?.msg || "Error generating OTP");
  }
};


  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* ================= LEFT SIDE ================= */}
      <div className="relative w-full h-full overflow-hidden rounded-l-2xl">

        {/* Background Image */}
        <img
          src={frontLogo} alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Brand Logo */}
        <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
          <span className="text-xl font-bold text-indigo-900">Productr</span>
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
        </div>

        {/* Center Card */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-[260px] h-[360px] rounded-3xl overflow-hidden shadow-2xl">

            <img
              src={backLogo} alt="Runner"
              className="w-full h-full object-cover object-[50%_15%]"
            />

            <div className="absolute bottom-4 w-full text-center text-white text-sm font-medium">
              Uplist your <br /> product to market
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full h-full flex items-center justify-center px-10 bg-white">
        <div className="w-full max-w-md">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-indigo-900 mb-8">
            Login to your Productr Account
          </h2>

          {/* Form */}
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone number
              </label>
              <input
                type="email"
                placeholder="Enter email or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold
              hover:bg-indigo-800 transition"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <div className="mt-16 border border-dashed rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have a Productr Account?
            </p>
            <a
              href="/register"
              className="text-indigo-600 font-semibold text-sm"
            >
              SignUp Here
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
