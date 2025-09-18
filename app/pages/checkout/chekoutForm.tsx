"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  customerName: string;
  customerEmail: string;
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  customerName,
  customerEmail,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(
      CardElement
    ) as StripeCardElement | null;

    if (!cardElement) {
      toast.error("Card details not found");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      }
    );

    if (error) {
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">Payment details</h2>

      <label
        htmlFor="card-element"
        className="block text-sm font-medium text-gray-700"
      >
        Card Information
      </label>

      <div className="rounded-md border border-gray-300 bg-white shadow-inner px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition">
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#374151", // Tailwind gray-700
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: "400",
                "::placeholder": { color: "#9CA3AF" }, // Tailwind gray-400
              },
              invalid: {
                color: "#EF4444", // Tailwind red-500
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full flex justify-center items-center rounded-md bg-purple-600 px-6 py-3 text-white text-lg font-semibold transition 
      hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
