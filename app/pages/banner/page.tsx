"use client";

import React from "react";
import food from "../../../public/images/food.png";
import Image from "next/image";
import { FiSend } from "react-icons/fi";


const Banner = () => {
  return (
    <div className="py-[40px]">
      <div
        className="w-full h-fit object-cover rounded-[20px]
       shadow-lg bg-shopbtn bg-opacity-30 relative sm:p-[40px] p-2"
      >
        <div className="flex flex-col">
          <p
            className="lg:text-[40px] md:text-[32px] text-[22p]
           text-regalblue font-quick-bold-700 md:max-w-[530px]"
          >
            Stay home & get your daily needs from our shop
          </p>
          <p className="text-[18px] text-bgbrown font-lato-regular-400 pt-[20px] md:pb-[46px]">
            Start You'r Daily Shopping with{" "}
            <span className="text-shopbtn">Nest Mart</span>
          </p>

          <div className="flex lg:w-[450px] w-[250px] h-[64px] items-center">
            <div className="flex items-center w-full bg-white rounded-[50px] ">
              <FiSend className="text-gray-500 mr-2 ml-3" />

              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent outline-none text-inputtext"
              />

              <button
                className="ml-2 bg-shopbtn text-white text-[14px] md:text-[16px] 
              px-[16px] py-[8px] md:px-[40px] md:py-[22px] rounded-[50px] font-quick-bold-700 transition"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className=" mt-[53px] sm:mt-8 md:mt-0">
          <Image
            src={food}
            alt="food"
            width={25}
            height={25}
            unoptimized
            className=" absolute right-0 bottom-0 xl:w-[50%] lg:w-[44%] md:w-[53%] w-[50%] 
            object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
