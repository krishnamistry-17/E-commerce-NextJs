"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axiosInstance.post(apiRoutes.FORGOT_PASSWORD, {
        email,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Password reset link sent to your email.");
        router.push("/verify-otp");
      } else if (res.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        setError(res.data.message || "Error in signin");
      }
    } catch (error) {
      console.error("Error while sending forgot password email",error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <div className="flex gap-2 sm:hidden">
            <MdArrowBack
              className=" mt-3"
              onClick={() => router.push("/signin")}
            />
            <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
              Forgot Password
            </h2>
          </div>
          <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center sm:block hidden">
            Forgot Password
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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

          <button
            type="submit"
            className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
