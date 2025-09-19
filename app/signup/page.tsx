"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => setIsShown(!isShown);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // if user already exists
      const checkRes = await fetch(
        `http://localhost:4000/users?email=${encodeURIComponent(
          formData.email
        )}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setError("User with this email already exists.");
        setLoading(false);
        return;
      }

      // Create new user
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create user");

      //  Redirect to signin page after successful signup
      router.push("/signin");
    } catch (err) {
      setError("Something went wrong, please try again.");
      setLoading(false);
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
              className="focus:outline-none focus:right-0 w-full"
              required
            />
            <div onClick={togglePassword} className="cursor-pointer">
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
          disabled={loading}
          className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
