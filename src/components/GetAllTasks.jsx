import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import TaskCard from "./TaskCard";
import Loader from "./Loader";

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

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          name={task.name}
          description={task.description}
          dueDate={new Date(task.due_date)}
          department={task.department?.name}
          departmentId={task.department?.id}
          employeeAvatar={task.employee?.avatar}
          status={task.status?.name}
          priority={task.priority?.name}
          priorityIcon={task.priority?.icon}
          priorityId={task.priority?.id}
          totalComments={task.total_comments}
        />
      ))}
    </div>
  );
};

export default GetAllTasks;
