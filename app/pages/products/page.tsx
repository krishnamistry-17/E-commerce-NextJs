"use client";

import axiosInstance from "@/lib/axios";
import { Products, ProductsHeading } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  mainheading: ProductsHeading[];
  newproducts: Products[];
};

const Products = () => {
  const [data, setData] = useState([]);
  const [product, setProducts] = useState<Products[]>([]);
  const [heading, setHeadings] = useState<ProductsHeading[]>([]);

  const headingsArray = heading[0]?.productheadings || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<Products[]>("/newproducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchProductsHeading = async () => {
      try {
        const res = await axiosInstance.get<ProductsHeading[]>("/mainheading");
        setHeadings(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
    fetchProductsHeading();
  }, []);
  return (
    <>
      <div className="pt-[50px]">
        <div className="flex flex-col">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {headingsArray.map((heading, colIndex) => (
              <div className="flex flex-col" key={colIndex}>
                <div className="flex flex-col px-2">
                  <div className="text-[24px] text-regalblue font-quick-bold-700 pb-[16.45px]">
                    {heading}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div className="bg-progessbtn h-1.5 rounded-full dark:bg-shopbtn w-[23%]"></div>
                  </div>
                </div>

                <div className="pt-[10px]">
                  {product.map((item, index) => {
                    const imageToUse =
                      colIndex % 2 === 0 ? item?.image : item?.image1;

                    return (
                      <div
                        className="flex gap-[12px] items-center pt-[27px]"
                        key={index}
                      >
                        <div>
                          <Image
                            src={imageToUse}
                            alt={item?.category}
                            width={25}
                            height={25}
                            unoptimized
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <div className="flex flex-col pl-[12px]">
                          <p className="text-[16px] text-regalblue font-quick-bold-700">
                            {item?.title}
                          </p>
                          <div className="text-[14px] font-lato-regular-400 text-ratingtext pt-1 flex items-center">
                            <Image
                              src={item?.ratingimage}
                              alt="rating"
                              width={25}
                              height={25}
                              unoptimized
                              className="  w-[60px]"
                            />
                            <span className="text-shopbtn pl-1">
                              {item?.rating}
                            </span>
                          </div>
                          <p className="text-[18px] font-quick-bold-700 text-shopbtn">
                            ${item?.newPrice}
                            <span className="text-[14px] text-ratingtext pl-2 line-through">
                              ${item?.oldPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
