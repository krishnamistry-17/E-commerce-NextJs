"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { AppDispatch } from "../store/store";
import SignInButton from "../component/SignInButton";

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [isShown, setIsShown] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const togglePassword = () => setIsShown(!isShown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign In
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1">
            <input
              type={isShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="focus:outline-none w-full"
              required
            />
            <div onClick={togglePassword} className="cursor-pointer">
              {isShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700  "
          >
            {loading ? "Signing in..." : "Submit"}
          </button>
          <p className=" text-center ">or</p>

          <SignInButton />
        </div>
      </form>
    </div>
  );
};

export default Signin;
