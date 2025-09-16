import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Pagination = ({ totalPages = 5, currentPage, setCurrentPage }) => {
  const getPaginationRange = () => {
    const range = [];

    range.push(1);

    if (currentPage > 3) {
      range.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, totalPages + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (currentPage < totalPages - 2) {
      range.push("...");
    }

    range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange();

  const paginate = (pageNumber: number, e: any) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToPreviousPage = (e: any) => {
    e.preventDefault();
    if (currentPage === 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = (e: any) => {
    e.preventDefault();
    if (currentPage === 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row  
    items-center gap-4 mt-[16px] mb-[25px]"
    >
      {/* Previous Button */}
      <button
        className="flex items-center justify-center 
        w-[40px] h-[40px] bg-bggray rounded-[40px]
       "
        onClick={goToPreviousPage}
      >
        <MdArrowBackIos className="pl-[4px]" />
      </button>

      <div className="md:flex sm:gap-4 xs:gap-2">
        {paginationRange.map((number, index) =>
          typeof number === "number" ? (
            <button
              key={index}
              className={`
       w-[40px] h-[40px] bg-bggray rounded-[40px]
        ${
          currentPage === number
            ? "bg-shopbtn text-white text-[16px] font-quick-bold-700"
            : "bg-bggray text-bgbrown text-[16px] font-quick-bold-700"
        }
      `}
              onClick={(e) => paginate(number, e)}
            >
              {number}
            </button>
          ) : (
            <span
              key={index}
              className={`
        flex items-center justify-center 
        w-[40px] h-[40px] bg-bggray rounded-[40px]
      `}
            >
              ...
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className="flex items-center justify-center 
         w-[40px] h-[40px] bg-bggray rounded-[40px] 
        "
        onClick={goToNextPage}
      >
        <MdArrowForwardIos className="pl-[2px]" />
      </button>
    </div>
  );
};

export default Pagination;
