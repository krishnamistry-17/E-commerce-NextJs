import Image from "next/image";
import React from "react";
import abourt from "../../../public/images/aboutus.png";
import sub1 from "../../../public/images/sub1.png";
import sub2 from "../../../public/images/sub2.png";
import sub3 from "../../../public/images/sub3.png";
import ad1 from "../../../public/svgs/ad1.svg";
import ad2 from "../../../public/svgs/ad2.svg";
import ad3 from "../../../public/svgs/ad3.svg";
import ad4 from "../../../public/svgs/ad4.svg";
import ad5 from "../../../public/svgs/ad5.svg";
import ad6 from "../../../public/svgs/ad6.svg";
import about from "../../../public/images/about.png";

const Welcome = () => {
  return (
    <>
      <div
        className="md:flex xl:gap-[49px] gap-[20px]"
        style={{ alignItems: "stretch" }}
      >
        <div className="flex-1">
          <Image
            src={abourt}
            alt="image"
            height={400}
            width={400}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col pt-[69px]">
          <p className="xl:text-[40px] text-[32px] font-quick-bold-700 text-regalblue">
            Welcome to Nest
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown py-[31px] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate id est laborum.
          </p>
          <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
            Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta
            et Ut placerat legendos interpre.Donec vitae sapien ut libero
            venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis
            commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut
            ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate id
            est laborum
          </p>
          <div className=" grid grid-cols-3 gap-[24px] pt-[53px]">
            {[sub1, sub2, sub3].map((src, idx) => (
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

      <div>
        <p className="md:text-[40px] text-[32px] font-quick-bold-700 text-regalblue text-center pt-[40px]">
          What We Provide?
        </p>
        <div className="pt-[40px]">
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px] ">
            {[ad1, ad2, ad3, ad4, ad5, ad6].map((src, ind) => (
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
                  Best Prices & Offers
                </p>
                <p className="text-[17px] font-lato-regular-400 text-bgbrown pt-[34px] text-justify px-4">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form
                </p>
                <button className="mt-auto text-[16px] font-lato-regular-400 text-shopbtn py-[34px]">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-[25px]">
        <div className=" md:flex items-center gap-[30px]">
          <div className="lg:w-[80%]">
            <Image
              src={about}
              alt="image"
              width={720}
              height={538}
              unoptimized
              className=" object-cover"
            />
          </div>
          <div className="flex flex-col py-[66px]">
            <p className="lg:text-[24px] text-[20px] font-quick-bold-700 text-ratingtext">
              Our performance
            </p>
            <p className="xl:text-[48px] lg:text-[32px] text-[25px] font-quick-bold-700 text-regalblue xl:pt-[18px] pt-2">
              Your Partner for e-commerce grocery solution
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown xl:pt-[41px] pt-2">
              Ed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown xl:pt-[34px] pt-2">
              Pitatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia
            </p>
          </div>
        </div>

        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-[20px]">
          <div className="flex flex-col">
            <p className="text-[32px] font-quick-bold-700 text-regalblue">
              Who we are
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown pt-[5px] text-justify">
              Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis
              enim ut tellus eros donec ac odio orci ultrices in. ellus eros
              donec ac odio orci ultrices in.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[32px] font-quick-bold-700 text-regalblue">
              Our history
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown  pt-[5px] text-justify">
              Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis
              enim ut tellus eros donec ac odio orci ultrices in. ellus eros
              donec ac odio orci ultrices in.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[32px] font-quick-bold-700 text-regalblue">
              Our mission
            </p>
            <p className="text-[16px] font-lato-regular-400 text-bgbrown  pt-[5px] text-justify">
              Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis
              enim ut tellus eros donec ac odio orci ultrices in. ellus eros
              donec ac odio orci ultrices in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
