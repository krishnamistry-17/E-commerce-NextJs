//app/pages/signup/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePassword = () => setIsShown(!isShown);

  const handleSubmit = async (values: typeof initialValues) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response: AxiosResponse = await axiosInstance.post(
        apiRoutes.GET_SIGNUP,
        {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        }
      );

      console.log("Signup response:", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("Signup successful! Please sign in.");
        router.push("/signin");
      } else if (response.status === 409) {
        const errorMsg = "User already exists";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = response.data?.message || "Signup failed";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);

      if (error && typeof error === "object" && "response" in error) {
        // Server responded with error
        const axiosError = error as {
          response?: { data?: { message?: string } };
          request?: unknown;
          message?: string;
        };
        const errorMsg = axiosError.response?.data?.message || "Signup failed";
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (error && typeof error === "object" && "request" in error) {
        // Request made but no response
        setError("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        const errorMsg =
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "Signup error";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign Up
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-regalblue text-[16px] font-quick-semibold-600">
                  Full Name<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0 "
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 pt-1 text-[12px]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-regalblue text-[16px] font-quick-semibold-600">
                  Email<span className="text-red-600">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0 "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 pt-1 text-[12px]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-regalblue text-[16px] font-quick-semibold-600">
                  Password<span className="text-red-600">*</span>
                </label>
                <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1 focus-within:ring-0 ">
                  <Field
                    type={isShown ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full focus:outline-none"
                  />
                  <div onClick={togglePassword} className="cursor-pointer ml-2">
                    {isShown ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 pt-1 text-[12px]"
                />
              </div>

              <div className="mb-2">
                <p>
                  Already have an account?
                  <span className="pl-2 underline hover:text-blue-600">
                    <a href="/signin">Sign In</a>
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
