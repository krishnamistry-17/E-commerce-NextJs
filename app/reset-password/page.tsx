"use client";

import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, Suspense } from "react";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";

const ResetPasswordForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const togglePassword = () => setIsShown(!isShown);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axiosInstance.post(apiRoutes.RESET_PASSWORD, {
        email,
        password,
      });
      console.log("res??:", res);
      if (res.status === 200 || res.status === 201) {
        toast.success("Successfully updated");
        router.push("/");
      } else {
        setError(res.data.message || "Error in resetting password");
        toast.error(res.data.message || "Error in resetting password");
      }
    } catch {
      console.error("Error in resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center">
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
            Reset Password
          </h2>
        </div>
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center sm:block hidden">
          Reset Password
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="mb-6">
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

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1">
            <input
              type={isShown ? "text" : "password"}
              name="password"
              id="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
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
  );
};

// Wrap in Suspense
const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
