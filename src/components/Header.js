import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex items-end justify-between h-[90px] px-[10px]">
        <h1 className="text-white navbar">{}</h1>
        <Link to="/">
          <img src="/images/DDIJlogo.svg" alt="" />
        </Link>
      </div>
    </>
  );
}

export default Header;
