import axiosInstance from "@/lib/axios";
import { Contact } from "@/types/product";
import React, { useEffect, useState } from "react";
import address from "../../../public/svgs/whitelocation.svg";
import contact from "../../../public/images/contact.png";
import Image from "next/image";

const ContactForm = () => {
  const [product, setProduct] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<Contact[]>("/contact");
        setProduct(res?.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {product?.map((item, index) => (
          <div key={index} className=" grid md:grid-cols-3 grid-cols-1">
            {[
              item?.location?.headone,
              item?.location?.headtwo,
              item?.location?.headthree,
            ].map((src, index) => (
              <div
                className="flex flex-col text-start justify-start"
                key={index}
              >
                <p className="text-[24px] font-quick-bold-700 text-shopbtn md:pt-0 pt-3 ">
                  {src}
                </p>
                <p className="text-[14px] font-lato-regular-400 text-bgbrown pt-[18px]">
                  {item?.locationdetail?.address}
                </p>
                <div className="pt-[24px] ">
                  <button
                    className="text-white text-[12px] font-quick-bold-700 
                  flex items-center gap-[5px] bg-shopbtn rounded-[4px] py-[12px] px-[10px]"
                  >
                    <Image src={address} alt="address" width={20} height={20} />
                    {item?.locationdetail?.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="lg:flex gap-[62px] pt-[60px] ">
        <div className="flex-1">
          <p className="text-[20px] font-quick-bold-700 text-shopbtn">
            Contact form
          </p>
          <p className="md:text-[40px] text-[32px] font-quick-bold-700 text-regalblue py-[10px]">
            Drop Us a Line
          </p>
          <p className="text-[14px] font-lato-regular-400  text-ratingtext pb-[30px]">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form>
            <div className="md:flex gap-[24px] max-w-[894px]">
              <div
                className="w-full border border-bordercolor rounded-[10px] 
              focus:outline-none focus:ring-0"
              >
                <input
                  type="text"
                  placeholder="First Name"
                  className=" py-[22px] pl-[21px] w-full"
                />
              </div>
              <div
                className="w-full border border-bordercolor rounded-[10px]
              focus:outline-none focus:ring-0 md:pt-0 pt-[20px]"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className=" py-[22px] pl-[21px] w-full"
                />
              </div>
            </div>

            <div className="md:flex gap-[24px] max-w-[894px] pt-[20px]">
              <div
                className="w-full border border-bordercolor rounded-[10px] 
               focus:outline-none focus:right-0"
              >
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className=" py-[22px] pl-[21px] w-full"
                />
              </div>
              <div
                className="w-full border border-bordercolor rounded-[10px]
              focus:outline-none focus:ring-0 md:pt-0 pt-[20px]"
              >
                <input
                  type="text"
                  placeholder="Subject"
                  className=" py-[22px] pl-[21px] w-full"
                />
              </div>
            </div>
            <div className="pt-[20px]">
              <textarea
                name=""
                id=""
                placeholder="Enter Query"
                className=" focus:outline-none focus:ring-0 w-full h-[100px] p-[21px]
                  border border-bordercolor rounded-[10px] "
              ></textarea>
            </div>
            <div className="pt-[37px]">
              <button className="text-[17px] font-quick-medium-500 text-white bg-regalblue px-[39px] py-[21px] rounded-[10px]">
                Send message
              </button>
            </div>
          </form>
        </div>

        <div>
          <Image
            src={contact}
            alt="image"
            width={20}
            height={20}
            unoptimized
            className="w-full object-cover rounded-[15px] lg:block hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
