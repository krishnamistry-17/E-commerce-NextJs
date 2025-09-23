"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from "../signin/action";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isShown, setIsShown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const togglePassword = () => setIsShown(!isShown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Supabase auth only uses email/password, name is optional (store later in profile if needed)
    const form = new FormData();

    form.append("email", formData.email);
    form.append("password", formData.password);

    startTransition(() => {
      signup(form); //  call server action
    });
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

        {/* ... username input */}
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="username"
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
            required
          />
        </div>

        {/* ... email input */}
        <div className="mb-4">
          <label className="block text-regalblue text-[16px] font-quick-semibold-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
            required
          />
        </div>

        {/* ... password input */}
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1">
            <input
              type={isShown ? "text" : "password"}
              name="password"
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

        {/* ... submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
