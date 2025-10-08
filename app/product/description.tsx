import Image from "next/image";
import React, { useState } from "react";
import drop from "../../public/svgs/drop.svg";

const Description = () => {
  const [categoryMenu, setCategoryMenu] = useState(false);

  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);
  const headings = [
    { id: "1", title: "Description" },
    { id: "2", title: "Additional info" },
    { id: "1", title: "Vendor" },
    { id: "1", title: "Reviews (3)" },
  ];
  const [activeTab, setActiveTab] = useState(headings[0].title);
  
  const infoList = [
    { title: "Type Of Packing", content: "Bottle" },
    { title: "Color", content: "Green, Pink, Powder Blue, Purple" },
    { title: "Quantity Per Case", content: "100ml" },
    { title: "Ethyl Alcohol", content: "70%" },
    { title: "Piece In One", content: "Carton" },
  ];

  const detail = {
    para3:
      "Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeez enchanting drunkenly more much wow callously irrespective limpet.",
    para4:
      "Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.",
    para5:
      "Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers outgrew lugubrious luridly irrationally attractively dachshund.",
    title1: "Suggested Use",
    content1: "Refrigeration not necessary.",
    content2: "Stir before serving",
    title2: "Other Ingredients",
    content3: "Organic raw pecans, organic raw cashews.",
    content4:
      "This butter was produced using a LTG (Low Temperature Grinding) process",
    content5:
      "Made in machinery that processes tree nuts but does not process peanuts, gluten, dairy or soy",
    title3: "Warnings",
    content6: "Oil separation occurs naturally. May contain pieces of shell.",
  };

  return (
    <div className="max-w-[1082.86px] border border-productborder rounded-[15px] xl:py-[41px] xl:px-[50px] px-5 py-5">
      <div className="md:flex hidden items-center gap-[10px] ">
        {headings?.map((item, index) => (
          <div key={index}>
            <button
              className={`px-[24px] py-[12px] border border-productborder rounded-[45px] shadow-md md:mt-0 mt-5 
            text-[17px] font-quick-bold-700 cursor-pointer
            ${activeTab === item?.title ? "text-shopbtn" : "text-bgbrown"}
            `}
              onClick={() => setActiveTab(item?.title)}
            >
              {item?.title}
            </button>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        {/*dropdown trigger */}
        <div
          className="flex items-center justify-between w-full bg-white py-2 px-4 
                rounded-[50px] border border-gray-200 cursor-pointer"
          onClick={toggleCategoryMenu}
        >
          <p className={`${activeTab ? "text-shopbtn" : "text-regalblue"}`}>
            {activeTab}
          </p>
          <Image src={drop} alt="Dropdown Icon" height={30} width={30} />
        </div>

        {/*dropdown menu */}
        {categoryMenu && (
          <div className="mt-2 bg-white border border-gray-200 rounded-[20px] p-2">
            <div className="flex flex-col pl-2 gap-4 flex-wrap">
              {headings?.map((item) => (
                <div
                  key={item?.id}
                  onClick={() => {
                    setActiveTab(item?.title);
                    setCategoryMenu(false);
                  }}
                  className={`cursor-pointer ${
                    activeTab === item?.title
                      ? "text-shopbtn font-bold"
                      : "text-regalblue"
                  }`}
                >
                  <p>{item?.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pt-[42px]">
        <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
          Uninhibited carnally hired played in whimpered dear gorilla koala
          depending and much yikes off far quetzal goodness and from for
          grimaced goodness unaccountably and meadowlark near unblushingly
          crucial scallop tightly neurotic hungrily some and dear furiously this
          apart.
        </p>
        <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[5px]">
          Spluttered narrowly yikes left moth in yikes bowed this that grizzly
          much hello on spoon-fed that alas rethought much decently richly and
          wow against the frequent fluidly at formidable acceptably flapped
          besides and much circa far over the bucolically hey precarious
          goldfinch mastodon goodness gnashed a jellyfish and one however
          because.
        </p>
      </div>

      <div className="grid gap-y-2 py-[25px]">
        {infoList?.map((item, index) => (
          <div key={index} className="grid grid-cols-[150px_1fr]">
            <span className="text-[14px] font-lato-regular-400 text-bgbrown">
              • {item?.title}
            </span>
            <p className="text-[14px] font-lato-regular-400 text-bgbrown">
              {item?.content}
            </p>
          </div>
        ))}
      </div>

      <hr className=" text-bgbrown" />

      <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[18px]">
        {detail?.para3}
      </p>

      <p className="text-[24px] text-regalblue font-quick-bold-700 pt-[33px] pb-[16px]">
        Packaging & Delivery
      </p>
      <hr className=" text-bgbrown  pb-[16px]" />

      <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify">
        {detail?.para4}
      </p>
      <p className="text-[16px] font-lato-regular-400 text-bgbrown text-justify pt-[5px]">
        {detail?.para5}
      </p>
      <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
        {detail?.title1}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
        {detail?.content1}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
        {detail?.content2}
      </p>
      <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
        {detail?.title2}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
        {detail?.content3}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
        {detail?.content4}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  pt-[10px]">
        {detail?.content5}
      </p>
      <p className="text-[24px] text-regalblue font-quick-bold-700 py-[23px] ">
        {detail?.title3}
      </p>
      <p className="text-[14px] font-lato-regular-400 text-bgbrown  ">
        {detail?.content6}
      </p>
    </div>
  );
};

export default Description;
