"use client";

import { forgotPassword } from "@/actions/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);

    const result = await forgotPassword(form);

    if (result.status === "success") {
      toast.success("Password reset link sent to your email.");
    } else {
      setError(result.message || "Error in signin");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
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
