import axiosInstance from "@/lib/axios";
import { AboutWelcome } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import fb from "../../../public/svgs/fb.svg";
import twit from "../../../public/svgs/twit.svg";
import insta from "../../../public/svgs/insta.svg";
import youtube from "../../../public/svgs/youtube.svg";
import main1 from "../../../public/images/main1.png";
import main2 from "../../../public/images/main2.png";

const Team = () => {
  return (
    <div>
      <p className=" xl:text-[40px] text-[32px] font-quick-bold-700 text-regalblue text-center pb-5">
        Our Team
      </p>

      <div className="lg:flex gap-[10px]" style={{ alignItems: "stretch" }}>
        <div className="flex-1 flex flex-col">
          <p className="text-[16px] font-quick-bold-700 text-shopbtn">
            Our Team
          </p>
          <p className="xl:text-[48px] text-[32px] font-quick-bold-700 text-regalblue pt-[4px]">
            Meet Our Expert Team
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[10px]">
            Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa
            dolor imperdiet neccon sequata congue idsem. Maecenas malesuada
            faucibus finibus.
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[10px]">
            Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa
            dolor imperdiet neccon sequata congue idsem. Maecenas malesuada
            faucibus finibus.
          </p>
          <div className="pt-[20px]">
            <button className="bg-shopbtn text-white text-[14px] font-quick-bold-700 py-[14px] px-[30px] rounded-[4px]">
              View All Members
            </button>
          </div>
        </div>
        <div className="md:flex xl:gap-[24px] gap-2 lg:pt-0 pt-3">
          <div>
            <Image
              src={main1}
              alt="image"
              width={423}
              height={443}
              unoptimized
              className="w-full h-full object-cover rounded-md"
            />

            <div
              className=" relative bottom-[30px] z-50 rounded-[10px] mx-2
                border border-productborder bg-white 
          shadow-md p-4"
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-[24px] font-quick-bold-700 text-regalblue">
                  H. Merinda
                </p>
                <p className="text-[17px] font-lato-regular-400 text-bgbrown ">
                  CEO & Co-Founder
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Image src={fb} alt="fb" width={30} height={30} />
                  <Image src={twit} alt="twit" width={30} height={30} />
                  <Image src={insta} alt="insta" width={30} height={30} />
                  <Image src={youtube} alt="youtube" width={30} height={30} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={main2}
              alt="image"
              width={423}
              height={443}
              unoptimized
              className="w-full h-full object-cover rounded-md"
            />
            <div
              className=" relative bottom-[30px] z-50 rounded-[10px] mx-2
                border border-productborder bg-white 
          shadow-md p-4"
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-[24px] font-quick-bold-700 text-regalblue">
                  Dilan Specter
                </p>
                <p className="text-[17px] font-lato-regular-400 text-bgbrown ">
                  Head Engineer
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Image src={fb} alt="fb" width={30} height={30} />
                  <Image src={twit} alt="twit" width={30} height={30} />
                  <Image src={insta} alt="insta" width={30} height={30} />
                  <Image src={youtube} alt="youtube" width={30} height={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
