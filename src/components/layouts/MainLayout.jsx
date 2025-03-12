import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex  flex-col  justify-between">
      <header>
        <Navbar />
      </header>

      <div className="outlets-css p-0 sm:p-10 mx-auto max-w-7xl w-full ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
