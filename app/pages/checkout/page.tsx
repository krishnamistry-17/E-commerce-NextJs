"use client";
import React, { useEffect, useState } from "react";
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
  const [fname, setFName] = useState<string>("");
  const [lname, setLName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [street1, setStreet1] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipCode] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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

  // Fetch cart from backend and sync with Redux store
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.GET_CART);
      const backendCartData = res?.data?.cart?.cartItems;

      console.log("Backend cart data:", backendCartData);
      console.log("Redux cart items:", cartItems);

      // Merge backend and Redux data - prioritize backend but include Redux items not in backend
      let mergedCartData: Array<{
        productId: string;
        productName: string;
        price: number;
        quantity: number;
        total: number;
      }> = [];

      if (backendCartData && backendCartData.length > 0) {
        // Convert backend data to checkout format
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

      // Add Redux items that might not be in backend (for offline/local additions)
      if (cartItems.length > 0) {
        const reduxFormatted = cartItems.map((item) => ({
          productId: item.id,
          productName: item.productName,
          price: parseFloat(item.price),
          quantity: item.quantity,
          total: parseFloat(item.price) * item.quantity,
        }));

        // Add Redux items that are not already in backend data
        reduxFormatted.forEach((reduxItem) => {
          const existsInBackend = mergedCartData.some(
            (backendItem) => backendItem.productId === reduxItem.productId
          );
          if (!existsInBackend) {
            mergedCartData.push(reduxItem);
          }
        });
      }

      setCartData(mergedCartData);
      console.log("Final merged cart data:", mergedCartData);
    } catch (error) {
      console.error("Error fetching cart data", error);
      // Fallback to Redux store data only
      if (cartItems.length > 0) {
        const formattedCartData = cartItems.map((item) => ({
          productId: item.id,
          productName: item.productName,
          price: parseFloat(item.price),
          quantity: item.quantity,
          total: parseFloat(item.price) * item.quantity,
        }));
        setCartData(formattedCartData);
        console.log("Fallback to Redux data:", formattedCartData);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartItems.length]); // Re-fetch when Redux cart changes

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [cartData]);

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found, user is not authenticated.");
      toast.warn("Please signin..");
      return;
    }

    // Validation
    if (
      !email ||
      !fname ||
      !lname ||
      !phone ||
      !city ||
      !state ||
      !zipcode ||
      !country ||
      !street ||
      !street1
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
            fname,
            lname,
            email,
            phone,
            city,
            state,
            zipcode,
            country,
            street,
            street1,
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
      <form onSubmit={handleSubmit}>
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
                onSubmit={(values) => {
                  // Update state with Formik values
                  setFName(values.fname);
                  setLName(values.lname);
                  setEmail(values.email);
                  setphone(values.phone);
                  setCity(values.city);
                  setState(values.state);
                  setZipCode(values.zipcode);
                  setCountry(values.country);
                  setStreet(values.street);
                  setStreet1(values.street1);
                  setCompany(values.company);
                }}
              >
                {({ values, handleChange, handleBlur }) => {
                  // Sync Formik values with state on change
                  React.useEffect(() => {
                    setFName(values.fname);
                    setLName(values.lname);
                    setEmail(values.email);
                    setphone(values.phone);
                    setCity(values.city);
                    setState(values.state);
                    setZipCode(values.zipcode);
                    setCountry(values.country);
                    setStreet(values.street);
                    setStreet1(values.street1);
                    setCompany(values.company);
                  }, [values]);

                  return (
                    <Form>
                      <div className="w-full">
                        <div className="md:flex items-center gap-[20px] w-full">
                          <div className="flex flex-col w-full">
                            <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                              First Name<span className="text-red-600">*</span>
                            </label>
                            <Field
                              type="text"
                              name="fname"
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
                            <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                              Last Name<span className="text-red-600">*</span>
                            </label>
                            <Field
                              type="text"
                              name="lname"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Company Name (Optional)
                          </label>
                          <Field
                            type="text"
                            name="company"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Country / Region
                            <span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="country"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Street address
                            <span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="street"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Town / City<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="city"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            State<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="state"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            ZIP Code<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="zipcode"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Phone<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="tel"
                            name="phone"
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
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Email address<span className="text-red-600">*</span>
                          </label>
                          <Field
                            type="email"
                            name="email"
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
                          <Field type="checkbox" name="agreed" />

                          <p className="text-[14px] font-quick-medium-500 text-regalblue">
                            Create an account?
                          </p>
                        </div>
                        <div className="flex items-center gap-[5px] py-[8px]">
                          <Field
                            type="checkbox"
                            name="shipToDifferentAddress"
                          />

                          <p className="text-[14px] font-quick-bold-700 text-regalblue">
                            Ship to a different address?
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                            Order notes (optional)
                          </label>
                          <Field
                            type="text"
                            name="orderNotes"
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
                    ₹
                    {cartData.reduce(
                      (acc, item) => acc + Number(item?.price) * item?.quantity,
                      0
                    )}
                  </p>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-[10px] border-t border-bordercolor1">
                  <p className="text-[14px] font-quick-bold-700 text-bgbrown">
                    Total
                  </p>
                  <p className="text-[16px] font-quick-bold-700 text-regalblue">
                    ₹
                    {cartData.reduce(
                      (acc, item) => acc + Number(item?.price) * item?.quantity,
                      0
                    )}
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
                    checked={paymentMethod === "bank"}
                    onChange={() => handlePaymentChange("bank")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                      Direct bank transfer
                    </p>
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
                    checked={paymentMethod === "paypal"}
                    onChange={() => handlePaymentChange("paypal")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                      Paypal Payment
                    </p>
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
                    checked={paymentMethod === "card"}
                    onChange={() => handlePaymentChange("card")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                      Card (Stripe) Payment
                    </p>
                  </div>
                </div>
                {/* Cash on Delivery */}
                <div className="flex items-start gap-[5px] mt-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => handlePaymentChange("cod")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                      Cash on delivery
                    </p>
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
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1"
                  />
                  <p className="text-[15px] font-quick-semibold-600 text-regalblue">
                    I have read and agree to the website
                    <span className="text-shopbtn block">
                      terms and conditions
                    </span>
                  </p>
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
      </form>
    </div>
  );
};

export default CheckOut;
