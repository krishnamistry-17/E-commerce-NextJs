"use client";

import React from "react";
import food from "../../../public/images/food.png";
import Image from "next/image";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  return (
    <div className="py-[40px]">
      <div
        className="w-full h-fit object-cover rounded-[20px]
             shadow-lg bg-shopbtn bg-opacity-30 relative sm:p-[40px] p-2 z-0"
      >
        <div className="flex flex-col relative z-20">
          <p
            className="lg:text-[40px] md:text-[32px] text-[22p]
                 text-regalblue font-quick-bold-700 md:max-w-[530px] relative z-20"
          >
            Stay home & get your daily needs from our shop
          </p>
          <div className="text-[18px] text-bgbrown font-lato-regular-400 pt-[20px] md:pb-[46px]">
            Start Your Daily Shopping with{" "}
            <span className="text-shopbtn">Nest Mart</span>
          </div>

          <div className="flex w-full  xs375:max-w-[450px] h-[64px] items-center z-30 relative">
            <div className="flex items-center  bg-white rounded-[50px] relative z-30">
              <FiSend className="text-gray-500 mr-2 ml-3" />

              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent text-inputtext focus:outline-none text-sm md:text-base z-30"
                style={{ position: "relative", zIndex: 30 }}
              />

              <button
                onClick={() => router.push("/signup")}
                className="ml-2 bg-shopbtn text-white text-[12px] md:text-[16px] 
        px-[14px] py-[8px] lg:px-[40px] md:px-[23px] md:py-[22px] 
        rounded-[50px] font-quick-bold-700 transition whitespace-nowrap z-30"
                type="submit"
                style={{ position: "relative", zIndex: 30 }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[53px] sm:mt-8 md:mt-0">
          <Image
            src={food}
            alt="food"
            width={25}
            height={25}
            unoptimized
            className="absolute right-0 bottom-0 xl:w-[50%] lg:w-[44%] md:w-[53%] w-[50%] z-10 object-cover pointer-events-none"
            style={{ zIndex: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
