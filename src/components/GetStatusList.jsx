import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";

const fetchStatuses = async () => {
  const { data } = await publicAxios.get("/statuses");
  return data;
};

const GetStatusList = () => {
  const {
    data: statuses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching statuses</p>;

  return (
    <ul className=" bg-pink-500 ">
      {statuses.map((status) => (
        <li key={status.id} className="flex gap-1">
          <p>{status.id}</p>
          <p>{status.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default GetStatusList;
