"use client";
import { DailyBestSells, DailySells } from "@/types/product";
import React, { useState } from "react";
import bestbanner from "../../../assets/images/bestbanner.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";

type Props = {
  heading: DailyBestSells[];
  dailydata: DailySells[];
};

const DailySells = ({ heading, dailydata }: Props) => {
  const [activeTab, setActiveTab] = useState(heading[0]?.title);
  const dispatch = useDispatch();

  const categoriesWiseTag: Record<string, string> = {
    "Save 35%": "bg-pinktag",
    Sale: "bg-bluetag",
    "Best Sale": "bg-shopbtn",
    "Save 15%": "bg-orangetag",
  };

  const filteredProduct = dailydata?.filter(
    (product) => product?.category === activeTab
  );

  const handleCart = (item: DailySells) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: 1,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <div className="pt-[50px]">
        <div className="flex flex-col">
          <div className="md:flex justify-between items-center">
            <div>
              <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
                Daily Best Sells
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
                      onClick={() => setActiveTab(item?.title)}
                      className={`cursor-pointer pt-2 xs375:pt-0 pl-[29px] xs375:pl-0
                      ${
                        activeTab === item?.title
                          ? "text-shopbtn"
                          : "text-regalblue"
                      }
                      `}
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="pt-[43px]">
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-[24px] gap-4">
              <>
                <div>
                  <Image
                    src={bestbanner}
                    alt="bestbanner"
                    className=" w-[378px]"
                  />
                </div>
                {(activeTab === "All" ? dailydata : filteredProduct)?.map(
                  (item, index) => {
                    return (
                      <div
                        key={index}
                        className="rounded-[15px] border border-productborder relative max-w-[298px] w-full gap-[24px]"
                      >
                        <div className=" absolute top-0">
                          <p
                            className={`w-[90.23px] h-[31px] 
                     rounded-tl-full rounded-tr-[8px] rounded-bl-[16px] rounded-br-full
                      text-center text-[12px] text-white font-lato-regular-400 py-[7px]
                      ${categoriesWiseTag[item?.tag]}
                      `}
                          >
                            {item?.tag}
                          </p>
                        </div>
                        <Image
                          src={item?.image}
                          alt={item?.category}
                          className="pt-[25px] px-[25px]"
                        />
                        <div className="flex flex-col px-[25px] ">
                          <p className="text-[12px] text-graytext font-lato-regular-400">
                            {item?.category}
                          </p>
                          <p className="text-[16px] font-quick-bold-700 text-regalblue pt-[8px] ">
                            {item?.title}
                          </p>
                          <div className="flex gap-[7.9px] items-center pt-[8px]">
                            <Image src={item?.ratingimage} alt="rating" />
                          </div>
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
                          <div className="pt-[8px]">
                            <input
                              type="range"
                              className=" accent-shopbtn  rounded-[4px]"
                            />
                          </div>
                          <p className="text-[14px] font-lato-regular-400 text-ratingtext pt-[8px]">
                            {item?.sold}
                            <span className="text-shopbtn pl-1">
                              {item?.soldnumber}
                            </span>
                          </p>
                          <div
                            className="flex items-center justify-center gap-2 my-[12px] bg-cartbtn rounded-[4px] h-[36px]"
                            onClick={() => handleCart(item)}
                          >
                            <Image src={item?.cartimage} alt="cart" />
                            <button className="text-[14px] font-lato-bold-700 text-shopbtn ">
                              {item?.cart}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailySells;
