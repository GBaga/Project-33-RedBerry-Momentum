import GetAllDepartments from "../components/GetAllDepartments";
import GetAllPriorities from "../components/GetAllPriorities";
import GetStatusList from "../components/GetStatusList";

function Home() {
  return (
    <>
      <GetStatusList />
      <GetAllPriorities />
      <GetAllDepartments />
    </>
  );
}

export default Home;
