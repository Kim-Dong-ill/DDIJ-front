import React from "react";
import Navbar from "../components/Navbar";
import Kakao_main from "../kakaoMap/Kakao_main";

function MainPage() {
  return (
    <div className="bg-ye-100" style={{ height: "calc(100vh - 65px)" }}>
      <Kakao_main />
      <Navbar />
    </div>
  );
}

export default MainPage;
