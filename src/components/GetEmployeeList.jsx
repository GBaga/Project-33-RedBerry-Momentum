import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";

// Fetch function to get the employees data
const fetchEmployees = async () => {
  const { data } = await publicAxios.get("/employees");
  return data;
};

const GetEmployeeList = () => {
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching employees</p>;

  return (
    <ul className="bg-pink-500">
      {employees.map((employee) => (
        <li key={employee.id} className="flex gap-1">
          <img
            src={employee.avatar}
            alt={`${employee.name} ${employee.surname}`}
            className="w-10 h-10 rounded-full"
          />
          <p>
            {employee.name} {employee.surname}
          </p>
          <p>{employee.department.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default GetEmployeeList;
