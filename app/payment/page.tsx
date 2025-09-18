///Volumes/System/E-commerce-NextJs/my-next-app/app/payment/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CheckoutForm from "../pages/checkout/chekoutForm";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const fname = searchParams.get("fname") || "";
  const lname = searchParams.get("lname") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const zipcode = searchParams.get("zipcode") || "";
  const country = searchParams.get("country") || "";

  const clientSecret = searchParams.get("clientSecret") || "";

  return (
    <div>
      <h2>Payment Page</h2>
      <CheckoutForm
        customerName={`${fname}${lname}`}
        customerEmail={email}
        clientSecret={clientSecret}
      />
    </div>
  );
};

export default PaymentPage;
