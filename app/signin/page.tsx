"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, clearError } from "../pages/slice/authSlice";
import { RootState } from "../pages/store";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  const togglePassword = () => {
    setIsShown(!isShown);
  };

  const { user, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(formData));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign In
        </h2>
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
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:right-0"
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
              className=" focus:outline-none focus:right-0 w-full"
              required
            />
            <div onClick={togglePassword}>
              {isShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-[6px]">
          <p className="text-[14px] font-quick-semibold-600 text-regalblue">
            don't have an account?
          </p>
          <a
            href="/signup"
            className="text-[14px] font-quick-semibold-600 text-regalblue underline hover:text-blue-600"
          >
            SignUp
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
