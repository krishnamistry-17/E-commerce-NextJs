import Image from "next/image";
import React, { useState } from "react";
import categories from "../../public/svgs/browse.svg";
import drop from "../../public/svgs/drop.svg";
import head from "../../public/svgs/headphone.svg";
import { BrowseHeading } from "@/types/product";
import deals from "../../public/svgs/deals.svg";

type Props = {
  browseheading: BrowseHeading[];
};

const BrowseCategories = ({ browseheading }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const tileWiseImage: Record<string, string> = {
    Deals: deals,
    Home: drop,
    About: drop,
    Shop: drop,
    Vendores: drop,
    "Mega menu": drop,
    Blog: drop,
    Pages: drop,
    Contact: drop,
  };

  return (
    <div>
      <div className="w-full border-b border-gray-200 py-[14.5px] px-2">
        <div className="flex flex-wrap justify-between items-center">
          <div
            className=" bg-shopbtn text-[16px] font-quick-bold-700 text-white py-[12px] px-[6px] 
          flex items-center rounded-[5px]"
          >
            <div className="flex items-center">
              <Image src={categories} alt="categories" height={20} width={20} />
              <p className="pl-2">Browse</p>
            </div>
            <div className="flex items-center pl-[6.5px]">
              <p className="pr-2">All categories</p>
              <Image src={drop} alt="drop" width={20} height={20} />
            </div>
          </div>
          <div
            className="flex flex-wrap gap-4 text-[14px] sm:text-[15px] md:text-[16px] 
             font-quicksand-700 text-regal-blue"
          >
            {browseheading?.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(item?.title)}
                className={`cursor-pointer flex items-center pt-2 xs375:pt-0 ${
                  activeTab === item?.title ? "text-shopbtn" : "text-regalblue"
                }`}
              >
                {item?.title}
                <Image
                  src={tileWiseImage[item?.title]}
                  alt="image"
                  width={14}
                  height={14}
                  unoptimized
                  className="pl-1"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <div>
              <Image src={head} alt="head" width={36} height={38} />
            </div>
            <div className="pl-[12px]">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 888
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                24/7 Support Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
