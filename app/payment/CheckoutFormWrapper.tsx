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
  // const clientSecret = searchParams.get("clientSecret") || "";

  return (
    <CheckoutForm customerName={`${fname} ${lname}`} customerEmail={email} />
  );
};

export default CheckoutFormWrapper;
