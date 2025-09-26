"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import CheckoutForm from "../pages/checkout/chekoutForm";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const fname = searchParams.get("fname") || "";
  const lname = searchParams.get("lname") || "";
  const email = searchParams.get("email") || "";
  const clientSecret = searchParams.get("clientSecret") || "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutForm customerName={`${fname} ${lname}`} customerEmail={email} />
    </Suspense>
  );
};

export default PaymentPage;
