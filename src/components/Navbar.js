import React from "react";
import { Link } from "react-router-dom";
import "../assets/global.css";

function Navbar() {
  const menu = [
    { title: "산책하기", route: "" },
    { title: "모임만들기", route: "createcc" },
    { title: "모임리스트", route: "allcclist" },
    { title: "마이펫이지", route: "userinfo" },
  ];
  return (
    <>
      <div className="bottom-0 bg-ye-400 fixed h-[65px] w-[500px] flex  ">
        <ul className=" flex justify-around items-center border w-full">
          {menu.map((item, idx) => {
            return (
              <Link to={`/${item.route}`}>
                <li key={idx} className="text-center text-white navbar">
                  <img
                    src={`./images/menulogo${idx + 1}.svg`}
                    alt=""
                    className="m-auto"
                  />
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
