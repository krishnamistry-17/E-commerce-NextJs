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
import { OrderService } from "@/services/orderService";
import { CreateOrderRequest, ShippingAddress } from "@/types/order";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { clearCartAfterPayment } from "@/utils/cartHelpers";

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

type CheckoutFormProps = {
  customerName: string;
  customerEmail: string;
  clientSecret?: string;
  paymentIntentId?: string;
};

const CheckoutForm = ({
  customerName,
  customerEmail,
  clientSecret: passedClientSecret,
  paymentIntentId,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [cartData, setCartData] = useState<any[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const USD_TO_INR_RATE = 91.6422;

  const totalUSD = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const totalINR = totalUSD * USD_TO_INR_RATE;

  // Fetch cart data and extract shipping address from URL params
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axiosInstance.get(apiRoutes.GET_CART);
        setCartData(response?.data?.cart?.cartItems || []);
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };

    fetchCartData();

    // Extract shipping address from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const address: ShippingAddress = {
      firstName: urlParams.get("fname") || "",
      lastName: urlParams.get("lname") || "",
      email: urlParams.get("email") || "",
      phone: urlParams.get("phone") || "",
      address: urlParams.get("street") || "",
      address1: urlParams.get("street1") || "",
      city: urlParams.get("city") || "",
      state: urlParams.get("state") || "",
      zipCode: urlParams.get("zipcode") || "",
      country: urlParams.get("country") || "",
    };
    setShippingAddress(address);
  }, []);

  useEffect(() => {
    // Use passed client secret if available, otherwise create new one
    if (passedClientSecret) {
      setClientSecret(passedClientSecret);
    } else {
      const createPaymentIntent = async () => {
        setIsInitializing(true);
        try {
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

          if (data.error) {
            toast.error(data.error);
            return;
          }

          setClientSecret(data.clientSecret);
        } catch (error: any) {
          console.error("Error creating payment intent:", error);
          toast.error("Failed to initialize payment. Please try again.");
        } finally {
          setIsInitializing(false);
        }
      };

      createPaymentIntent();
    }
  }, [selectedCurrency, totalUSD, totalINR, passedClientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not ready.");
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      toast.error("Payment client secret is not ready.");
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

      // Create order after successful payment
      try {
        if (shippingAddress && cartData.length > 0) {
          const orderData = {
            Products: cartData.map((item) => ({
              ProductId: item?.productId,
              quantity: item?.quantity,
              price: item?.price,
              total: item?.total,
            })),
          };

          const orderResponse = await axiosInstance.post(
            apiRoutes.CREATE_ALL_PAYMENT,
            orderData
          );

          if (orderResponse.status === 200) {
            const cardNumberElement = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement = elements.getElement(CardCvcElement);

            cardNumberElement?.clear();
            cardExpiryElement?.clear();
            cardCvcElement?.clear();

            // Clear cart after successful payment and order creation
            await clearCartAfterPayment(dispatch, clearCart);
            router.push(
              `/pages/thankyou?orderId=${orderResponse.data.orderId}`
            );
          } else {
            toast.error(orderResponse.data.message || "Failed to create order");
          }
        } else {
          toast.error("Shipping address or cart data not found");
        }
      } catch (orderError: any) {
        console.error("Order creation error:", orderError);
        toast.error(
          "Payment successful but failed to create order. Please contact support."
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Show loading state while initializing payment
  if (isInitializing) {
    return (
      <div className="max-w-[1640px] mx-auto my-[30px] xl:px-[143px] px-4 sm:px-6 py-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shopbtn mx-auto mb-4"></div>
            <p className="text-regalblue text-lg">Initializing payment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if client secret is not available
  if (!clientSecret) {
    return (
      <div className="max-w-[1640px] mx-auto my-[30px] xl:px-[143px] px-4 sm:px-6 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-red-800 text-lg font-semibold mb-2">
            Payment Initialization Failed
          </h2>
          <p className="text-red-600 mb-4">
            Unable to initialize payment. Please try again or contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-shopbtn text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            const itemTotalUSD = Number(item?.price) * item?.quantity;
            const itemTotalINR = itemTotalUSD * USD_TO_INR_RATE;

            return (
              <div
                className="flex items-center justify-between py-[16px]"
                key={index}
              >
                <p className="text-regalblue text-[16px]">
                  {item?.productName}
                </p>
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
