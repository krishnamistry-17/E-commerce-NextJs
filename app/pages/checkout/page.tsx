"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import coupen from "../../../public/svgs/coupen.svg";
import shipping from "../../../public/svgs/shipping.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { CreateOrderRequest } from "@/types/order";
import { clearCart } from "../slice/cartSlice";
import { clearCartAfterPayment } from "@/utils/cartHelpers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  company: Yup.string(), // Optional
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.string()
    .matches(/^\d{5,6}$/, "ZIP code must be 5-6 digits")
    .required("ZIP Code is required"),
  country: Yup.string().required("Country is required"),
  street: Yup.string().required("Street address is required"),
  street1: Yup.string(), // Optional
  agreed: Yup.boolean(),
  shipToDifferentAddress: Yup.boolean(),
  orderNotes: Yup.string(),
});

const initialValues = {
  fname: "",
  lname: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  street: "",
  street1: "",
  agreed: false,
};

const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  // Form fields are managed by Formik; no local state needed here
  const [cartData, setCartData] = useState<
    Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      total: number;
    }>
  >([]);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Fetch cart from backend and sync with Redux store (cancellable + stable)
  const fetchCart = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await axiosInstance.get(apiRoutes.GET_CART, { signal });
        const backendCartData = res?.data?.cart?.cartItems;

        let mergedCartData: Array<{
          productId: string;
          productName: string;
          price: number;
          quantity: number;
          total: number;
        }> = [];

        if (backendCartData && backendCartData.length > 0) {
          const backendFormatted = backendCartData.map(
            (item: {
              productId: string;
              productName: string;
              price: number;
              quantity: number;
            }) => ({
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              quantity: item.quantity,
              total: item.price * item.quantity,
            })
          );
          mergedCartData = [...backendFormatted];
        }

        if (cartItems.length > 0) {
          const reduxFormatted = cartItems.map((item) => ({
            productId: item.id,
            productName: item.productName,
            price: parseFloat(item.price),
            quantity: item.quantity,
            total: parseFloat(item.price) * item.quantity,
          }));

          reduxFormatted.forEach((reduxItem) => {
            const existsInBackend = mergedCartData.some(
              (backendItem) => backendItem.productId === reduxItem.productId
            );
            if (!existsInBackend) {
              mergedCartData.push(reduxItem);
            }
          });
        }

        if (!signal.aborted) {
          setCartData(mergedCartData);
        }
      } catch (error) {
        if (
          (error as unknown) instanceof DOMException &&
          (error as DOMException).name === "AbortError"
        ) {
          return; // request aborted, ignore
        }
        // Fallback to Redux data on failure
        if (!signal.aborted && cartItems.length > 0) {
          const formattedCartData = cartItems.map((item) => ({
            productId: item.id,
            productName: item.productName,
            price: parseFloat(item.price),
            quantity: item.quantity,
            total: parseFloat(item.price) * item.quantity,
          }));
          setCartData(formattedCartData);
        }
      }
    },
    [cartItems]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchCart(controller.signal);
    return () => controller.abort();
  }, [fetchCart]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      const controller = new AbortController();
      fetchCart(controller.signal);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [fetchCart]);

  // Memoized totals to avoid repeated reductions on each render
  const subtotal = useMemo(() => {
    return cartData.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
  }, [cartData]);

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async (
    values: typeof initialValues & {
      orderNotes?: string;
      shipToDifferentAddress?: boolean;
    }
  ) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found, user is not authenticated.");
      toast.warn("Please signin..");
      return;
    }

    // Validation
    if (
      !values.email ||
      !values.fname ||
      !values.lname ||
      !values.phone ||
      !values.city ||
      !values.state ||
      !values.zipcode ||
      !values.country ||
      !values.street ||
      !values.street1
    ) {
      toast.warning("Please fill all required fields");
      return;
    }
    if (!paymentMethod) {
      toast.warn("Please select a payment method");
      return;
    }
    if (!agreed) {
      toast.warn("Please agree to terms");
      return;
    }

    try {
      if (paymentMethod === "cod") {
        // Create order directly for COD
        const orderData: CreateOrderRequest = {
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
        console.log("Order response:", orderResponse);
        if (orderResponse.status === 200) {
          toast.success("Order placed successfully!");
          // Clear cart after successful order
          await clearCartAfterPayment(
            dispatch,
            clearCart,
            orderResponse.data.orderId
          );
          // Clear local cart data state
          setCartData([]);
          router.push(`/pages/thankyou?orderId=${orderResponse.data.orderId}`);
        } else {
          toast.error(orderResponse.data.message || "Failed to create order");
        }
      } else if (paymentMethod === "card") {
        // For card payments, create payment intent first then redirect
        try {
          const totalAmount = cartData.reduce(
            (acc, item) => acc + Number(item?.price) * item?.quantity,
            0
          );

          // Create payment intent
          const paymentResponse = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(totalAmount * 100), // Convert to cents
              currency: "inr",
            }),
          });

          const paymentData = await paymentResponse.json();

          if (paymentData.error) {
            toast.error(paymentData.error);
            return;
          }

          // Redirect to payment page with client secret
          const queryParams = new URLSearchParams({
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            phone: values.phone,
            city: values.city,
            state: values.state,
            zipcode: values.zipcode,
            country: values.country,
            street: values.street,
            street1: values.street1,
            clientSecret: paymentData.clientSecret,
            paymentIntentId: paymentData.paymentIntentId,
          });

          router.push(`/payment?${queryParams.toString()}`);
        } catch (error: unknown) {
          console.error("Payment intent creation error:", error);
          toast.error("Failed to initialize payment. Please try again.");
        }
      } else if (paymentMethod === "paypal") {
        // For PayPal, create order first then redirect to PayPal
        const orderData: CreateOrderRequest = {
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
          // Use existing PayPal flow with order ID
          const orderPayload = {
            Products: cartData.map((item) => ({
              ProductId: item?.productId,
              name: item?.productName,
              price: item?.price,
              quantity: item?.quantity,
              total: item?.total,
            })),
          };

          const res = await axiosInstance.post(
            apiRoutes.CREATE_ALL_PAYMENT,
            orderPayload
          );

          if (res.data.approvalUrl) {
            // Clear cart before redirecting to PayPal
            await clearCartAfterPayment(
              dispatch,
              clearCart,
              orderResponse.data.orderId
            );
            // Clear local cart data state
            setCartData([]);
            window.location.href = res.data.approvalUrl;
          } else {
            toast.error("Failed to get PayPal approval URL");
          }
        } else {
          toast.error(orderResponse.data.message || "Failed to create order");
        }
      } else if (paymentMethod === "bank") {
        // For bank transfer, create order with pending payment
        const orderData: CreateOrderRequest = {
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
          toast.success(
            "Order placed successfully! Please complete bank transfer."
          );
          // Clear cart after successful order
          await clearCartAfterPayment(
            dispatch,
            clearCart,
            orderResponse.data.orderId
          );
          // Clear local cart data state
          setCartData([]);
          router.push(`/pages/thankyou?orderId=${orderResponse.data.orderId}`);
        } else {
          toast.error(orderResponse.data.message || "Failed to create order");
        }
      }
    } catch (error: unknown) {
      console.error("Order creation error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while processing your order."
      );
    }
  };

  return (
    <div className="max-w-[1540px] mx-auto xl:px-[243px] px-2 pt-[20px]">
      <div className="flex items-center gap-[3px]">
        <div
          className="flex items-center gap-[8px]"
          onClick={() => router.push("/")}
        >
          <Image src={home} alt="home" width={14} height={14} />
          <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
            Home
          </p>
          <Image src={right} alt="right" width={19} height={24} />
        </div>
        <div
          className="flex items-center gap-[8px]"
          onClick={() => router.push("/pages/cart")}
        >
          <p className="text-[14px] text-shopbtn font-quick-semibold-600  cursor-pointer">
            Cart
          </p>
          <Image src={right} alt="right" width={19} height={24} />
        </div>
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] text-bgbrown font-quick-semibold-600">
            CheckOut
          </p>
        </div>
      </div>
      <div className=" w-full bg-bgcheckout py-[20px] px-[20px]">
        <div className="flex items-center gap-[5px]">
          <Image src={coupen} alt="coupen" width={20} height={20} />
          <div className=" border border-bordercolor1 w-full">
            <p className="text-[12px] text-regalblue font-quick-medium-500 py-[18px] pl-[18px]">
              Have a coupon? Click here to enter your code
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex  gap-[15px] pt-[30px]">
        <div className="max-w-[980px] w-full ">
          <div className="bg-bgpink px-[15px] py-[19px] rounded-[5px] border border-pinkbg">
            <div className="flex items-center gap-[5px] md:pb-[19px] pb-[10px]">
              <Image src={shipping} alt="image" width={20} height={20} />
              <p className="text-[13px] font-quick-bold-700 text-regalblue">
                Add<span className="text-red-700 pl-1">₹299.11</span> to cart
                and get free shipping!
              </p>
            </div>
            <div className="w-full border border-pinkbg rounded-sm">
              <div className="w-full bg-pinkbg h-[5px]"></div>
            </div>
          </div>

          <div className="pt-[15px]">
            <p className="text-[15px] lg:text-[18px] xl:text-[22px] font-quick-bold-700  text-regalblue">
              Billing details
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handlePlaceOrder(values)}
            >
              {() => {
                return (
                  <Form>
                    <div className="w-full">
                      <div className="md:flex items-center gap-[20px] w-full">
                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="fname"
                            className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                          >
                            First Name<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="fname"
                            id="fname"
                            aria-label="First Name"
                            className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                          />
                          <ErrorMessage
                            name="fname"
                            component="div"
                            className="text-red-500 pt-1 text-[12px]"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="lname"
                            className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                          >
                            Last Name<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="lname"
                            id="lname"
                            aria-label="Last Name"
                            className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                          />
                          <ErrorMessage
                            name="lname"
                            component="div"
                            className="text-red-500 pt-1 text-[12px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="company"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Company Name (Optional)
                        </label>
                        <Field
                          type="text"
                          name="company"
                          id="company"
                          aria-label="Company Name"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="company"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="country"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Country / Region
                          <span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="country"
                          id="country"
                          aria-label="Country / Region"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="street"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Street address
                          <span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="street"
                          id="street"
                          aria-label="Street address"
                          placeholder="House number and street name"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                        <div className="pt-[8px]">
                          <Field
                            type="text"
                            name="street1"
                            id="street1"
                            aria-label="Apartment, suite, unit"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                          />
                          <ErrorMessage
                            name="street1"
                            component="div"
                            className="text-red-500 pt-1 text-[12px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="city"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Town / City<span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="city"
                          id="city"
                          aria-label="Town / City"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="state"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          State<span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="state"
                          id="state"
                          aria-label="State"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="zipcode"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          ZIP Code<span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          aria-label="ZIP Code"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="zipcode"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Phone<span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="tel"
                          name="phone"
                          id="phone"
                          aria-label="Phone"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Email address<span className="text-red-600">*</span>
                        </label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          aria-label="Email address"
                          className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 pt-1 text-[12px]"
                        />
                      </div>
                      <div className="flex items-center gap-[5px] py-[8px]">
                        <Field
                          type="checkbox"
                          name="agreed"
                          id="agreed"
                          aria-label="Create an account?"
                        />

                        <p className="text-[14px] font-quick-medium-500 text-regalblue">
                          Create an account?
                        </p>
                      </div>
                      <div className="flex items-center gap-[5px] py-[8px]">
                        <Field
                          type="checkbox"
                          name="shipToDifferentAddress"
                          id="shipToDifferentAddress"
                          aria-label="Ship to a different address?"
                        />

                        <p className="text-[14px] font-quick-bold-700 text-regalblue">
                          Ship to a different address?
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="orderNotes"
                          className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]"
                        >
                          Order notes (optional)
                        </label>
                        <Field
                          type="text"
                          name="orderNotes"
                          id="orderNotes"
                          aria-label="Order notes"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          className="w-full border border-gray-300 rounded-[8px] py-[30px] pl-2 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className="md:max-w-[380px] w-full h-fit border border-bordercolor rounded-[6px] bg-gray-50 md:mt-0 mt-[30px] ">
          <div className="flex flex-col px-[21px]">
            <p className="text-[15px] font-quick-bold-700 text-regalblue py-[21px] ">
              Your Order
            </p>

            {/* Header */}
            <div className="flex items-center justify-between py-[15px] border-b border-bordercolor1">
              <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                Product
              </p>
              <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                Subtotal
              </p>
            </div>

            {/* Items */}
            <div className="py-[12px]">
              {cartData.map((item, index) => (
                <div key={index} className="mb-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                      {item?.productName} x{item?.quantity}
                    </p>
                    <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                      ₹{Number(item?.price) * item?.quantity}
                    </p>
                  </div>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex items-center justify-between py-[10px] border-t border-bordercolor1">
                <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                  Subtotal
                </p>
                <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                  ₹{subtotal}
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-[10px] border-t border-bordercolor1">
                <p className="text-[14px] font-quick-bold-700 text-bgbrown">
                  Total
                </p>
                <p className="text-[16px] font-quick-bold-700 text-regalblue">
                  ₹{subtotal}
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col py-[12px]">
              {/* Bank Transfer */}
              <div className="flex items-start gap-[5px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  id="bank-transfer"
                  checked={paymentMethod === "bank"}
                  onChange={() => handlePaymentChange("bank")}
                  className="mt-1"
                  aria-label="Direct bank transfer"
                />
                <div>
                  <label
                    htmlFor="bank-transfer"
                    className="text-[16px] font-quick-semibold-600 text-regalblue cursor-pointer"
                  >
                    Direct bank transfer
                  </label>
                  {paymentMethod === "bank" && (
                    <p className="text-[15px] font-quick-medium-500 text-bgbrown py-[6px]">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  )}
                </div>
              </div>
              {/*Paypal */}
              <div className="flex items-start gap-[5px] mt-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  id="paypal-payment"
                  checked={paymentMethod === "paypal"}
                  onChange={() => handlePaymentChange("paypal")}
                  className="mt-1"
                  aria-label="Paypal Payment"
                />
                <div>
                  <label
                    htmlFor="paypal-payment"
                    className="text-[16px] font-quick-semibold-600 text-regalblue cursor-pointer"
                  >
                    Paypal Payment
                  </label>
                  {paymentMethod === "paypal" && (
                    <p className="text-[15px] font-quick-medium-500 text-bgbrown py-[6px]">
                      You will be redirected to PayPal to complete your
                      purchase.
                    </p>
                  )}
                </div>
              </div>
              {/*Card Payment */}
              <div className="flex items-start gap-[5px] mt-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  id="card-payment"
                  checked={paymentMethod === "card"}
                  onChange={() => handlePaymentChange("card")}
                  className="mt-1"
                  aria-label="Card (Stripe) Payment"
                />
                <div>
                  <label
                    htmlFor="card-payment"
                    className="text-[16px] font-quick-semibold-600 text-regalblue cursor-pointer"
                  >
                    Card (Stripe) Payment
                  </label>
                </div>
              </div>
              {/* Cash on Delivery */}
              <div className="flex items-start gap-[5px] mt-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  id="cod-payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => handlePaymentChange("cod")}
                  className="mt-1"
                  aria-label="Cash on delivery"
                />
                <div>
                  <label
                    htmlFor="cod-payment"
                    className="text-[16px] font-quick-semibold-600 text-regalblue cursor-pointer"
                  >
                    Cash on delivery
                  </label>
                  {paymentMethod === "cod" && (
                    <p className="text-[15px] font-quick-medium-500 text-bgbrown py-[6px]">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </p>
                  )}
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-[5px] mt-3">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1"
                  aria-label="I have read and agree to the website terms and conditions"
                />
                <label
                  htmlFor="terms-agreement"
                  className="text-[15px] font-quick-semibold-600 text-regalblue cursor-pointer"
                >
                  I have read and agree to the website
                  <span className="text-shopbtn block">
                    terms and conditions
                  </span>
                </label>
              </div>
            </div>

            {/* Hidden Input & Submit */}
            {/* <input
                type="hidden"
                name="item"
                value={JSON.stringify(cartItems)}
              /> */}
            <div className="flex items-center justify-center px-[12px] py-[12px]">
              <button
                type="submit"
                className="text-white text-[16px] font-quick-bold-700 bg-shopbtn rounded-[5px] w-full py-[6px]"
                disabled={!agreed || !paymentMethod}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
