import "./filters.css";
import { useState, useEffect, useRef } from "react";

const Filters = ({
  departments,
  priorities,
  employees,
  selectedDepartments,
  setSelectedDepartments,
  selectedPriorities,
  setSelectedPriorities,
  selectedEmployees,
  setSelectedEmployees,
}) => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

  const departmentRef = useRef(null);
  const priorityRef = useRef(null);
  const employeeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setIsPriorityOpen(false);
      }
      if (employeeRef.current && !employeeRef.current.contains(event.target)) {
        setIsEmployeeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartments((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    setSelectedPriorities((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployees([e.target.value]);
  };

  const truncate = (str, maxLength) => {
    if (!str) return "";
    if (str.length <= maxLength) return str;
    const ellipsis = "...";
    const truncatedLength = maxLength - ellipsis.length;
    return str.substring(0, truncatedLength) + ellipsis;
  };

  return (
    <div className="flex flex-wrap max-w-[688px] w-full min-h-[44px] rounded-[10px] justify-between border-[#DEE2E6] border-[1px] mb-6">
      {/* Department Filter Dropdown */}
      <div className="relative" ref={departmentRef}>
        <button
          onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
          className={`max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer ${
            isDepartmentOpen ? "text-[#8338EC]" : ""
          }`}
        >
          {selectedDepartments.length > 0
            ? `${selectedDepartments.length} მონიშნული`
            : "დეპარტამენტი"}
          <img
            src="/assets/images/arrow-down-icon.png"
            alt="arrow-down-icon"
            className={`h-2 ml-3 ${isDepartmentOpen ? "filter-active" : ""}`}
          />
        </button>
        {isDepartmentOpen && (
          <div className="absolute bg-white w-[400px] border p-2 rounded mt-1 min-h-fit overflow-auto z-10">
            {departments?.map((dep) => (
              <label
                key={dep.id}
                className="block cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  value={dep.id}
                  checked={selectedDepartments.includes(String(dep.id))}
                  onChange={handleDepartmentChange}
                  className="mr-2"
                />
                {dep.name}
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Priority Filter Dropdown */}
      <div className="relative" ref={priorityRef}>
        <button
          onClick={() => setIsPriorityOpen(!isPriorityOpen)}
          className={`max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer ${
            isPriorityOpen ? "text-[#8338EC]" : ""
          }`}
        >
          {selectedPriorities.length > 0
            ? `${selectedPriorities.length} მონიშნული`
            : "პრიორიტეტი"}
          <img
            src="/assets/images/arrow-down-icon.png"
            alt="arrow-down-icon"
            className={`h-2 ml-3 ${isPriorityOpen ? "filter-active" : ""}`}
          />
        </button>
        {isPriorityOpen && (
          <div className="absolute bg-white border p-2 rounded w-full mt-1 max-h-60 overflow-auto z-10 cursor-pointer">
            {priorities?.map((priority) => (
              <label
                key={priority.id}
                className="block cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  value={priority.id}
                  checked={selectedPriorities.includes(String(priority.id))}
                  onChange={handlePriorityChange}
                  className="mr-2"
                />
                {priority.name}
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Employee Filter Dropdown */}
      <div className="relative" ref={employeeRef}>
        <button
          onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
          className={`max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer ${
            isEmployeeOpen ? "text-[#8338EC]" : ""
          }`}
        >
          {selectedEmployees.length > 0
            ? `${truncate(
                employees.find((emp) => emp.id === Number(selectedEmployees[0]))
                  ?.name +
                  " " +
                  employees.find(
                    (emp) => emp.id === Number(selectedEmployees[0])
                  )?.surname,
                12
              )}`
            : "თანამშრომელი"}
          <img
            src="/assets/images/arrow-down-icon.png"
            alt="arrow-down-icon"
            className={`h-2 ml-3 ${isEmployeeOpen ? "filter-active" : ""}`}
          />
        </button>
        {isEmployeeOpen && (
          <div className="absolute bg-white w-[300px] border p-2 rounded mt-1 max-h-60 overflow-auto z-10 cursor-pointer">
            {employees?.map((emp) => (
              <label
                key={emp.id}
                className="block cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name="employee"
                  value={emp.id}
                  checked={selectedEmployees.includes(String(emp.id))}
                  onChange={handleEmployeeChange}
                  className="mr-2"
                />
                {emp.name} {emp.surname}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
