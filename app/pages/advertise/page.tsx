"use client";

import axiosInstance from "@/lib/axios";
import { Advertise } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Advertise = () => {
  const [product, setProducts] = useState<Advertise[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<Advertise[]>("/advertise");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className=" pt-[40px] grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[24px]">
        {product?.map((item, index) => {
          return (
            <div key={index} className="bg-bgfruit1 rounded-[10px] p-[20px]">
              <div className="flex items-center gap-[20px]">
                <div>
                  <Image
                    src={item?.image}
                    alt="adimage"
                    width={25}
                    height={25}
                    unoptimized
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[18px] text-advertistext font-quick-semibold-600">
                    {item?.title}
                  </p>
                  <p className="text-[16px] font-lato-regular-400 text-graytext pt-1 ">
                    {item?.order}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Advertise;
