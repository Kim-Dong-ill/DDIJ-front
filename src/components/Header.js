import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  let title = " ";
  const locationHook = useLocation();
  const [currentFirstUrl, setCurrentFirstUrl] = useState(null);
  const splitUrl = locationHook?.pathname?.split("/") ?? null;

  useEffect(() => {
    const location = splitUrl?.length > 0 ? splitUrl[1] : splitUrl[0];
    setCurrentFirstUrl(location);
  }, [locationHook]);
  console.log("현재경로는" + currentFirstUrl);
  switch (currentFirstUrl) {
    case "appealwrite":
      title = "자랑하개";
      break;
    case "newcircle":
      title = "어디가개";
      break;
    case "circles":
      title = "함께걷개";
      break;
    case "userinfo":
      title = "마이펫이지";
      break;
    case "usermod":
      title = "마이펫이지";
      break;
    case "mypet":
      title = "마이펫이지";
      break;
    default:
      title = "";
  }
  return (
    <>
      <div className="bg-ye-400 flex items-end justify-between h-[90px] px-[10px]">
        <h1 className="text-white navbar">{title}</h1>

        <Link to="/">
          <img src="/images/DDIJlogo.svg" alt="" />
        </Link>
      </div>
    </>
  );
}

export default Header;
