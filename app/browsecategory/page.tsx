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
  const [activeTab, setActiveTab] = useState<string>("Deals");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toogleMenu = () => setIsMenuOpen((prev) => !prev);

  const tileWiseImage: Record<string, string> = {
    Deals: deals,
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
      <div className="w-full border-b border-gray-200 py-[14.5px] md:px-2 px-5 relative">
        <div className="md:flex justify-between items-center">
          <div
            className=" bg-shopbtn text-[16px] font-quick-bold-700 text-white
             py-[12px] px-[6px] 
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
            className="  lg:flex hidden  gap-4 text-[14px] sm:text-[15px] md:text-[16px] 
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
                  width={20}
                  height={20}
                  className="pl-1"
                />
              </div>
            ))}
          </div>
          <div className="  lg:hidden md:pt-0 pt-3">
            <div className="flex justify-between items-center">
              <button
                className="font-quick-bold-700 text-[16px] text-regalblue flex items-center gap-3"
                onClick={toogleMenu}
              >
                Menu
                <Image src={drop} alt="drop" width={20} height={20} />
              </button>
              <div className="sm:hidden">
                <Image src={head} alt="head" width={36} height={38} />
              </div>
            </div>

            {isMenuOpen && (
              <div
                className=" absolute md:top-[60px] top-[107px] md:left-1/2 left-3 w-[105px] bg-white
               border border-bordercolor p-3 z-50  lg:hidden"
              >
                <div
                  className="lg:hidden flex flex-col 
                   gap-4 text-[14px] sm:text-[15px] md:text-[16px] 
             font-quick-semibold-600 text-regalblue"
                >
                  <p>Deals</p>
                  <p>Shop</p>
                  <p>Vendores</p>
                  <p>Blog</p>
                  <p>Contact</p>
                </div>
              </div>
            )}
          </div>
          <div className="md:flex items-center hidden ">
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
