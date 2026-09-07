import React from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

export function Pagination({ handleChange, totalPage = 7, pageNum }) {
  const isPrevDisabled = pageNum === 1;
  const isNextDisabled = pageNum === totalPage;

  const next = () => {
    if (isNextDisabled) return;
    handleChange(pageNum + 1);
  };

  const prev = () => {
    if (isPrevDisabled) return;
    handleChange(pageNum - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-disabled={isPrevDisabled}
        onClick={prev}
        className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-200 ${
          isPrevDisabled
            ? "cursor-not-allowed bg-gray-200 text-gray-400 opacity-70 hover:bg-gray-300"
            : "bg-brand text-white hover:bg-blue-700"
        }`}
      >
        <BiArrowFromLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center gap-2">
        {[...Array(totalPage)].map((_, indx) => {
          const page = indx + 1;
          const isActive = pageNum === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => handleChange(page)}
              className={`rounded-full px-4 py-2 font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        aria-disabled={isNextDisabled}
        onClick={next}
        className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-200 ${
          isNextDisabled
            ? "cursor-not-allowed bg-gray-200 text-gray-400 opacity-70 hover:bg-gray-300"
            : "bg-brand text-white hover:bg-blue-700"
        }`}
      >
        Next
        <BiArrowFromRight strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}
