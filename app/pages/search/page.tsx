import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [product, setProduct] = useState("");
  return (
    <div>
      <div
        className="md:flex hidden xl:w-[450px] lg:w-[401px] md:w-[350px] w-[250px] h-fit 
                px-3 py-4 items-center border border-progessbtn rounded-[4px]"
      >
        <div className="flex items-center w-full bg-white rounded-[50px] ">
          <input
            type="search"
            placeholder="Search for items.."
            className="flex-grow bg-transparent outline-none text-inputtext"
          />

          <FaSearch className="text-gray-500 mr-2 ml-3" />
        </div>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search for items.."
          className=" outline-none text-inputtext w-full border p-4 border-gray-200 rounded-md md:hidden"
        />
      </div>
    </div>
  );
};

export default Search;
