import { DealsHeading, DailyDeals } from "@/types/product";
import Image from "next/image";
import React from "react";
import next from "../../../assets/svgs/next.svg";

type Props = {
  heading: DealsHeading[];
  dailydeals: DailyDeals[];
};

const DealsDay = ({ heading, dailydeals }: Props) => {
  return (
    <>
      <div className="pt-[50px]">
        <div className="flex flex-col">
          <div className="md:flex justify-between items-center">
            <div>
              <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
                Deals Of The Day
              </p>
            </div>
            <div>
              <p
                className="lg:text-[16px] xs375:text-[13px] text-[16px] pt-[18px]
                font-quick-semibold-600 text-regalblue 
                md:flex items-center justify-between gap-[19.63px]
                "
              >
                {heading?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer pt-2 xs375:pt-0 pl-[29px] xs375:pl-0 text-regalblue flex items-center gap-2"
                    >
                      {item?.title}
                      <span>
                        <Image src={next} alt="next" />
                      </span>
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="pt-[43px]">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:gap-[24px] gap-4">
              <>
                {dailydeals?.map((item, index) => {
                  return (
                    <>
                      <div key={index} className=" relative">
                        <div>
                          <Image
                            src={item?.image}
                            alt="image"
                            className="w-[378px]"
                          />
                        </div>
                        <div className="rounded-[10px] border border-productborder bg-white absolute bottom-[-93px] xl:left-1 lg:left-[15px] xl:max-w-[298px] max-w-[220px] w-full gap-[24px]">
                          <div className="flex flex-col px-[25px] ">
                            <p className="text-[16px] font-quick-bold-700 text-regalblue pt-[8px] ">
                              {item?.title}
                            </p>
                            <div className="text-[14px] font-lato-regular-400 text-ratingtext pt-[8px] flex items-center">
                              <Image src={item?.ratingimage} alt="rating" />
                              <span className="text-shopbtn pl-1">
                                {item?.rating}
                              </span>
                            </div>
                            <div>
                              <p className="text-[14px] font-lato-regular-400 text-ratingtext pt-[8px]">
                                By
                                <span className="text-shopbtn pl-1">
                                  {item?.by}
                                </span>
                              </p>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className=" flex justify-between items-center pt-[22px]">
                                <div>
                                  <p className="text-[18px] font-quick-bold-700 text-shopbtn">
                                    {item?.newPrice}
                                    <span className="text-[14px] text-ratingtext pl-[10.46px] line-through">
                                      {item?.oldPrice}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-2  bg-cartbtn rounded-[4px] w-[84.91px] h-[36px]">
                                <Image src={item?.cartimage} alt="cart" />
                                <button className="text-[14px] font-lato-bold-700 text-shopbtn ">
                                  {item?.cart}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsDay;
