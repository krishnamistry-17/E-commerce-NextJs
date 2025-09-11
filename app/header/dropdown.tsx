import { useEffect, useState } from "react";
import Image from "next/image";
import drop from "../../public/svgs/drop.svg";

const TopbarDropdowns = () => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const languages = ["Hindi", "Spanish", "French"];
  const currencies = ["₹", "EUR", "INR"];

  const language = localStorage.getItem("lang");
  console.log('language :', language);

  useEffect(() => {
    localStorage.setItem("lang", selectedLang);
  }, []);

  return (
    <div className="relative flex items-center py-[11.5px] space-x-3 text-[13px] font-lato-regular-400 text-bgbrown">
      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowLangDropdown(!showLangDropdown)}
          className="flex items-center"
        >
          {selectedLang}
          <Image
            src={drop}
            alt="drop"
            width={12}
            height={12}
            className="ml-1"
          />
        </button>
        {showLangDropdown && (
          <div className="absolute bg-white border border-gray-200 shadow-md rounded mt-2 z-50 min-w-[100px]">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLang(lang);
                  setShowLangDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="text-black">|</span>

      {/* Currency Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          className="flex items-center"
        >
          {selectedCurrency}
          <Image
            src={drop}
            alt="drop"
            width={12}
            height={12}
            className="ml-1"
          />
        </button>
        {showCurrencyDropdown && (
          <div className="absolute bg-white border border-gray-200 shadow-md rounded mt-2 z-50 min-w-[100px]">
            {currencies.map((cur) => (
              <button
                key={cur}
                onClick={() => {
                  setSelectedCurrency(cur);
                  setShowCurrencyDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {cur}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopbarDropdowns;
