import React from "react";

const BtnCreateNew = ({ title }) => {
  return (
    <button
      type="submit"
      className="w-[268px] h-[40px] rounded-[5px] px-5 py-2 bg-[#8338EC] text-white font-normal text-[16px] 
                         leading-[100%] tracking-[0%] flex items-center justify-center gap-[4px] 
                         transition-all duration-300 ease-out hover:bg-[#B588F4] hover:shadow-lg active:scale-95 cursor-pointer"
    >
      {title}
    </button>
  );
};

export default BtnCreateNew;
