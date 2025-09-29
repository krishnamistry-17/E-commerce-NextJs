// app/payment/page.tsx or page.jsx
"use client";

import React, { Suspense } from "react";
import CheckoutFormWrapper from "./CheckoutFormWrapper";

const PaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutFormWrapper />
    </Suspense>
  );
};

export default PaymentPage;
