import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/thunkFunctions";

function Header() {
  let title = " ";
  const locationHook = useLocation();
  const [currentFirstUrl, setCurrentFirstUrl] = useState(null);
  const splitUrl = locationHook?.pathname?.split("/") ?? null;
  const navigate = useNavigate();

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
  const disPatch = useDispatch();
  async function handleLogout() {
    const result = await disPatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate("/intro");
    }
  }
  return (
    <>
      <div className="flex items-end justify-between h-[90px] px-[10px] bg-ye-400 fixed w-[500px] z-50">
        <button
          onClick={handleLogout}
          className="text-[13px] absolute right-[10px] top-[10px] text-white z-10"
        >
          로그아웃
        </button>
        <div className="flex items-center ">
          <img
            src="/images/backicon_white.svg"
            alt=""
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer"
          />

          <h1 className="text-white navbar">{title}</h1>
        </div>

        <Link to="/">
          <img src="/images/DDIJlogo.svg" alt="" />
        </Link>
      </div>
    </>
  );
}

export default Header;
