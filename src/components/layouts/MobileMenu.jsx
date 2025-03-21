import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BtnCreateNew from "../button/BtnCreateNew";
import ModalForm from "../modalForm/ModalForm";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col justify-center items-center transition-all duration-300 z-50">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
          >
            ✖
          </button>
          <div className="w-full px-4 text-center">
            <Link
              to="/"
              className="flex items-center space-x-3 mb-8"
              onClick={() => setMenuOpen(false)}
            >
              <span className="main-logo-font self-center text-2xl font-semibold whitespace-nowrap text-white">
                Momentum
              </span>
              <img
                src="/assets/images/hourglass-img.png"
                className="h-full"
                alt="Site Logo"
              />
            </Link>
            <div className="flex flex-col space-y-4 sm:justify-center">
              <ModalForm />
              <Link
                to="/new-task"
                onClick={() => setMenuOpen(false)}
                className="max-w-full"
              >
                <BtnCreateNew title="+ შექმენი ახალი დავალება" />
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
      )}
    </>
  );
};

export default MobileMenu;
