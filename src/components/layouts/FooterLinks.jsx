import { Link } from "react-router";
import React from "react";

const FooterLinks = () => (
  <p className="text-sm text-gray-500 dark:text-gray-300 sm:text-center md:order-first">
    © 2025 GBaga for
    <Link to="https://redberry.international/bootcamp/" target="_blank">
      <span className="text-red-400"> Redberry</span>
    </Link>
    <Link
      to="https://redberry.gitbook.io/bootcamp-9-assignment-momentum"
      target="_blank"
    >
      <span> Bootcamp #9 </span>
    </Link>
    ყველა უფლება დაცულია.
  </p>
);

export default FooterLinks;
