const BtnCreateEmployee = ({ text }) => {
  return (
    <button
      className="w-[225px] h-[39px] rounded-[5px] border-[1px] border-gray-300 
                         bg-blue-600 text-white font-medium flex items-center justify-center gap-[10px] 
                         transition-all duration-300 ease-out hover:bg-blue-700 hover:shadow-lg 
                         active:scale-95 "
    >
      {text} თანამშრომლის შექმნა
    </button>
  );
};

export default BtnCreateEmployee;
