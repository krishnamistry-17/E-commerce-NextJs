import axiosInstance from "@/lib/axios";
import { Contact } from "@/types/product";
import React, { useEffect, useState } from "react";

const Help = () => {
  const [product, setProduct] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<Contact[]>("/contact");
        setProduct(res?.data);
      } catch (error) {
        console.error("Eror fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-3">
        <div>
          {product?.map((item, index) => (
            <div key={index}>
              <p className="text-[24px] font-quick-bold-700 text-shopbtn">
                {item?.head}
              </p>
              <p className="xl:text-[48px] text-[32px] font-quick-bold-700 text-regalblue pt-[18px]">
                {item?.title}
              </p>
              <p className=" text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
                {item?.para1}
              </p>
              <p className=" text-[16px] font-lato-regular-400 text-bgbrown pt-[18px]">
                {item?.para1}
              </p>
            </div>
          ))}
        </div>
        <div>
          {product?.map((item, index) => (
            <div className="flex flex-col">
              <p>{item?.questions?.que1}</p>
              <p>{item?.ans}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
