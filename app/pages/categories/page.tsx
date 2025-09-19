"use client";
import { BannerHeading, Heading, Product } from "@/types/product";
import Image from "next/image";
import next from "../../../public/svgs/next.svg";
import previous from "../../../public/svgs/previous.svg";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import food from "../../../public/images/food.png";
import { FiSend } from "react-icons/fi";
import drop from "../../../public/svgs/drop.svg";
import { useRouter } from "next/navigation";

export const Categories = () => {
  const [data, setData] = useState([]);
  const [product, setProducts] = useState<Product[]>([]);
  const [heading, setHeadings] = useState<Heading[]>([]);
  const [bannerheading, setBannerHeading] = useState<BannerHeading[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [categoryMenu, setCategoryMenu] = useState(false);
  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);
  const [visiblecount, setVisibleCount] = useState(5);
  const router = useRouter();

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

  // useEffect(() => {
  //   fetch("http://localhost:4000/products")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  // useEffect(() => {
  //   const updateCount = () => {
  //     const width = window.innerWidth;
  //     if (width >= 1200) setVisibleCount(5);
  //     else if (width >= 1024) setVisibleCount(2);
  //     else if (width >= 768) setVisibleCount(3);
  //     else setVisibleCount(2);
  //   };

  //   updateCount();
  //   window.addEventListener("resize", updateCount);
  //   return () => window.removeEventListener("resize", updateCount);
  // }, []);

  //  {(isOpen ? songList : songList?.slice(0, visibleCount))?.map(

  return (
    <>
      <div>
        <div
          className="w-full h-fit object-cover rounded-[20px]
             shadow-lg bg-shopbtn bg-opacity-30 relative sm:p-[40px] p-2"
        >
          <div className="flex flex-col">
            <p
              className="lg:text-[40px] md:text-[32px] text-[22p]
                 text-regalblue font-quick-bold-700 md:max-w-[530px]"
            >
              Fresh Vegetables Big discount
            </p>
            <p className="md:text-[22px] text-[16px] text-bgbrown font-lato-regular-400 pt-[20px] md:pb-[46px]">
              Save up to 50% off on your first order
            </p>

            <div className="flex lg:w-[450px] w-[250px] h-[64px] items-center">
              <div className="flex items-center w-full bg-white rounded-[50px] ">
                <FiSend className="text-gray-500 mr-2 ml-3" />

                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-transparent  text-inputtext focus:outline-none focus:right-0"
                />

                <button
                  onClick={() => router.push("/signup")}
                  className="ml-2 bg-shopbtn text-white text-[14px] md:text-[16px] 
                    px-[16px] py-[8px] md:px-[40px] md:py-[22px] rounded-[50px] font-quick-bold-700 transition"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className=" mt-[53px] sm:mt-8 md:mt-0">
            <Image
              src={food}
              alt="food"
              width={25}
              height={25}
              unoptimized
              className=" absolute right-0 bottom-0 xl:w-[50%] lg:w-[44%] md:w-[53%] w-[50%] 
                  object-cover "
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col pt-[55px]">
          <div className="md:flex justify-between items-center">
            <div className="md:flex hidden justify-between  items-center pb-[43px]">
              <div>
                <p className="lg:text-[32px] text-[27px] font-quick-bold-700 text-regalblue">
                  Featured Categories
                </p>
              </div>
              <div>
                <p
                  className="lg:text-[16px] md:text-[16px] xs375:text-[13px] text-[16px] pl-[29px] pt-[20px] font-quicksand-600 
                  text-regalblue
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
            <div className="md:hidden justify-between  items-center pb-[43px]">
              <div>
                <p className="lg:text-[32px] text-[27px] font-quick-bold-700 text-regalblue pb-4">
                  Featured Categories
                </p>
              </div>
              {/* Dropdown trigger */}
              <div
                className="flex items-center justify-between w-full bg-white py-2 px-4 
                rounded-[50px] border border-gray-400 cursor-pointer"
                onClick={toggleCategoryMenu}
              >
                <p
                  className={`${activeTab ? "text-shopbtn" : "text-regalblue"}`}
                >
                  {activeTab}
                </p>
                <Image
                  src={drop}
                  alt="Dropdown Icon"
                  height={30}
                  width={30}
                  className="mr-2 ml-3"
                />
              </div>

              {/* Dropdown menu */}
              {categoryMenu && (
                <div className="mt-2 bg-white border border-gray-400 rounded-[20px] p-2">
                  {heading?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveTab(item?.title);
                        setCategoryMenu(false);
                      }}
                      className={`cursor-pointer py-2 px-4 rounded-[10px] ${
                        activeTab === item?.title
                          ? "text-shopbtn "
                          : "text-regalblue"
                      } `}
                    >
                      {item?.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:flex items-center justify-between gap-2.5 hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[10px]">
            {bannerheading.map((item, index) => (
              <div key={index} className="relative flex flex-col h-full">
                <Image
                  src={item?.image}
                  alt={item?.banner || "Banner Image"}
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full rounded-[10px] object-cover"
                />
                <div className="absolute top-8 left-4">
                  <p className="text-[16px] lg:text-[24px] font-quick-bold-700 text-regalblue max-w-[209px] lg:max-w-[235px]">
                    {item?.banner}
                  </p>
                  <button className="mt-4 text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px] py-2 px-4">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
