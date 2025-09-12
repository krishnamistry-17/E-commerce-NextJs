"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import home from "../../../public/svgs/home.svg";
import right from "../../../public/svgs/right.svg";
import React from "react";
import Help from "./help";

const Contact = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full  border-b border-gray-200 py-[6px] xl:px-[143px] xs375:px-5 px-5">
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
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              Contact Us
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
        <Help />
      </div>
    </div>
  );
};

export default Contact;
