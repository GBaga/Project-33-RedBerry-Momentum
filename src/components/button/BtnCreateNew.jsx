import React from "react";

const BtnCreateNew = () => {
  return (
    <button
      className="w-[268px] h-[40px] rounded-[5px] px-5 py-2 bg-blue-600 text-white font-medium 
                         flex items-center justify-center gap-1 transition-all duration-300 ease-out 
                         hover:bg-blue-700 hover:shadow-lg active:scale-95"
    >
      + შექმენი ახალი დავალება
    </button>
  );
};

export default BtnCreateNew;
