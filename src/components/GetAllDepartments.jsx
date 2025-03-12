import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";

const fetchDepartments = async () => {
  const { data } = await publicAxios.get("/departments");
  return data;
};

const GetAllDepartments = () => {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching statuses</p>;

  return (
    <ul className="bg-cyan-500">
      {departments.map((departments) => (
        <li key={departments.id} className="flex gap-x-2">
          <p> {departments.id}</p>
          <p>{departments.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default GetAllDepartments;
