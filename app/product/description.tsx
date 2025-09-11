import axiosInstance from "@/lib/axios";
import {
  InformationButton,
  InformationContent,
  InformationList,
} from "@/types/product";
import React, { useEffect, useState } from "react";

const Description = () => {
  const [heading, setHeadings] = useState<InformationButton[]>([]);
  const [detail, setDetail] = useState<InformationContent[]>([]);
  const [list, setList] = useState<InformationList[]>([]);

  const [activeTab, setActiveTab] = useState(
    heading[0]?.title || "Description"
  );

  useEffect(() => {
    const fetchProductsHeading = async () => {
      try {
        const res = await axiosInstance.get<InformationButton[]>(
          "/informationbutton"
        );
        setHeadings(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchProductsDetail = async () => {
      try {
        const res = await axiosInstance.get<InformationContent[]>(
          "/InformationContent"
        );
        setDetail(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchProductsList = async () => {
      try {
        const res = await axiosInstance.get<InformationList[]>(
          "/InformationList"
        );
        setList(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProductsHeading();
    fetchProductsDetail();
    fetchProductsList();
  }, []);
  return (
    <div className="max-w-[1082.86px] border border-productborder rounded-[15px] xl:py-[41px] xl:px-[50px] px-5 py-5">
      <div className="md:flex items-center gap-[10px] ">
        {heading?.map((item, index) => (
          <div key={index}>
            <button
              className={`px-[24px] py-[12px] border border-productborder rounded-[45px] shadow-md md:mt-0 mt-5 
            text-[17px] font-quick-bold-700 cursor-pointer
            ${activeTab === item?.title ? "text-shopbtn" : "text-bgbrown"}
            `}
              onClick={() => setActiveTab(item?.title)}
            >
              {item?.title}
            </button>
          </div>
        ))}
      </div>
      <div className="pt-[42px]">
        {detail?.map((item, index) => (
          <div key={index}>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
              {item?.para1}
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[5px]">
              {item?.para2}
            </p>
          </div>
        ))}
        <div className="grid gap-y-2 py-[25px]">
          {list?.map((item, index) => (
            <div key={index} className="grid grid-cols-[150px_1fr]">
              <span className="text-[14px] font-lato-regular-400 text-bgbrown">
                • {item?.title}
              </span>
              <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                {item?.content}
              </p>
            </div>
          ))}
        </div>

        <hr className=" text-bgbrown" />
        {detail?.map((item, index) => (
          <div key={index}>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[18px]">
              {item?.para3}
            </p>
          </div>
        ))}
        <p className="text-[24px] text-regalblue font-quick-bold-700 pt-[33px] pb-[16px]">
          Packaging & Delivery
        </p>
        <hr className=" text-bgbrown  pb-[16px]" />
        {detail?.map((item, index) => (
          <div key={index}>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
              {item?.para4}
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[5px]">
              {item?.para5}
            </p>
            <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
              {item?.title1}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
              {item?.content1}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
              {item?.content2}
            </p>
            <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
              {item?.title2}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
              {item?.content3}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
              {item?.content4}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
              {item?.content5}
            </p>
            <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
              {item?.title3}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
              {item?.content6}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
