import { publicAxios } from "./axios.jsx";

export const fetchDepartments = async () => {
  const { data } = await publicAxios.get("/departments");
  return data;
};

export const fetchPriorities = async () => {
  const { data } = await publicAxios.get("/priorities");
  return data;
};

export const fetchEmployees = async () => {
  const { data } = await publicAxios.get("/employees");
  return data;
};

export const fetchTaskDetails = async (taskId) => {
  const response = await publicAxios.get(`/tasks/${taskId}`);
  return response.data;
};

export const fetchStatuses = async () => {
  const response = await publicAxios.get("/statuses");
  return response.data;
};

export const fetchComments = async (taskId) => {
  const response = await publicAxios.get(`/tasks/${taskId}/comments`);
  return response.data;
};

export const postComment = async ({ taskId, text, parentId = null }) => {
  const token = import.meta.env.VITE_API_TOKEN;

  const response = await publicAxios.post(
    `/tasks/${taskId}/comments`,
    { text, parent_id: parentId },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.trim()}`,
      },
    }
  );
  return response.data;
};

export const updateStatus = async (taskId, statusId) => {
  const response = await publicAxios.put(`/tasks/${taskId}`, {
    status_id: statusId,
  });
  return response.data;
};

export const fetchTasks = async () => {
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
