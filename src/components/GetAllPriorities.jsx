import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../config/axios";
import Loader from "./Loader";

const fetchPriorities = async () => {
  const { data } = await publicAxios.get("/priorities");
  return data;
};

const GetAllPriorities = () => {
  const {
    data: priorities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching statuses</p>;

  return (
    <ul className="bg-amber-300">
      {priorities.map((priorities) => (
        <li key={priorities.id} className="flex gap-x-2">
          <p> {priorities.id}</p>
          <p>{priorities.name}</p>
          <img src={priorities.icon} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default GetAllPriorities;
