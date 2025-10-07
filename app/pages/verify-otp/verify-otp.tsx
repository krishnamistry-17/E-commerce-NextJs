import { apiRoutes } from "@/app/api/apiRoutes";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";

const Verifyotp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(apiRoutes.VERIFY_OTP, {
        email,
        otp,
      });
    } catch {
      console.error("Error while sending otp");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col space-y-4"
      >
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            otp
          </label>
          <input
            type="password"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
            required
          />
        </div>
        <div>
          <button className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700">
            Verify Otp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verifyotp;
