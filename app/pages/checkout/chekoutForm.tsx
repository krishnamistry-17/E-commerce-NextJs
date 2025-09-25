"use client";

import { RootState } from "@/app/store/store";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../slice/cartSlice";

const inputStyles = {
  style: {
    base: {
      fontSize: "16px",
      color: "#111827", // Tailwind gray-900
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": {
        color: "#9CA3AF", // Tailwind gray-400
      },
    },
    invalid: {
      color: "#EF4444", // red-500
    },
  },
};

const CheckoutForm = ({ customerName, customerEmail }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const USD_TO_INR_RATE = 91.6422;

  const totalUSD = cartItems.reduce(
    (sum, item) => sum + item.newPrice * item.quantity,
    0
  );
  const totalINR = totalUSD * USD_TO_INR_RATE;

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:
            selectedCurrency === "USD"
              ? Math.round(totalUSD * 100)
              : Math.round(totalINR * 100),
          currency: selectedCurrency.toLowerCase(),
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [selectedCurrency, totalUSD, totalINR]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not ready.");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      toast.error("Card details not entered.");
      setLoading(false);
      return;
    }

    setLoading(true);
  

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      }
    );

    console.log("Stripe response:", { error, paymentIntent });

    if (error) {
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!");

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      cardNumberElement?.clear();
      cardExpiryElement?.clear();
      cardCvcElement?.clear();

      router.push("/pages/thankyou");
      dispatch(clearCart());
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="max-w-[1640px] mx-auto my-[30px] xl:px-[143px] px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-[30px]">
        <div className=" flex-1 h-fit rounded-lg shadow-md px-4 py-[12px] lg:py-[30px]">
          <p className="text-regalblue text-[16px] font-bold">
            Choose a currency:
          </p>

          <div className="flex items-center gap-6 my-4">
            <div
              className={`${
                selectedCurrency === "INR"
                  ? "border border-black"
                  : "border border-bordercolor1"
              } rounded-[5px] px-[12px] py-[6px]`}
            >
              <button
                className="text-[14px] text-regalblue"
                onClick={() => setSelectedCurrency("INR")}
              >
                <span className="pr-2">🇮🇳</span>INR ₹
              </button>
            </div>

            <div
              className={`${
                selectedCurrency === "USD"
                  ? "border border-black"
                  : "border border-bordercolor1"
              } rounded-[5px] px-[12px] py-[6px]`}
            >
              <button
                className="text-[14px] text-regalblue"
                onClick={() => setSelectedCurrency("USD")}
              >
                <span className="pr-2">🇺🇸</span> USD $
              </button>
            </div>
          </div>

          <p className="text-bgbrown text-[16px] mb-2">
            1 USD = 91.6422 INR
            <span className=" decoration-dotted underline pl-1">
              (include 4% connversion fee)
            </span>
          </p>

          {cartItems.map((item, index) => {
            const itemTotalUSD = item?.newPrice * item?.quantity;
            const itemTotalINR = itemTotalUSD * USD_TO_INR_RATE;

            return (
              <div
                className="flex items-center justify-between py-[16px]"
                key={index}
              >
                <p className="text-regalblue text-[16px]">{item?.title}</p>
                <p className="text-regalblue text-[16px] font-medium">
                  {selectedCurrency === "USD"
                    ? `$${itemTotalUSD.toFixed(2)}`
                    : `₹${itemTotalINR.toFixed(2)}`}
                </p>
              </div>
            );
          })}
          <div className="border-t pt-4 mt-4">
            <p className="text-lg font-semibold text-regalblue">
              Total:{" "}
              {selectedCurrency === "USD"
                ? `$${totalUSD.toFixed(2)}`
                : `₹${totalINR.toFixed(2)}`}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex-1 p-6 bg-white rounded-lg shadow-md space-y-6"
        >
          <div className="flex gap-[12px] w-full border border-bordercolor1 px-[12px] py-[12px] rounded-[5px] bg-gray-200">
            <p className="text-[14px] text-bgbrown">Email</p>
            <input
              type="email"
              value={customerEmail}
              className="w-full bg-gray-200 text-[14px] text-regalblue "
              disabled
            />
          </div>
          <p className="text-regalblue text-[16px] py-[6px] font-bold">
            Payment method
          </p>
          {/* Card Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Card Information
            </label>
            <div className="p-3 border border-gray-300 rounded-md  transition">
              <CardNumberElement options={inputStyles} />
            </div>
          </div>

          {/* Expiry & CVC - Flex layout */}
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Expiration
              </label>
              <div className="p-3 border border-gray-300 rounded-md  transition">
                <CardExpiryElement options={inputStyles} />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <div className="p-3 border border-gray-300 rounded-md  transition">
                <CardCvcElement options={inputStyles} />
              </div>
            </div>
          </div>

          {/*CardHolder name */}
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cardholder name
            </label>
            <input
              type="text"
              placeholder="Full name on card"
              className="p-3 border border-gray-300 rounded-md  transition"
            />
          </div>

          {/**Country */}
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cardholder name
            </label>
            <select className="p-3 border border-gray-300 rounded-md  transition">
              <option value="india">india</option>
              <option value="usd">usd</option>
            </select>
          </div>

          {/*checkout checkbox */}
          <div className=" space-y-2">
            <div className="md:flex items-center gap-[5px] p-5 border border-gray-300 rounded-md  transition">
              <input type="checkbox" className="mt-[-15px]" />
              <div className="flex flex-col ">
                <p className="text-[14px] ">
                  Save my information for faster checkout
                </p>
                <p className="text-[12px] text-bgbrown">
                  Pay Securely at New business sandbox and everywhere{" "}
                  <span className=" underline decoration-dotted">Link</span> is
                  accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-shopbtn text-white py-3 rounded-md font-semibold  transition "
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
