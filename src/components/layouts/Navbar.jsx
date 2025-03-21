import { useState } from "react";
import { Link } from "react-router";
import BtnCreateNew from "../button/BtnCreateNew";
import ModalForm from "../modalForm/ModalForm";
import BurgerMenuButton from "./BurgerMenuButton";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-gray-700 sm:px-[40px] md:px-[70px] lg:px-[100px] xl:px-[120px]">
      <div className="max-w-[1920px] flex flex-wrap items-center justify-between mx-auto px-4  h-32">
        <Link to="/" className="flex items-center space-x-3 w-[210px] h-[38px]">
          <span className="main-logo-font self-center text-2xl font-semibold whitespace-nowrap">
            Momentum
          </span>
          <img
            src="/assets/images/hourglass-img.png"
            className="h-full"
            alt="Site Logo"
          />
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-700 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <ModalForm styles={{ width: "100%" }} />
            </li>
            <li>
              <Link to="/new-task">
                <BtnCreateNew title="+ შექმენი ახალი დავალება" />
              </Link>
            </li>
          </ul>
        </div>
        <BurgerMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </nav>
  );
}

export default Navbar;
