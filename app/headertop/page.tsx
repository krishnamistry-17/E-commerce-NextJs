import React from "react";
import Link from "next/link";
import WishListIcon from "../pages/wishlisticon/page";
import TopbarDropdowns from "../header/dropdown";

const HeaderTop = () => {
  return (
    <div>
      <div className="w-full md:h-[37px] h-fit border-b border-gray-200 pl-4 md:pl-0 pb-2 md:pb-14">
        <div className="md:flex items-center justify-around ">
          <div className=" xs375:flex hidden items-center py-[11.5px] ">
            <Link
              href="/about"
              className="text-[13px] font-lato-regular-400 text-bgbrown"
            >
              About Us <span className=" text-black pl-[8.5px]">|</span>
            </Link>
            <Link
              className="text-[13px] font-lato-regular-400 text-bgbrown pl-[8.5px]"
              href={"/user-profile"}
            >
              My Account <span className=" text-black pl-[8.5px]">|</span>
            </Link>
            <Link
              className="text-[13px] font-lato-regular-400 text-bgbrown pl-[8.5px]"
              href={"/pages/wishlist"}
            >
              Wishlist <span className=" text-black pl-[8.5px]">|</span>
              <WishListIcon />
            </Link>
            <p className="text-[13px] font-lato-regular-400 text-bgbrown pl-[8.5px]">
              Order Tracking
            </p>
          </div>
          <div className=" xs375:flex items-center py-[11.5px]">
            <p className="text-[13px] font-lato-regular-400 text-bgbrown ">
              Need help? Call Us:+{" "}
              <span className=" text-shopbtn">1800 900</span>{" "}
              <span className=" text-black pl-[8.5px] pr-[8.5px]">|</span>
            </p>
            <TopbarDropdowns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
