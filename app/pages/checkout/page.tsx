"use client";

import React from "react";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import coupen from "../../../public/svgs/coupen.svg";
import shipping from "../../../public/svgs/shipping.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CheckOut = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("cartItems?? :", cartItems);

  const router = useRouter();
  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[20px]">
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
      <div className="flex  gap-[15px] pt-[30px]">
        <div className="max-w-[980px] w-full ">
          <div className="bg-bgpink px-[15px] py-[19px] rounded-[5px] border border-pinkbg">
            <div className="flex items-center gap-[5px] pb-[19px]">
              <Image src={shipping} alt="image" width={20} height={20} />
              <p className="text-[13px] font-quick-bold-700 text-regalblue">
                Add<span className="text-red-700">$299.11</span> to cart and get
                free shipping!
              </p>
            </div>
            <div className="w-full border border-pinkbg rounded-sm">
              <div className="w-full bg-pinkbg h-[5px]"></div>
            </div>
          </div>

          <div className="pt-[15px]">
            <form>
              <p className="text-[15px] font-quick-bold-700  text-regalblue">
                Billing details
              </p>
              <div className="w-full">
                <div className="flex items-center gap-[20px] w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Country / Region 
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Street address 
                  </label>
                  <input
                    type="text"
                    placeholder="House number and street name"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] pl-2 focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                  <div className="pt-[8px]">
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] pl-2 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Town / City 
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    State 
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    ZIP Code 
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
                    text-[12px] font-quick-medium-500 text-regalblue
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-[8px] py-[8px] focus:outline-none 
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
                  <label className="text-[13px] font-quick-bold-700 text-regalblue py-[8px]">
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
            </form>
          </div>
        </div>
        <div className="max-w-[380px] w-full h-fit border border-bordercolor rounded-[6px] bg-gray-50">
          <div className="flex flex-col px-[21px]">
            <p className="text-[15px] font-quick-bold-700 text-regalblue py-[21px] ">
              Your Order
            </p>
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-[15px] border-b border-bordercolor1">
                <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                  Product
                </p>
                <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                  Subtotal
                </p>
              </div>
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} className="py-[12px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                        {item?.title}
                      </p>
                      <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                        ${item?.newPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-[18px] border-b border-bordercolor1">
                      <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                        Subtotal
                      </p>
                      <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                        ${item?.newPrice}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <input type="checkbox" />
                      </div>
                      <p>Shipping</p>
                    </div>
                    <div className="flex items-center justify-between py-[18px] border-b border-bordercolor1">
                      <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                        Total
                      </p>
                      <p className="text-[16px] font-quick-bold-700 text-regalblue">
                        ${item?.newPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
