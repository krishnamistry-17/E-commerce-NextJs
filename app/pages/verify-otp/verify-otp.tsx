import { apiRoutes } from "@/app/api/apiRoutes";
import axiosInstance from "@/lib/axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  otp: Yup.string().required("OTP is required"),
});

const initialValues = {
  email: "",
  otp: "",
};

const Verifyotp = () => {
  const router = useRouter();
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await axiosInstance.post(apiRoutes.VERIFY_OTP, {
        email: values.email,
        otp: values.otp,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Otp verified successfully");
        router.push("/reset-password");
      } else {
        toast.error("Invalid otp");
      }
    } catch {
      console.error("Error while sending otp");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col space-y-4">
            <div className="mb-4">
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
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-regalblue text-[16px] font-quick-semibold-600"
              >
                otp<span className="text-red-600">*</span>
              </label>
              <Field
                type="otp"
                name="otp"
                id="otp"
                className="w-full px-4 py-2 border rounded mt-1 focus:outline-none focus:ring-0"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 pt-1 text-[12px]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
              >
                Verify Otp
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Verifyotp;
