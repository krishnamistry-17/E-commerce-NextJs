import React from "react";
import Link from "next/link";
import WishListIcon from "../pages/wishlisticon/page";
import head from "../../public/svgs/headphone.svg";
import TopbarDropdowns from "../header/dropdown";
import Image from "next/image";

const HeaderTop = () => {
  return (
    <div>
      <div className="w-full md:h-[37px] h-fit border-b border-gray-200 pl-4 md:pl-0 pb-2 md:pb-14 py-2">
        <div className="md:flex items-center justify-around">
          <div className=" xs375:flex hidden items-center  ">
            <Link
              href="/pages/aboutus"
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
              className="text-[13px] font-lato-regular-400 text-bgbrown pl-[8.5px] lg:block hidden"
              href={"/pages/wishlist"}
            >
              Wishlist <span className=" text-black pl-[8.5px]">|</span>
              <WishListIcon />
            </Link>
            <Link
              href={"/pages/orders"}
              className="text-[13px] font-lato-regular-400 text-bgbrown pl-[8.5px] cursor-pointer"
            >
              Order Tracking
            </Link>
          </div>
          <div className=" xs375:flex items-center ">
            <p className="text-[13px] font-lato-regular-400 text-bgbrown ">
              Need help? Call Us:+{" "}
              <span className=" text-shopbtn">1800 900</span>{" "}
              <span className=" text-black pl-[8.5px] pr-[8.5px]">|</span>
            </p>
            <TopbarDropdowns />
          </div>
          <div className="md:flex items-center hidden  ">
            <div>
              <Image src={head} alt="head" width={36} height={38} />
            </div>
            <div className="pl-[12px] ">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 888
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                24/7 Support Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
