import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";

const fetchStatuses = async () => {
  const { data } = await publicAxios.get("/statuses");
  return data;
};

const StatusList = () => {
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
    <ul>
      {statuses.map((status) => (
        <li key={status.id}>{status.name}</li>
      ))}
    </ul>
  );
};

export default StatusList;
