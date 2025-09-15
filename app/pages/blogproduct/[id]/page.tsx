"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import home from "../../../../public/svgs/home.svg";
import right from "../../../../public/svgs/right.svg";
import save from "../../../../public/svgs/save.svg";
import whishlist from "../../../../public/svgs/whishlist.svg";
import { MdStar } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

const BlogDetail = ({ params }: Props) => {
  const [data, setData] = useState<any>(null);
  console.log("data :", data);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://dummyjson.com/recipes/${params.id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error in fetching product", error);
      }
    };
    fetchData();
  }, []);

  //option
  //   type Recipe = {
  //   id: number;
  //   name: string;
  //   ingredients: string[];
  //   instructions: string;
  //   // add other fields from the API
  // };

  // const [data, setData] = useState<Recipe | null>(null);

  return (
    <>
      <div className="w-full  border-b border-gray-200 py-[12px] xl:px-[143px] xs375:px-5 px-2">
        <div className="flex items-center gap-[12px]">
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
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/")}
          >
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 cursor-pointer">
              Blogs
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              {data?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:pl-[311px] pl-4 pt-[50px] max-w-[897px] pb-[30px]">
        <p className="text-[16px] font-quick-bold-700 text-shopbtn">Recpies</p>
        <p className="xl:text-[40px] text-[32px] font-quick-bold-700 text-regalblue">
          {data?.name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[5px]">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p className="text-[16px] font-quick-semibold-600 text-bgbrown">
              {data?.rating}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={save} alt="save" width={14} height={24} />
            <Image src={whishlist} alt="whishlist" width={14} height={24} />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[1052px] mx-auto">
          <Image
            src={data?.image}
            alt={data?.name}
            width={1052}
            height={290}
            unoptimized
            className="w-full h-auto object-contain rounded-[15px]"
          />
        </div>
      </div>

      <div className=" mx-auto  xl:px-[243px] md:px-5 px-2 pt-[55px]">
        <p className="md:text-[24px] text-[18px] font-lato-regular-400 text-regalblue">
          Helping everyone live happier, healthier lives at home through their
          kitchen. Kitchn is a daily food magazine on the Web celebrating life
          in the kitchen through home cooking and kitchen intelligence.
        </p>
        <p className="text-[19px] font-lato-regular-400 text-bgbrown pt-2">
          Here is the Recipe and ingredients to make this dish.
        </p>
        <h2 className="text-[18px] font-quick-bold-700 mt-4 mb-2">
          Ingredients:
        </h2>
        <ul className="list-disc list-inside space-y-1">
          {data?.ingredients?.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-[18px] font-quick-bold-700 mt-4 mb-2">
          Instructions:
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          {data?.instructions?.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className="mt-4">
          <p className="text-[16px] text-regalblue font-quick-bold-700 space-y-2">
            Prepartation Time: {data?.prepTimeMinutes}
          </p>
          <p className="text-[16px] text-regalblue font-quick-bold-700 space-y-2">
            Cooking Time: {data?.cookTimeMinutes}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
