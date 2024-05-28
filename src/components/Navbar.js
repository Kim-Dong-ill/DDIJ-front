import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/global.css";
import { useSelector } from "react-redux";
function Navbar() {
  // const loginState = useSelector((state) => {
  //   return state.user.userData.user.id;
  // });
  const [activeIndex, setActiveIndex] = useState(-1);
  const menu = [
    { title: "산책하기", route: "" },
    { title: "모임만들기", route: "newcircle" },
    { title: "모임리스트", route: "circles" },
    { title: "마이펫이지", route: `userinfo` },
  //     /${loginState}
  ];

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  //실선문제 해결을 위해 랜더링
  useEffect(() => {
    // 상태가 변경된 후 실행할 동작을 여기에 작성할 수 있습니다.
  }, [activeIndex]);

  return (
    <>
      <div className="z-50 bottom-0 bg-ye-400 fixed h-[65px] w-[500px] flex">
        <ul className="flex justify-around items-center border w-full ">
          {" "}
          {/* relative 클래스 추가 */}
          {menu.map((item, idx) => {
            return (
              <Link
                to={`/${item.route}`}
                onClick={() => handleMenuClick(idx)}
                key={idx}
              >
                <li className="text-center text-white navbar ">
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
