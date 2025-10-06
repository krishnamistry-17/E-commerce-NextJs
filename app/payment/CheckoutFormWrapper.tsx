// app/payment/CheckoutFormWrapper.tsx or CheckoutFormWrapper.jsx
"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import CheckoutForm from "../pages/checkout/chekoutForm";

const CheckoutFormWrapper = () => {
  const searchParams = useSearchParams();

  const fname = searchParams.get("fname") || "";
  const lname = searchParams.get("lname") || "";
  const email = searchParams.get("email") || "";
  const clientSecret = searchParams.get("clientSecret") || "";
  const paymentIntentId = searchParams.get("paymentIntentId") || "";

  // Show error if required parameters are missing
  if (!fname || !lname || !email) {
    return (
      <div className="max-w-[1640px] mx-auto my-[30px] xl:px-[143px] px-4 sm:px-6 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-red-800 text-lg font-semibold mb-2">
            Missing Required Information
          </h2>
          <p className="text-red-600">
            Please go back to the checkout page and fill in all required fields.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CheckoutForm
      customerName={`${fname} ${lname}`}
      customerEmail={email}
      clientSecret={clientSecret}
      paymentIntentId={paymentIntentId}
    />
  );
};

export default CheckoutFormWrapper;
