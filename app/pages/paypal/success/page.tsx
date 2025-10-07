"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";
import { clearCart } from "../../slice/cartSlice";
import { clearCartAfterPayment } from "@/utils/cartHelpers";

const PayPalSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "success" | "error"
  >("processing");

  // PayPal returns these parameters on success
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const payerId = searchParams.get("PayerID");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const executePayment = async () => {
      try {
        setIsProcessing(true);

        // Call your backend to execute the PayPal payment
        const response = await axiosInstance.post(
          "/api/paypal/execute-payment",
          {
            paymentId,
            token,
            payerId,
          }
        );

        if (response.data.success) {
          setPaymentStatus("success");
          toast.success("Payment completed successfully!");

          // Clear cart after successful PayPal payment
          await clearCartAfterPayment(dispatch, clearCart);

          // Redirect to thank you page after a delay
          setTimeout(() => {
            router.push("/pages/thankyou");
          }, 3000);
        } else {
          setPaymentStatus("error");
          toast.error("Payment execution failed");
        }
      } catch (error) {
        console.error("Payment execution error:", error);
        setPaymentStatus("error");
        toast.error("An error occurred while processing your payment");
      } finally {
        setIsProcessing(false);
      }
    };

    if (paymentId && token && payerId) {
      executePayment();
    } else {
      setPaymentStatus("error");
      setIsProcessing(false);
      toast.error("Invalid payment parameters");
    }
  }, [paymentId, token, payerId, dispatch, router]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Processing Payment...
        </h2>
        <p className="text-gray-500">
          Please wait while we confirm your payment
        </p>
      </div>
    );
  }

  if (paymentStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-center min-h-screen">
        <div className="bg-red-100 rounded-full p-6 mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 max-w-md mb-8">
          We encountered an issue processing your payment. Please try again or
          contact support.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/pages/checkout")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-center min-h-screen">
      <div className="bg-green-100 rounded-full p-6 mb-6">
        <FaCheckCircle className="text-green-600 w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 max-w-md mb-8">
        Your PayPal payment has been processed successfully. Redirecting to
        confirmation page...
      </p>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  );
};

export default PayPalSuccess;
