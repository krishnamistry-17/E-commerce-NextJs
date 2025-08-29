"use client";
import { BannerHeading, Heading, Product } from "@/types/product";
import Image from "next/image";
import next from "../../../assets/svgs/next.svg";
import previous from "../../../assets/svgs/previous.svg";
import { useState } from "react";

type Props = {
  heading: Heading[];
  products: Product[];
  bannerheading: BannerHeading[];
};

export const Categories = ({ heading, products, bannerheading }: Props) => {
  console.log("products :", products);
  const [activeTab, setActiveTab] = useState(heading[0]?.title);

  const categoryBgColors: Record<string, string> = {
    "Cake & Milk": "bg-bgfruit2",
    Vegetables: "bg-bgfruit4",
    "Coffes & Teas": "bg-bgfruit2",
    Fruits: "bg-bgfruit5",
    "Pet Foods": "bg-bgfruit7",
  };

  const filteredProduct = products.filter(
    (product) => product?.category === activeTab
  );

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
                        className={` cursor-pointer ${
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
            {filteredProduct?.map((item, index) => {
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
                      className=" items-cente justify-center w-full"
                    />
                    <p>{item?.title}</p>
                    <p>
                      {item?.price}
                      <span className="pl-1">{item?.item}</span>
                    </p>
                  </div>
                </div>
              );
            })}
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
                <div key={index}>
                  <Image src={item?.image} alt="name" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};


// echo "# E-commerce-NextJs" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/krishnamistry-17/E-commerce-NextJs.git
// git push -u origin main