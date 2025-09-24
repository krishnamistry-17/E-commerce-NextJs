"use client";

import { resetPassword } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const togglePassword = () => setIsShown(!isShown);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const code = searchParams.get("code");

    const result = await resetPassword(form, code || "");

    if (result.status === "success") {
      toast.success("Successfully updated");
      router.push("/login");
    } else {
      setError(result.status || "Error in resetting password");
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
            Reset Password
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1">
              <input
                type={isShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="123456789"
                className="focus:outline-none focus:ring-0 w-full"
                required
              />
              <div onClick={togglePassword} className="cursor-pointer">
                {isShown ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
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

export default ResetPassword;
