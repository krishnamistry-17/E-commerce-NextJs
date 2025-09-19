import axiosInstance from "@/lib/axios";
import { AllMergedProducts } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";

const Search = () => {
  const [product, setProduct] = useState<AllMergedProducts[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<AllMergedProducts[]>(
    []
  );
  console.log("filteredProducts :", filteredProducts);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<AllMergedProducts[]>(
          "/allMergedProducts"
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowercaseTerm = searchTerm?.toLowerCase();
    const results = product.filter((p) =>
      p.title.toLowerCase().includes(lowercaseTerm)
    );
    setFilteredProducts(results);
  }, [searchTerm, product]);

  const handleSubmit = (item: AllMergedProducts) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        newprice: item.newprice,
        quantity: 1,
        image: item.image,
      })
    );
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current?.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[450px]" ref={searchRef}>
      <div
        className="flex xl:w-[450px] lg:w-[401px] md:w-[350px]
       w-full h-fit px-3 py-4 items-center
       border border-progessbtn rounded-[4px] bg-white"
      >
        <div className="flex items-center w-full bg-white rounded-[50px]">
          <input
            type="search"
            placeholder="Search for items.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent outline-none text-regalblue text-[16px]"
          />
          <FaSearch className="text-gray-500 mr-2 ml-3 md:block hidden" />
        </div>
      </div>

      {searchTerm && filteredProducts.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border 
        rounded-md shadow-md max-h-[300px] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {filteredProducts.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-[8px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <p className="text-regalblue text-[14px] font-medium truncate max-w-[150px]">
                  {item.title}
                </p>
              </div>

              <div className="flex items-center gap-[8px]">
                <p className="text-bgbrown text-[14px] font-semibold">
                  ${item.newprice}
                </p>
                <button
                  type="button"
                  onClick={() => handleSubmit(item)}
                  className="bg-green-200 px-[10px] py-[4px] rounded-md text-regalblue text-[13px] font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
