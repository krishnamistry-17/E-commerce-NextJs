"use client";
import React, { useState } from "react";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import coupen from "../../../public/svgs/coupen.svg";
import shipping from "../../../public/svgs/shipping.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOut = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const [fname, setFName] = useState<string>("");
  const [lname, setLName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipCode] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submit reload

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (!agreed) {
      alert("Please agree to terms");
      return;
    }

    if (paymentMethod === "card") {
      const queryParams = new URLSearchParams({
        fname,
        lname,
        email,
        phone,
        city,
        state,
        zipcode,
        country,
      });

      const targetUrl = `/payment?${queryParams.toString()}`;
      console.log("Navigating to payment page:", targetUrl);

      router.push(targetUrl);
    } else {
      // Handle other payment methods here or show confirmation
      console.log("Order placed with payment method:", paymentMethod);
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
          <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
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
        <div className="flex  gap-[15px] pt-[30px]">
          <div className="max-w-[980px] w-full ">
            <div className="bg-bgpink px-[15px] py-[19px] rounded-[5px] border border-pinkbg">
              <div className="flex items-center gap-[5px] pb-[19px]">
                <Image src={shipping} alt="image" width={20} height={20} />
                <p className="text-[13px] font-quick-bold-700 text-regalblue">
                  Add<span className="text-red-700">$299.11</span> to cart and
                  get free shipping!
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
              <div className="w-full">
                <div className="flex items-center gap-[20px] w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      First Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={fname}
                      onChange={(e) => setFName(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={lname}
                      onChange={(e) => setLName(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Company Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Country / Region<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Street address<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House number and street name"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                  <div className="pt-[8px]">
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Town / City<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    State<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    ZIP Code<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Phone<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Email address<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex items-center gap-[5px] py-[8px]">
                  <input type="checkbox" />
                  <p className="text-[14px] font-quick-medium-500 text-regalblue">
                    Create an account?
                  </p>
                </div>
                <div className="flex items-center gap-[5px] py-[8px]">
                  <input type="checkbox" />
                  <p className="text-[14px] font-quick-bold-700 text-regalblue">
                    Ship to a different address?
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                    Order notes (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full border border-gray-300 rounded-[8px] py-[30px] pl-2 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[380px] w-full h-fit border border-bordercolor rounded-[6px] bg-gray-50">
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
                {cartItems.map((item, index) => (
                  <div key={index} className="mb-[12px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                        {item?.title} x{item?.quantity}
                      </p>
                      <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                        ${item?.newPrice * item?.quantity}
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
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item?.newPrice * item?.quantity,
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
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item?.newPrice * item?.quantity,
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
                      Card Payment
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
