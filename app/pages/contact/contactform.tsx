import React from "react";
import address from "../../../public/svgs/whitelocation.svg";
import contact from "../../../public/images/contact.png";
import Image from "next/image";

const ContactForm = () => {
  const heads = ["Office", "Studio", "Shop"];
  const addressText =
    "205 North Michigan Avenue, Suite 810 Chicago, 60601, USA Phone: (123) 456-7890 Email: contact@Evara.com";
  const buttonText = "view map";

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1">
        {heads.map((head, index) => (
          <div className="flex flex-col text-start justify-start" key={index}>
            <p className="text-[24px] font-quick-bold-700 text-shopbtn md:pt-0 pt-3 ">
              {head}
            </p>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown pt-[18px]">
              {addressText}
            </p>
            <div className="pt-[24px]">
              <button
                className="text-white text-[12px] font-quick-bold-700 
                flex items-center gap-[5px] bg-shopbtn rounded-[4px] py-[12px] px-[10px]"
              >
                <Image src={address} alt="address" width={20} height={20} />
                {buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:flex gap-[62px] pt-[60px]">
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
              <div className="w-full border border-bordercolor rounded-[10px]">
                <input
                  type="text"
                  placeholder="First Name"
                  className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none"
                />
              </div>
              <div className="w-full border border-bordercolor rounded-[10px] md:mt-0 mt-[20px]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="md:flex gap-[24px] max-w-[894px] pt-[20px]">
              <div className="w-full border border-bordercolor rounded-[10px]">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none"
                />
              </div>
              <div className="w-full border border-bordercolor rounded-[10px] md:mt-0 mt-[20px]">
                <input
                  type="text"
                  placeholder="Subject"
                  className="md:py-[22px] py-[18px] pl-[21px] w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-[20px]">
              <textarea
                placeholder="Enter Query"
                className="focus:outline-none w-full h-[100px] p-[21px] border border-bordercolor rounded-[10px]"
              ></textarea>
            </div>

            <div className="pt-[37px]">
              <button
                type="submit"
                className="text-[17px] font-quick-medium-500 text-white bg-regalblue
                lg:px-[39px] lg:py-[21px] px-[20px] py-[12px] rounded-[10px]"
              >
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
