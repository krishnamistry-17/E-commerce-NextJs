// app/payment/page.tsx or page.jsx
"use client";

import React, { Suspense } from "react";
import CheckoutFormWrapper from "./CheckoutFormWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Elements stripe={stripePromise}>
        <CheckoutFormWrapper />
      </Elements>
    </Suspense>
  );
};

export default PaymentPage;
