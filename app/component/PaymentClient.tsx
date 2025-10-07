// components/PaymentClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PaymentClientContent = () => {
  const searchParams = useSearchParams();
  const cartItems = searchParams.get("cartItems")?.split(",") || [];

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Cart Items: {cartItems.join(", ")}</p>
    </div>
  );
};

const PaymentClient = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <PaymentClientContent />
    </Suspense>
  );
};

export default PaymentClient;
