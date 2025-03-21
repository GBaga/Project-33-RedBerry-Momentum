import FooterLinks from "./FooterLinks";
import SocialNetworks from "./SocialNetworks";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="sm:px-[40px] md:px-[70px] lg:px-[100px] xl:px-[120px]">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4"></div>
        <div className="h-40 px-4 py-6 border-t border-t-gray-700 flex items-center justify-center md:justify-between gap-5 sm:gap-5">
          <div className="w-full flex flex-col  items-center gap-8 sm:gap-7 md:flex-row md:justify-between">
            <SocialNetworks />
            <FooterLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
