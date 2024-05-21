import React from "react";
import Navbar from "../components/Navbar";
import Kakao_main from "../kakaoMap/Kakao_main";
// 여기서 현재좌표를 받아오고 이를가지고 get요청을 보내서 주변마커[] 와 주변유저[] 를 생성해서 kakao_main에 전달한다. kak

function MainPage() {
  return (
    <div className="bg-ye-100" style={{ height: "calc(100vh - 65px)" }}>
      <Kakao_main />
      <Navbar />
    </div>
  );
}

export default MainPage;
