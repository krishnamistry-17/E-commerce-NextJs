"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/authSlice";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const togglePassword = () => setIsShown(!isShown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    try {
      const response = await axiosInstance.post(apiRoutes.GET_SIGNIN, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const { accessToken, _id, email, role } = response.data.data;

        // Dispatch user info as an object, not just email
        dispatch(setAccessToken(accessToken));
        dispatch(setUser({ _id, email, role }));

        // Store token in localStorage if you want persistence (optional)
        localStorage.setItem("accessToken", accessToken);

        router.push("/");
      } else {
        setError("Signin failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Signin error");
      } else {
        setError("Signin error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center  py-8">
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
              className="focus:outline-none focus:ring-0 w-full"
              required
            />
            <div onClick={togglePassword} className="cursor-pointer">
              {isShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <div>
          <p className="pb-2">
            dont have an account?
            <span className="pl-2 underline hover:text-blue-700">
              <a href="/signup">Signup</a>
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
        >
          Submit
        </button>

        {/* <p className="text-center py-[10px]">or</p> */}
        {/* <SignInButton /> */}

        <div className="py-[10px]">
          <p>
            Forgot Password?
            <span className="pl-2 underline hover:text-blue">
              <a href="/forgot-password">Reset Password</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
