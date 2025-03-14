import GetAllDepartments from "../components/GetAllDepartments";
import GetAllPriorities from "../components/GetAllPriorities";
import GetAllTasks from "../components/GetAllTasks";
import GetEmployeeList from "../components/GetEmployeeList";
import GetStatusList from "../components/GetStatusList";
import ModalWindow from "../components/ModalWindow";
import TaskCard from "../components/TaskCard";

function Home() {
  return (
    <>
      <GetAllTasks />
    </>
  );
}

export default Home;
