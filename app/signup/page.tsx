"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../pages/store";
import { clearError, signUp } from "../pages/slice/authSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);
  const [isShown, setIsShown] = useState(false);

  const togglePassword = () => {
    setIsShown(!isShown);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUp(formData));
    router.push("/signin");
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            Username
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:right-0"
            required
          />
        </div>
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
            already have an account?
          </p>
          <a
            href="/signin"
            className="text-[14px] font-quick-semibold-600 text-regalblue underline hover:text-blue-600"
          >
            SignIn
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
