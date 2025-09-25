//app/pages/signup/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/authSlice";

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending] = useTransition();
  const [isShown, setIsShown] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const togglePassword = () => setIsShown(!isShown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password } = formData;

    try {
      // Make the API call
      const response = await axiosInstance.post(apiRoutes.GET_SIGNUP, {
        fullName,
        email,
        password,
      });

      console.log("response:", response);

      if (response.status === 200 || response.status === 201) {
        const { accessToken, email } = response.data.data;

        // Save the token to localStorage
        localStorage.setItem("accessToken", accessToken);

        // Optionally store user data (if you need it)
        localStorage.setItem("user", JSON.stringify(email));
        router.push("/signin");
      } else {
        setError("Signup failed");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || "Signup error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            fullName
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="fullName"
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
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
            id="email"
            value={formData.email}
            onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="123456789"
              className="w-full focus:outline-none focus:ring-0"
              required
            />
            <div onClick={togglePassword} className="cursor-pointer">
              {isShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <div className="mb-2">
          <p>
            alreday have an account?
            <span className="pl-2 underline hover:text-blue-600">
              <a href="/signin">Signin</a>
            </span>
          </p>
        </div>

        {/* ... submit */}
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
