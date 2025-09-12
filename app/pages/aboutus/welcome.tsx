import axiosInstance from "@/lib/axios";
import { AboutWelcome } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Welcome = () => {
  const [product, setProduct] = useState<AboutWelcome[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<AboutWelcome[]>("/aboutuswelcome");
        setProduct(res?.data);
      } catch (error) {
        console.error("Eror fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        {product?.map((item, index) => (
          <div
            className="md:flex xl:gap-[49px] gap-[20px]"
            key={index}
            style={{ alignItems: "stretch" }}
          >
            <div className="flex-1">
              <Image
                src={item?.image}
                alt="image"
                height={400}
                width={400}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col pt-[69px]">
              <p className="xl:text-[40px] text-[32px] font-quick-bold-700 text-regalblue">
                {item?.head}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown py-[31px] text-justify">
                {item?.para1}
              </p>
              <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
                {item?.para2}
              </p>
              <div className=" grid grid-cols-3 gap-[24px] pt-[53px]">
                {[
                  item.subimages.image1,
                  item.subimages.image2,
                  item.subimages.image3,
                ].map((src, idx) => (
                  <div key={idx} className=" object-cover">
                    <Image
                      src={src}
                      alt={`Subimage ${idx + 1}`}
                      height={192}
                      width={236}
                      objectFit="cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="md:text-[40px] text-[32px] font-quick-bold-700 text-regalblue text-center pt-[40px]">
          What We Provide?
        </p>
        <div className="pt-[40px]">
          <div>
            {product?.map((item, index) => (
              <div
                key={index}
                className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px] "
              >
                {[
                  item.provideimages.image4,
                  item.provideimages.image5,
                  item.provideimages.image6,
                  item.provideimages.image7,
                  item.provideimages.image8,
                  item.provideimages.image9,
                ].map((src, ind) => (
                  <div
                    key={ind}
                    className="border border-bordercolor rounded-[15px] 
                    flex flex-col justify-center items-center h-full"
                  >
                    <Image
                      src={src}
                      alt={`Subimage ${ind + 1}`}
                      height={100}
                      width={100}
                      className="pt-[51px]"
                    />
                    <p className="text-[24px] font-quick-bold-700 text-regalblue pt-[34px]">
                      {item?.provide?.head}
                    </p>
                    <p className="text-[17px] font-lato-regular-400 text-bgbrown pt-[34px] text-justify px-4">
                      {item?.provide?.para}
                    </p>
                    <button className="mt-auto text-[16px] font-lato-regular-400 text-shopbtn py-[34px]">
                      {item?.provide?.btn}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-[25px]">
        {product?.map((item, index) => (
          <>
            <div className=" md:flex items-center gap-[30px]" key={index}>
              <div className="lg:w-[80%]">
                <Image
                  src={item?.performance?.image}
                  alt="image"
                  width={720}
                  height={538}
                  unoptimized
                  className=" object-cover"
                />
              </div>
              <div className="flex flex-col py-[66px]">
                <p className="lg:text-[24px] text-[20px] font-quick-bold-700 text-ratingtext">
                  {item?.performance?.subheading}
                </p>
                <p className="xl:text-[48px] lg:text-[32px] text-[25px] font-quick-bold-700 text-regalblue xl:pt-[18px] pt-2">
                  {item?.performance?.heading}
                </p>
                <p className="text-[16px] font-lato-regular-400 text-bgbrown xl:pt-[41px] pt-2">
                  {item?.performance?.para1}
                </p>
                <p className="text-[16px] font-lato-regular-400 text-bgbrown xl:pt-[34px] pt-2">
                  {item?.performance?.para2}
                </p>
              </div>
            </div>

            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-[20px]">
              <div className="flex flex-col">
                <p className="text-[32px] font-quick-bold-700 text-regalblue">
                  Who we are
                </p>
                <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[5px] text-justify">
                  Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                  mattis enim ut tellus eros donec ac odio orci ultrices in.
                  ellus eros donec ac odio orci ultrices in.
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[32px] font-quick-bold-700 text-regalblue">
                  Our history
                </p>
                <p className="text-[16px] font-lato-regular-400 text-bgbrown  pt-[5px] text-justify">
                  Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                  mattis enim ut tellus eros donec ac odio orci ultrices in.
                  ellus eros donec ac odio orci ultrices in.
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[32px] font-quick-bold-700 text-regalblue">
                  Our mission
                </p>
                <p className="text-[16px] font-lato-regular-400 text-bgbrown  pt-[5px] text-justify">
                  Volutpat diam ut venenatis tellus in metus. Nec dui nunc
                  mattis enim ut tellus eros donec ac odio orci ultrices in.
                  ellus eros donec ac odio orci ultrices in.
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Welcome;
