"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const PayPalCancel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PayPal returns these parameters on cancel
  const token = searchParams.get("token");
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show cancellation message
    toast.info("Payment was cancelled. You can try again anytime.");

    // Log cancellation for analytics
    console.log("PayPal payment cancelled:", { token, paymentId });
  }, [token, paymentId]);

  return (
    <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-center min-h-screen">
      <div className="bg-yellow-100 rounded-full p-6 mb-6">
        <FaTimesCircle className="text-yellow-600 w-10 h-10" />
      </div>

      <h1 className="text-4xl font-bold text-yellow-700 mb-4">
        Payment Cancelled
      </h1>

      <p className="text-lg text-gray-700 max-w-md mb-8">
        Your PayPal payment was cancelled. No charges have been made to your
        account. You can complete your purchase at any time.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/pages/checkout")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/pages/cart")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
        >
          Review Cart
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
        >
          Continue Shopping
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
        <h3 className="font-semibold text-gray-700 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-2">
          If you're having trouble with payments, please contact our support
          team.
        </p>
        <button
          onClick={() => router.push("/pages/contact")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default PayPalCancel;
