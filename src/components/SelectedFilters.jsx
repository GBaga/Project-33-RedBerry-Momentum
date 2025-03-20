const SelectedFilters = ({
  departments,
  priorities,
  employees,
  selectedDepartments,
  setSelectedDepartments,
  selectedPriorities,
  setSelectedPriorities,
  selectedEmployees,
  setSelectedEmployees,
  clearAllFilters,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {selectedDepartments.map((depId) => {
        const department = departments?.find((dep) => dep.id === Number(depId));
        return (
          <div
            key={depId}
            className="w-fit flex items-center h-[29px] rounded-[43px] pt-[6px] pr-[10px] pb-[6px] pl-[10px] border border-[#CED4DA] text-[#021526CC] font-normal text-[14px] leading-[100%] tracking-[0%] text-center"
          >
            {department?.name}
            <button
              onClick={() =>
                setSelectedDepartments((prev) =>
                  prev.filter((id) => id !== depId)
                )
              }
              className="flex items-center ml-2 cursor-pointer"
            >
              <img
                src="/assets/images/x-icon.png"
                alt="x-icon"
                className="mx-auto"
              />
            </button>
          </div>
        );
      })}
      {selectedPriorities.map((priId) => {
        const priority = priorities?.find((pri) => pri.id === Number(priId));
        return (
          <div
            key={priId}
            className="w-fit flex items-center h-[29px] rounded-[43px] pt-[6px] pr-[10px] pb-[6px] pl-[10px] border border-[#CED4DA] text-[#021526CC] font-normal text-[14px] leading-[100%] tracking-[0%] text-center"
          >
            {priority?.name}
            <button
              onClick={() =>
                setSelectedPriorities((prev) =>
                  prev.filter((id) => id !== priId)
                )
              }
              className="flex items-center ml-2 cursor-pointer"
            >
              <img
                src="/assets/images/x-icon.png"
                alt="x-icon"
                className="mx-auto"
              />
            </button>
          </div>
        );
      })}
      {selectedEmployees.map((empId) => {
        const employee = employees?.find((emp) => emp.id === Number(empId));
        return (
          <div
            key={empId}
            className="w-fit flex items-center h-[29px] rounded-[43px] pt-[6px] pr-[10px] pb-[6px] pl-[10px] border border-[#CED4DA] text-[#021526CC] font-normal text-[14px] leading-[100%] tracking-[0%] text-center"
          >
            {employee?.name} {employee?.surname}
            <button
              onClick={() =>
                setSelectedEmployees((prev) =>
                  prev.filter((id) => id !== empId)
                )
              }
              className="flex items-center ml-2 cursor-pointer"
            >
              <img
                src="/assets/images/x-icon.png"
                alt="x-icon"
                className="mx-auto"
              />
            </button>
          </div>
        );
      })}
      {selectedDepartments.length > 0 ||
      selectedPriorities.length > 0 ||
      selectedEmployees.length > 0 ? (
        <button
          onClick={clearAllFilters}
          className="font-normal text-sm leading-none tracking-tight text-[#343A40] cursor-pointer"
        >
          გასუფთავება
        </button>
      ) : null}
    </div>
  );
};

export default SelectedFilters;
