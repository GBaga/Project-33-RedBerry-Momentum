import { useQuery } from "@tanstack/react-query";
import {
  fetchTasks,
  fetchDepartments,
  fetchPriorities,
  fetchEmployees,
} from "../config/api";
import Filters from "./filters/Filters";
import TaskColumns from "./TaskColumns";
import SelectedFilters from "./SelectedFilters";
import Loader from "./Loader";
import { useState } from "react";

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-14 p-4">
        დავალებების გვერდი
      </h1>
      <div className="p-4">
        <Filters
          departments={departments}
          priorities={priorities}
          employees={employees}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
        />
        <SelectedFilters
          departments={departments}
          priorities={priorities}
          employees={employees}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          clearAllFilters={clearAllFilters}
        />
        <TaskColumns statuses={statuses} filteredTasks={filteredTasks} />
      </div>
    </>
  );
};

export default GetAllTasks;
