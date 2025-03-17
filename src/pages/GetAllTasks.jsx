import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import { useState, useEffect, useRef } from "react";

const fetchTasks = async () => {
  try {
    const response = await publicAxios.get("/tasks");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const fetchDepartments = async () => {
  const { data } = await publicAxios.get("/departments");
  return data;
};

const fetchPriorities = async () => {
  const { data } = await publicAxios.get("/priorities");
  return data;
};

const fetchEmployees = async () => {
  const { data } = await publicAxios.get("/employees");
  return data;
};

const GetAllTasks = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 60000,
    retry: 2,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });
  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

  // Refs for dropdown menus
  const departmentRef = useRef(null);
  const priorityRef = useRef(null);
  const employeeRef = useRef(null);

  // Close dropdown when clicked outside
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
    const value = e.target.value;
    setSelectedEmployees((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployees([]);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  const filteredTasks = tasks?.filter(
    (task) =>
      (selectedDepartments.length === 0 ||
        selectedDepartments.includes(String(task.department?.id))) &&
      (selectedPriorities.length === 0 ||
        selectedPriorities.includes(String(task.priority?.id))) &&
      (selectedEmployees.length === 0 ||
        selectedEmployees.includes(String(task.employee?.id)))
  );

  const statuses = [
    { id: 1, color: "#F7BC30", label: "დასაწყები" },
    { id: 2, color: "#FB5607", label: "პროცესშია" },
    { id: 3, color: "#FF006E", label: "მზად დასატესტად" },
    { id: 4, color: "#3A86FF", label: "დასრულებული" },
  ];

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-14">
        დავალებების გვერდი
      </h1>
      <div className="p-4 ">
        {/* Filters */}
        <div className="flex flex-wrap max-w-[688px] w-full min-h-[44px] rounded-[10px] justify-between border border-[#DEE2E6] border-[1px] mb-6">
          {/* Department Filter Dropdown */}
          <div className="relative " ref={departmentRef}>
            <button
              onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
              className="max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer"
            >
              {selectedDepartments.length > 0
                ? `${selectedDepartments.length} მონიშნული`
                : "დეპარტამენტი"}

              <img
                src="../../public/assets/images/arrow-down-icon.png"
                alt="arrow-down-icon"
                className="h-2 ml-3"
              />
            </button>
            {isDepartmentOpen && (
              <div className="absolute bg-white w-[400px] border p-2 rounded  mt-1 min-h-fit overflow-auto z-10 ">
                {departments?.map((dep) => (
                  <label key={dep.id} className="block cursor-pointer">
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
              className="max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer"
            >
              {selectedPriorities.length > 0
                ? `${selectedPriorities.length} მონიშნული`
                : "პრიორიტეტი"}
              <img
                src="../../public/assets/images/arrow-down-icon.png"
                alt="arrow-down-icon"
                className="h-2 ml-3"
              />
            </button>
            {isPriorityOpen && (
              <div className="absolute bg-white  border p-2 rounded w-full mt-1 max-h-60 overflow-auto z-10">
                {priorities?.map((priority) => (
                  <label key={priority.id} className="block">
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
              className="max-w-50 w-full flex items-center py-3 px-5 rounded cursor-pointer"
            >
              {selectedEmployees.length > 0
                ? `${selectedEmployees.length} მონიშნული`
                : "თანამშრომელი"}
              <img
                src="../../public/assets/images/arrow-down-icon.png"
                alt="arrow-down-icon"
                className="h-2 ml-3"
              />
            </button>
            {isEmployeeOpen && (
              <div className="absolute bg-white w-[300px]  border p-2 rounded  mt-1 max-h-60 overflow-auto z-10">
                {employees?.map((emp) => (
                  <label key={emp.id} className="block">
                    <input
                      type="checkbox"
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
        {/* Display Selected Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {selectedDepartments.map((depId) => {
            const department = departments?.find(
              (dep) => dep.id === Number(depId)
            );
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
                    src="../../public/assets/images/x-icon.png"
                    alt="x-icon"
                    className="mx-auto"
                  />
                </button>
              </div>
            );
          })}
          {selectedPriorities.map((priId) => {
            const priority = priorities?.find(
              (pri) => pri.id === Number(priId)
            );
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
                    src="../../public/assets/images/x-icon.png"
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
                    src="../../public/assets/images/x-icon.png"
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
              className=" font-normal text-sm leading-none tracking-tight text-[#343A40] cursor-pointer"
            >
              გასუფთავება
            </button>
          ) : null}
        </div>
        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {statuses.map(({ id, color, label }) => (
            <div key={id} className="p-2 flex flex-col gap-7 items-center">
              <h2
                className="text-white font-medium text-lg max-w-sm w-full h-[54px] flex justify-center items-center rounded-[10px]"
                style={{ backgroundColor: color }}
              >
                {label}
              </h2>
              {filteredTasks
                ?.filter((task) => task.status?.id === id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    statusId={task.status?.id}
                    name={task.name}
                    description={task.description}
                    dueDate={task.due_date}
                    department={task.department?.name}
                    departmentId={task.department?.id}
                    employeeName={task.employee?.name}
                    employeeAvatar={task.employee?.avatar}
                    priority={task.priority?.name}
                    priorityId={task.priority?.id}
                    priorityIcon={task.priority?.icon}
                    totalComments={task.total_comments}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetAllTasks;
