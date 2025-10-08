"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/authSlice";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
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
  email: "",
  password: "",
};

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePassword = () => setIsShown(!isShown);

  const handleSubmit = async (values: typeof initialValues) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response: any = await axiosInstance.post(apiRoutes.GET_SIGNIN, {
        email: values.email,
        password: values.password,
      });

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        toast.success("Signin successful");
        const { accessToken, _id, email, role } = response.data.data;
        // Dispatch user info as an object, not just email
        dispatch(setAccessToken(accessToken));
        dispatch(setUser({ _id, email, role }));
        // Store token in localStorage if you want persistence (optional)
        localStorage.setItem("accessToken", accessToken);

        router.push("/");
      } else if (response.status === 401) {
        toast.error("Invalid credentials");
        setError("Invalid credentials");
      } else {
        const errorMsg = response.data?.message || "Signin failed";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error("Signin error:", error);

      if (error.response) {
        // Server responded with error
        const errorMsg = error.response.data?.message || "Invalid credentials";
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (error.request) {
        // Request made but no response
        setError("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError(error.message || "Signin error");
        toast.error(error.message || "Signin error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center  py-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
          Sign In
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
                  Email<span className="text-red-600">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 pt-1 text-[12px]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">
                  Password<span className="text-red-600">*</span>
                </label>
                <div className="flex items-center justify-between w-full px-4 py-2 border rounded mt-1">
                  <Field
                    type={isShown ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="123456789"
                    className="focus:outline-none focus:ring-0 w-full"
                  />
                  <div onClick={togglePassword} className="cursor-pointer">
                    {isShown ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 pt-1 text-[12px]"
                />
              </div>

              <div>
                <p className="pb-2">
                  Don't have an account?
                  <span className="pl-2 underline hover:text-blue-700">
                    <a href="/signup">Signup</a>
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>

              <div className="py-[10px]">
                <p>
                  Forgot Password?
                  <span className="pl-2 underline hover:text-blue">
                    <a href="/forgot-password">Reset Password</a>
                  </span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
