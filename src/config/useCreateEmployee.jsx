import { useState } from "react";
import axios from "axios";

const useCreateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = import.meta.env.VITE_API_TOKEN;

  const createEmployee = async (name, surname, avatar, departmentId) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("avatar", avatar);
    formData.append("department_id", departmentId);

    try {
      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Employee created successfully!");
      setIsLoading(false);
      return response.data; // Return employee data if needed
    } catch (error) {
      setMessage("Error creating employee.");
      setIsLoading(false);
      throw error; // You can handle the error in the component if needed
    }
  };

  return { isLoading, message, createEmployee };
};

export default useCreateEmployee;
