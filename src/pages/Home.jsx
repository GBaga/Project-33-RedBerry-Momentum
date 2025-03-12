import GetAllDepartments from "../components/GetAllDepartments";
import GetAllPriorities from "../components/GetAllPriorities";
import GetEmployeeList from "../components/GetEmployeeList";
import GetStatusList from "../components/GetStatusList";
import RegistrationForm from "../components/RegistrationForm";

function Home() {
  return (
    <>
      <GetStatusList />
      <GetAllPriorities />
      <GetAllDepartments />
      <GetEmployeeList />
      <RegistrationForm />
    </>
  );
}

export default Home;
