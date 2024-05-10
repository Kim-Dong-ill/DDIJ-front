import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/global.css";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const menu = [
    { title: "산책하기", route: "" },
    { title: "모임만들기", route: "createcc" },
    { title: "모임리스트", route: "allcclist" },
    { title: "마이펫이지", route: "userinfo" },
  ];

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="bottom-0 bg-ye-400 fixed h-[65px] w-[500px] flex">
        <ul className="flex justify-around items-center border w-full">
          {" "}
          {/* relative 클래스 추가 */}
          {menu.map((item, idx) => {
            return (
              <Link to={`/${item.route}`} onClick={() => handleMenuClick(idx)}>
                <li key={idx} className="text-center text-white navbar ">
                  <img
                    src={`/images/menulogo${idx + 1}.svg`}
                    alt=""
                    className="m-auto"
                  />
                  {item.title}
                </li>
              </Link>
            );
          })}
          {/* 선택한 메뉴에 따라 흰색 실선을 표시하는 요소 */}
          {activeIndex !== -1 && (
            <div
              className="absolute bg-white h-1 bottom-0"
              style={{
                left: `${activeIndex * (100 / menu.length)}%`,
                width: `${100 / menu.length}%`,
              }} // 선택한 메뉴에 따라 위치와 너비를 동적으로 설정
            />
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
