import React from "react";
import Image from "next/image";
import Link from "next/link";
import phonecall from "../../public/svgs/phonecall.svg";
import fb from "../../public/svgs/fb.svg";
import insta from "../../public/svgs/insta.svg";
import twit from "../../public/svgs/twit.svg";
import pintress from "../../public/svgs/pintress.svg";
import youtube from "../../public/svgs/youtube.svg";

import {
  FooterContent,
  FooterDetails,
  FooterHeading,
  FooterMain,
} from "@/types/product";
import {
  footerapp,
  footerheadings,
  footersecond,
  footerthird,
} from "@/data/product";

type Props = {
  footerfirst: FooterMain[];
  footersecond: FooterDetails[];
  footerthird: FooterContent[];
  footerheadings: FooterHeading[];
};
const Footer = ({ footerfirst }: Props) => {
  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 xl:pt-[55px] pt-5">
      <div className=" grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 xl:gap-[50px] gap-5">
        <div className="flex flex-col">
          {footerfirst?.map((item, index) => (
            <div key={index}>
              <Link href="/">
                <Image
                  src={item?.image}
                  alt="logo"
                  width={140}
                  height={45}
                  priority
                />
              </Link>
              <p className="pt-[17px] font-lato-regular-400 text-[17px] text-regalblue">
                {item?.para}
              </p>
            </div>
          ))}
          {footersecond?.map((item, index) => (
            <div className="flex flex-col  pt-[16px]" key={index}>
              <div className="text-[15px] font-lato-regular-400 text-regalblue flex items-center ">
                <span>
                  <Image src={item?.icon} alt="call" width={20} height={20} />
                </span>
                {item?.detail}
              </div>
            </div>
          ))}
        </div>
        <div className=" flex flex-col">
          {footerthird?.map((item) => (
            <div>
              <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
                {item?.mainheading}
              </p>
            </div>
          ))}
          {footerheadings?.map((item, index) => (
            <div
              className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]"
              key={index}
            >
              <p>{item?.subheadings}</p>
            </div>
          ))}
        </div>
        <div className=" flex flex-col">
          {footerthird?.map((item) => (
            <div>
              <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
                {item?.mainheading1}
              </p>
            </div>
          ))}
          {footerheadings?.map((item, index) => (
            <div
              className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]"
              key={index}
            >
              <p>{item?.subheadings1}</p>
            </div>
          ))}
        </div>
        <div className=" flex flex-col">
          {footerthird?.map((item) => (
            <div>
              <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
                {item?.mainheading2}
              </p>
            </div>
          ))}
          {footerheadings?.map((item, index) => (
            <div
              className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]"
              key={index}
            >
              <p>{item?.subheadings2}</p>
            </div>
          ))}
        </div>
        <div className=" flex flex-col">
          {footerthird?.map((item) => (
            <div>
              <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
                {item?.mainheading3}
              </p>
            </div>
          ))}
          {footerheadings?.map((item, index) => (
            <div
              className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]"
              key={index}
            >
              <p>{item?.subheadings3}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div>
            {footerapp?.map((item, index) => (
              <div key={index} className=" pl-[12px] pt-[15px]">
                <p className="text-[24px] font-quick-bold-700 text-regalblue">
                  {item?.mainheading}
                </p>
                <p className="text-[15px] font-lato-regular-400 text-regalblue pt-[20px]">
                  {item?.subheading}
                </p>
                <div className="flex items-center gap-[12px] pt-[25px]">
                  <Image src={item?.image1} alt="app" width={128} height={42} />
                  <Image
                    src={item?.image2}
                    alt="googleplay"
                    width={128}
                    height={42}
                  />
                </div>
                <p className="pt-[48px]">{item?.paymentheading}</p>
                <div className="pt-[20px]">
                  <Image
                    src={item?.image3}
                    alt="paymentmethod"
                    width={224}
                    height={32}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="w-full border-b border-progessbtn my-8" />
      <div className="md:flex items-center justify-between pb-[34px]">
        <div className="flex flex-col">
          <p className="text-[14px] font-lato-regular-400 text-bgbrown">
            © 2022, Nest - HTML Ecommerce Template
            <br />
            All rights reserved
          </p>
        </div>
        <div className="lg:flex  items-center gap-[32px]  pt-[22px] md:pt-0">
          <div className="flex items-center gap-[12px]">
            <Image src={phonecall} alt="phone" width={30} height={38} />
            <div className="flex flex-col">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 6666
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                Working 8:00 - 22:00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[12px]  pt-[22px] md:pt-0">
            <Image src={phonecall} alt="phone" width={30} height={38} />
            <div className="flex flex-col">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 8888
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                24/7 Support Center
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col  pt-[22px] md:pt-0">
          <div className="flex items-center gap-[14px]">
            <p className="text-[16px] font-quick-bold-700 text-regalblue">
              Follow Us
            </p>
            <div className="flex items-center gap-[5px]">
              <Image src={fb} alt="fb" width={30} height={30} />
              <Image src={twit} alt="twit" width={30} height={30} />
              <Image src={insta} alt="insta" width={30} height={30} />
              <Image src={pintress} alt="pintress" width={30} height={30} />
              <Image src={youtube} alt="youtube" width={30} height={30} />
            </div>
          </div>
          <p className="text-[14px] font-lato-regular-400 text-bgbrown">
            Up to 15% discount on your first subscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
