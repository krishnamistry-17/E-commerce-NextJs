"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    setError(null);

    try {
      const res = await axiosInstance.post(apiRoutes.FORGOT_PASSWORD, {
        email: values.email,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Password reset link sent to your email.");
        router.push("/verify-otp");
      } else if (res.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        setError(res.data.message || "Error in signin");
      }
    } catch (error) {
      console.error("Error while sending forgot password email", error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <div className="flex gap-2 sm:hidden">
                <MdArrowBack
                  className=" mt-3"
                  onClick={() => router.push("/signin")}
                />
                <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
                  Forgot Password
                </h2>
              </div>
              <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center sm:block hidden">
                Forgot Password
              </h2>
              {error && (
                <p className="text-red-600 text-center mb-4">{error}</p>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-regalblue text-[16px] font-quick-semibold-600"
                >
                  Email<span className=" text-red-600">*</span>
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

              <button
                type="submit"
                className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
