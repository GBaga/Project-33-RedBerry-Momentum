import { useState } from "react";
import { Link } from "react-router";
import BtnCreateNew from "../button/BtnCreateNew";
import ModalWindow from "../ModalWindow";
import ModalForm from "../ModalForm";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4  h-32">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 w-[210px] h-[38px]">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
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

        {/* Burger Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-expanded={menuOpen}
        >
          <span className="sr-only text-white">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col justify-center items-center transition-all duration-300 ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } md:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
        >
          ✖
        </button>

        <div className="w-full px-4 text-center ">
          <Link
            to="/"
            className="flex items-center space-x-3  mb-8"
            onClick={() => setMenuOpen(false)}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Momentum
            </span>
            <img
              src="/assets/images/hourglass-img.png"
              className="h-full"
              alt="Site Logo"
            />
          </Link>

          <div className="flex flex-col space-y-4 sm:justify-center">
            {/* <Link
              to="/history"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              თანამშრომლის შექმნა
            </Link> */}

            <ModalForm />
            <Link
              onClick={() => setMenuOpen(false)}
              to="/detailed-history"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              + შექმენი ახალი დავალება
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              to="/"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              მთავარი
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
