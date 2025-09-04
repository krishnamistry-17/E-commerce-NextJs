"use client";
import { BannerHeading, Heading, Product } from "@/types/product";
import Image from "next/image";
import next from "../../../public/svgs/next.svg";
import previous from "../../../public/svgs/next.svg";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export const Categories = () => {
  const [data, setData] = useState([]);
  const [product, setProducts] = useState<Product[]>([]);
  const [heading, setHeadings] = useState<Heading[]>([]);
  const [bannerheading, setBannerHeading] = useState<BannerHeading[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<Product[]>("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchHeadings = async () => {
      try {
        const res = await axiosInstance.get<Heading[]>("/headings");
        setHeadings(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchbannerHeading = async () => {
      try {
        const res = await axiosInstance.get<BannerHeading[]>("/bannerheadings");
        setBannerHeading(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchbannerHeading();
    fetchProducts();
    fetchHeadings();
  }, []);

  const categoryBgColors: Record<string, string> = {
    "Cake & Milk": "bg-bgfruit2",
    Vegetables: "bg-bgfruit4",
    "Coffes & Teas": "bg-bgfruit2",
    Fruits: "bg-bgfruit5",
    "Pet Foods": "bg-bgfruit7",
  };

  const filteredProduct = product.filter(
    (products) => products?.category === activeTab
  );
  

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="md:flex justify-between items-center">
            <div className="md:flex justify-between  items-center pb-[43px]">
              <div>
                <p className="lg:text-[32px] text-[27px] font-quick-bold-700 text-regal-blue">
                  Featured Categories
                </p>
              </div>
              <div>
                <p
                  className="lg:text-[16px] xs375:text-[13px] text-[16px] pl-[29px] pt-[20px] font-quicksand-600 
                  text-regal-blue
                  xs375:flex items-center gap-[27.5px]"
                >
                  {heading?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setActiveTab(item?.title)}
                        className={` cursor-pointer  pt-2 xs375:pt-0  ${
                          activeTab === item?.title
                            ? " text-shopbtn"
                            : "text-regalblue"
                        }`}
                      >
                        {item?.title}
                      </div>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="md:flex items-center justify-between gap-2.5 hidden">
              <span className="bg-bggray w-[40px] h-[40px] rounded-full">
                <Image
                  src={previous}
                  alt="previous"
                  className=" items-center m-2"
                />
              </span>
              <span className="bg-bggray w-[40px] h-[40px] rounded-full">
                <Image src={next} alt="next" className=" items-center m-2" />
              </span>
            </div>
          </div>

          <div
            className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-[24px] 
          rounded-[10px] p-4 text-center items-center"
          >
            {(activeTab === "All" ? product : filteredProduct)?.map(
              (item, index) => {
                return (
                  <div
                    key={index}
                    className={`py-[22px]
                  ${categoryBgColors[item?.category]}
                  `}
                  >
                    <div>
                      <Image
                        src={item?.image}
                        alt={item?.title}
                        width={25}
                        height={25}
                        unoptimized
                        className=" items-center justify-center w-full"
                      />
                      <p>{item?.title}</p>
                      <p>
                        {item?.price}
                        <span className="pl-1">{item?.item}</span>
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="pt-[25px] pb-[56px] pl-[12px]">
          <div
            className="grid md:grid-cols-3 grid-cols-1 gap-[24px]
          rounded-[10px]
          "
          >
            {bannerheading.map((item, index) => {
              return (
                <div key={index} className=" relative">
                  <Image
                    src={item?.image}
                    alt="name"
                    width={25}
                    height={25}
                    unoptimized
                    className="  w-full"
                  />
                  <div className=" absolute top-8">
                    <p
                      className="lg:text-[24px] text-[16px] font-quick-bold-700
                     text-regalblue lg:max-w-[235px] max-w-[209px] pl-4"
                    >
                      {item?.banner}
                    </p>
                    <div className="pt-[15px] pl-4 ">
                      <button
                        className="text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
                        py-[8px] pl-[13px] pr-[28.11px]"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
