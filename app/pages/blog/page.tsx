"use client";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import home from "../../../public/svgs/home.svg";
import right from "../../../public/svgs/right.svg";
import recipe from "../../../public/svgs/recipe.svg";
import show from "../../../public/svgs/show.svg";
import sort from "../../../public/svgs/sort.svg";
import drop from "../../../public/svgs/drop.svg";
import dot from "../../../public/svgs/dot.svg";
import category1 from "../../../public/svgs/category1.svg";
import category2 from "../../../public/svgs/category2.svg";
import category3 from "../../../public/svgs/category3.svg";
import category4 from "../../../public/svgs/category4.svg";
import category5 from "../../../public/svgs/category5.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setProductDetails } from "../slice/blogDetailSlice";

const Blog = () => {
  const [product, setProduct] = useState<any[]>([]);
  console.log("product????? :", product);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          "https://dummyjson.com/recipes"
        );
        setProduct(response?.data?.recipes);
      } catch (error) {
        console.error("Error fetching in products", error);
      }
    };
    fetchProduct();
  }, []);

  const handleDeatils = (item: any) => {
    console.log("item :", item);
    dispatch(setProductDetails(item));

    router.push(`/pages/blogproduct/${item.id}`);
  };

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
      <div className="w-full h-fit object-cover rounded-[20px] shadow-lg bg-shopbtn bg-opacity-30">
        <div className="flex flex-col pl-[68px] py-[70px]   ">
          <p className="text-regalblue font-quick-bold-700 text-[32px] ">
            Blog & News
          </p>
          <div className="flex items-center gap-[3px]">
            <div
              className="flex items-center gap-[8px]"
              onClick={() => router.push("/")}
            >
              <Image src={home} alt="home" width={14} height={14} />
              <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
                Home
              </p>
              <Image src={right} alt="right" width={19} height={24} />
            </div>
            <div className="flex items-center gap-[8px]">
              <p className="text-[14px] text-bgbrown font-quick-semibold-600">
                Blog & News
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto  flex flex-col lg:flex-row gap-[30px] pt-[75px]">
        <div>
          <div className="md:flex justify-between items-center">
            <div className="flex  items-center">
              <Image src={recipe} alt="recipe" width={36} height={36} />
              <p className=" pl-[10px] md:text-[40px] text-[32px] text-regalblue font-quick-bold-700">
                {" "}
                Recips Articles
              </p>
            </div>
            <div className="flex items-center gap-[10px] md:pt-0 pt-4">
              <div className="flex items-center border border-bordercolor rounded-[10px] py-[14px] px-[14px] cursor-pointer">
                <div>
                  <Image src={show} alt="show" width={14} height={14} />
                </div>
                <div className="flex items-center pl-[10px]">
                  <p className="text-[13px] font-lato-regular-400 text-recipetext">
                    Show:
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-recipetext pl-[5px]">
                    50
                  </p>
                </div>
                <div>
                  <Image
                    src={drop}
                    alt="drop"
                    className="pl-[10px]"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="flex items-center border border-bordercolor rounded-[10px] py-[14px] px-[14px] cursor-pointer">
                <div>
                  <Image src={sort} alt="sort" width={14} height={14} />
                </div>
                <div className="flex items-center pl-[10px]">
                  <p className="text-[13px] font-lato-regular-400 text-recipetext">
                    Sort:
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-recipetext pl-[5px]">
                    Featured
                  </p>
                </div>
                <div>
                  <Image
                    src={drop}
                    alt="drop"
                    className="pl-[10px]"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>

          {/**Main div */}
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[12px] pt-[50px]">
            {product.map((item, index) => (
              <div
                key={index}
                className="pt-[30px]"
                onClick={() => handleDeatils(item)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={368}
                  height={309}
                  unoptimized
                  className="w-full object-cover rounded-[15px]"
                />
                <div className="flex flex-col justify-center items-center pt-[19px]">
                  <p className="text-[14px] font-quick-bold-700 text-ratingtext">
                    {item?.cuisine}
                  </p>
                  <p className="xl:text-[24px] md:text-[20px] font-quick-bold-700 text-regalblue max-w-[236px]">
                    {item?.name}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      Review:{item?.reviewCount}
                    </p>
                    <span>
                      <Image src={dot} alt="dot" width={8} height={8} />
                    </span>
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      {item?.rating}/5
                    </p>
                    <span>
                      <Image src={dot} alt="dot" width={8} height={8} />
                    </span>
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      Min:{item?.prepTimeMinutes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:max-w-[344.95px] w-full">
          {/* Category Section */}
          <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
            <p className="text-[24px] font-quick-bold-700 text-regalblue pb-[20px]">
              Category
            </p>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
              <div className="bg-progessbtn h-1.5 rounded-full dark:bg-shopbtn w-[23%]"></div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  img: category1,
                  name: "Milks & Dairies",
                  qty: "5",
                },
                {
                  img: category2,
                  name: "Clothing",
                  qty: "6",
                },
                {
                  img: category3,
                  name: "Pet Foods",
                  qty: "7",
                },
                {
                  img: category4,
                  name: "Baking material",
                  qty: "12",
                },
                {
                  img: category5,
                  name: "Fresh Fruit",
                  qty: "16",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-bggray rounded-[5px] p-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={30}
                      height={30}
                    />
                    <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                      {item.name}
                    </p>
                  </div>

                  <div className="w-[24px] h-[24px] rounded-full bg-cartbtn flex items-center justify-center">
                    <p className="text-[12px] text-regalblue font-lato-regular-400">
                      {item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
