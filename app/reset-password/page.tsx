"use client";

import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../api/apiRoutes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import mixpanelInstance from "@/lib/mixPanel";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const ResetPasswordForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const togglePassword = () => setIsShown(!isShown);

  useEffect(() => {
    mixpanelInstance.init();
    mixpanelInstance.track("reset_password_page_view");
  }, [mixpanelInstance]);

  const handleSubmit = async (values: typeof initialValues) => {
    setError(null);

    try {
      const res = await axiosInstance.post(apiRoutes.RESET_PASSWORD, {
        email: values.email,
        password: values.password,
      });
      console.log("res??:", res);
      if (res.status === 200 || res.status === 201) {
        toast.success("Successfully updated");
        router.push("/");
      } else {
        setError(res.data.message || "Error in resetting password");
        toast.error(res.data.message || "Error in resetting password");
      }
    } catch {
      console.error("Error in resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 rounded shadow-md w-full max-w-lg my-8
      "
      >
        <div className="flex gap-2 sm:hidden">
          <MdArrowBack
            className=" mt-3"
            onClick={() => router.push("/signin")}
          />
          <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center">
            Reset Password
          </h2>
        </div>

        <h2 className="text-[24px] font-quick-bold-700 text-regalblue mb-6 text-center sm:block hidden">
          Reset Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="w-full max-w-lg">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-regalblue text-[16px] font-quick-semibold-600"
                >
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
                <label htmlFor="password" className="block text-gray-700">
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

// Wrap in Suspense
const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
