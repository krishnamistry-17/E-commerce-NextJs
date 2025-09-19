import axiosInstance from "@/lib/axios";
import { AllMergedProducts } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import { IoCheckmarkOutline } from "react-icons/io5";
import cartimage from "../../../public/svgs/cart.svg";

const Search = () => {
  const [product, setProduct] = useState<AllMergedProducts[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedCartIds, setClickedCartIds] = useState<Set<number>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<AllMergedProducts[]>(
    []
  );
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLDivElement>(null);

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
    const lowercaseTerm = searchTerm.toLowerCase();
    const results = product.filter((p) =>
      p.title.toLowerCase().includes(lowercaseTerm)
    );
    setFilteredProducts(results);
    setShowSearchDropdown(!!searchTerm && results.length > 0);
  }, [searchTerm, product]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (item: AllMergedProducts) => {
    dispatch(
      addToCart({
        id: item?.id,
        title: item?.title,
        newprice: item?.newprice,
        quantity: 1,
        image: item?.image,
      })
    );
    setClickedCartIds((prev) => new Set(prev).add(item?.id));
  };

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
            onFocus={() => {
              if (filteredProducts.length > 0) {
                setShowSearchDropdown(true);
              }
            }}
            className="flex-grow bg-transparent outline-none text-regalblue text-[16px]"
          />
          <FaSearch className="text-gray-500 mr-2 ml-3" />
        </div>
      </div>

      {showSearchDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border 
        rounded-md shadow-md max-h-[300px] overflow-y-auto"
        >
          {filteredProducts.slice(0, 6).map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-[8px]">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <p className="text-regalblue text-[14px] font-medium truncate max-w-[150px]">
                  {item?.title}
                </p>
              </div>

              <div className="flex items-center gap-[8px]">
                <p className="text-bgbrown text-[14px] font-semibold">
                  ${item?.newprice}
                </p>
                <div
                  className="flex items-center gap-2 bg-cartbtn rounded-[4px] px-3 py-2 cursor-pointer"
                  onClick={(e) => {
                    handleSubmit(item);
                    e.stopPropagation();
                  }}
                >
                  {clickedCartIds.has(item?.id) ? (
                    <IoCheckmarkOutline className="text-shopbtn" />
                  ) : (
                    <Image
                      src={cartimage}
                      alt="cart"
                      width={25}
                      height={25}
                      unoptimized
                      className="w-5"
                    />
                  )}
                  <button className="text-[14px] font-lato-bold-700 text-shopbtn">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
