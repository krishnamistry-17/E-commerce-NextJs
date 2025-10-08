"use client";
// import useWindowWidth from "@/app/hooks/useWindowWidth";
import { RootState } from "@/app/store/store";
import axiosInstance from "@/lib/axios";
import { handleCart } from "@/utils/cartHelpers";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

interface Category {
  _id: string;
  category: string;
  productName: string;
  image: string;
  price: number;
  stock: number;
  quantity?: number;
}

const SearchContent = () => {
  const searchParams = useSearchParams();

  // const [_isMenuOpen, _setIsMenuOpen] = useState(false);
  // const [_isSubMenuOpen, _setIsSubMenuOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [hasUserTyped, setHasUserTyped] = useState(false);
  // const menuRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<Category[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  // const windowWidth = useWindowWidth();
  const clickedCartIds = useSelector(
    (state: RootState) => state.cart.clickedCartIds
  );

  useEffect(() => {
    const query = searchParams.get("q");
    setSearchInput(query || "");
  }, [searchParams]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (hasUserTyped && searchInput.trim().length > 1) {
        fetchSuggestions(searchInput);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, hasUserTyped]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/product/search?q=${encodeURIComponent(query)}`
      );
      setSuggestions(response.data.products || []);
    } catch (error) {
      console.error("Suggestion fetch failed:", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="relative w-full lg:max-w-[450px]">
      <form action="" onSubmit={handleSearch}>
        <div
          className="flex xl:w-[450px] lg:w-[401px]
       w-full h-fit px-3 py-4 items-center
       border border-progessbtn rounded-[4px] bg-white"
        >
          <div className="flex items-center w-full bg-white rounded-[50px]">
            <input
              type="search"
              placeholder="Search for items.."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setHasUserTyped(true);
              }}
              className="flex-grow bg-transparent outline-none text-regalblue text-[16px]"
            />

            <FaSearch className="text-gray-500 mr-2 ml-3" />
          </div>
        </div>
      </form>
      {suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border 
                rounded-md shadow-md max-h-[300px] overflow-y-auto"
          ref={mobileMenuRef}
        >
          {suggestions.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between px-4 py-2 space-y-3 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-[8px]">
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={50}
                  height={60}
                  className="rounded"
                />
                <p className="text-regalblue text-[14px] font-medium truncate max-w-[150px]">
                  {item.productName}
                </p>
              </div>

              <div className="flex items-center gap-[8px]">
                <p className="text-bgbrown text-[14px] font-semibold">
                  ${item.price}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleCart(item, clickedCartIds, dispatch);
                    // setSuggestions([]); //if userclick and close the suggestion menu auto then use this
                  }}
                  className={`${
                    clickedCartIds?.includes(item._id)
                      ? "bg-blue-200"
                      : "bg-green-200"
                  } px-[10px] py-[4px] rounded-md text-regalblue text-[13px] font-semibold`}
                >
                  {clickedCartIds?.includes(item._id) ? "Added" : "Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Search = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
};

export default Search;
//SEARCH_PRODUCT: "/api/product/search?q=ap",
