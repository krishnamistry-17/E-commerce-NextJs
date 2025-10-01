"use client";
import axiosInstance from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [hasUserTyped, setHasUserTyped] = useState(false);
  console.log("hasUserTyped :", hasUserTyped);
  const [suggestions, setSuggestions] = useState([]);
  console.log("suggestions :", suggestions);
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("query");
    setSearchInput(query);
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

  const fetchSuggestions = async (query) => {
    try {
      const response = await axiosInstance.get(
        `/api/product/search?q=${encodeURIComponent(query)}`
      );
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Suggestion fetch failed:", error);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };
  return (
    <div className="relative w-full max-w-[450px]">
      <form action="" onSubmit={handleSearch}>
        <div
          className="flex xl:w-[450px] lg:w-[401px] md:w-[350px] 
       w-full h-fit px-3 py-4 items-center
       border border-progessbtn rounded-[4px] bg-white"
        >
          <div className="flex items-center w-full bg-white rounded-[50px]">
            <input
              type="search"
              placeholder="Search for items.."
              className="flex-grow bg-transparent outline-none text-regalblue text-[16px]"
            />
            <FaSearch className="text-gray-500 mr-2 ml-3" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
//SEARCH_PRODUCT: "/api/product/search?q=ap",
