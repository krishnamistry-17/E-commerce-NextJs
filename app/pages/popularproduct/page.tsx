"use client";

import React, { useEffect, useState } from "react";
import { PopularProductHeadings, PopularProducts } from "@/types/product";
import Image from "next/image";
import { useDispatch } from "react-redux";

type Props = {
  heading: PopularProductHeadings[];
  popularproduct: PopularProducts[];
};

const PopularProduct = ({ heading, popularproduct }: Props) => {
  const [activeTab, setActiveTab] = useState(heading[0]?.title);
  const [showAllProduct, setShowAllProduct] = useState("");
  const dispatch = useDispatch();

  const categoriesWiseTag: Record<string, string> = {
    Hot: "bg-pinktag",
    Sale: "bg-bluetag",
    New: "bg-shopbtn",
    "-14%": "bg-orangetag",
  };

  const filteredProduct = popularproduct?.filter(
    (product) => product?.category === activeTab
  );

  useEffect(() => {
    const findName = heading?.find((product) => product?.title === "All");
    console.log("findName :", findName);
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="md:flex justify-between items-center">
            <div>
              <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
                Popular Products
              </p>
            </div>
            <div>
              <p
                className="lg:text-[16px] xs375:text-[13px] text-[16px] pt-[18px]
              font-quick-semibold-600 text-regalblue 
              xs375:flex items-center justify-between gap-[19.63px]
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
                      ${item?.title === "All" ? `${showAllProduct}` : ""}
                      `}
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
          <div
            className="lg:pt-[43px] pt-5
          grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px] "
          >
            {(activeTab === "All" ? popularproduct : filteredProduct)?.map(
              (item, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-[15px] border border-productborder relative max-w-[298px] w-full gap-[24px]"
                  >
                    <div className=" absolute top-0">
                      <p
                        className={`w-[60.23px] h-[31px] 
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
                        <p className="text-[14px] font-lato-regular-400 text-ratingtext">
                          {item?.rating}
                        </p>
                      </div>
                      <p className="text-[14px] font-lato-regular-400 text-ratingtext pt-[8px]">
                        By<span className="text-shopbtn pl-1">{item?.by}</span>
                      </p>
                      <div className="py-[24px] flex justify-between items-center">
                        <div>
                          <p className="text-[18px] font-quick-bold-700 text-shopbtn">
                            {item?.newPrice}
                            <span className="text-[14px] text-ratingtext pl-[10.46px] line-through">
                              {item?.oldPrice}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1 bg-cartbtn rounded-[4px] w-[84.91px] h-[36px]">
                          <Image src={item?.cartimage} alt="cart" />
                          <button className="text-[14px] font-lato-bold-700 text-shopbtn ">
                            {item?.cart}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
