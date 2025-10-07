"use client";
import { apiRoutes } from "@/app/api/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";

const Verifyotp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(apiRoutes.VERIFY_OTP, {
        email,
        otp,
      });
      localStorage.setItem("tempToken", res.data.tempToken);
      console.log("token:", res.data.tempToken);
      if (res.status === 200 || res.status === 201) {
        toast.success("Otp verified successfully");
        router.push("/reset-password");
      } else {
        toast.error("Invalid otp");
      }
    } catch {
      console.error("Error while sending otp");
      toast.error("Error while sending otp");
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col space-y-4"
      >
        <div className="flex gap-2 sm:hidden">
          <MdArrowBack
            className=" mt-3"
            onClick={() => router.push("/forgot-password")}
          />
          <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
            Verify Otp
          </h2>
        </div>
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center sm:block hidden">
          Verify Otp
        </h2>
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
            placeholder="1234"
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
