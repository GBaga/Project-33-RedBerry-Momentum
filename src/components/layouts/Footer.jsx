import RegistrationForm from "../RegistrationForm";
import SocialNetworks from "./SocialNetworks";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4"></div>
        <div className="h-40 px-4 py-6 border-t border-t-gray-700 flex items-center justify-center md:justify-between gap-5 sm:gap-5">
          <div className="w-full flex flex-col  items-center gap-8 sm:gap-7 md:flex-row md:justify-between">
            <SocialNetworks />

            <Link
              to="https://gbaga.github.io/Project-20-My-Portfolio-Design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-300 sm:text-center md:order-first"
            >
              © 2025 GBaga. ყველა უფლება დაცულია
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
