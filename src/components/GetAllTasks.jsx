import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import TaskCard from "./TaskCard";
import Loader from "./Loader";
import { useState } from "react";

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

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  const filteredTasks = tasks?.filter(
    (task) =>
      (!departmentFilter || task.department?.id === Number(departmentFilter)) &&
      (!priorityFilter || task.priority?.id === Number(priorityFilter)) &&
      (!employeeFilter || task.employee?.id === Number(employeeFilter))
  );

  const statuses = [
    { id: 1, color: "#F7BC30", label: "დასაწყები" },
    { id: 2, color: "#FB5607", label: "პროცესშია" },
    { id: 3, color: "#FF006E", label: "მზად დასატესტად" },
    { id: 4, color: "#3A86FF", label: "დასრულებული" },
  ];

  return (
    <>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-14">
        დავალებების გვერდი
      </h1>
      <div className="p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-20">
          <select
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">დეპარტამენტი</option>
            {departments?.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">პრიორიტეტი</option>
            {priorities?.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">თანამშრომელი</option>
            {employees?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {statuses.map(({ id, color, label }) => (
            <div key={id} className="p-2  flex flex-col gap-7 items-center">
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
