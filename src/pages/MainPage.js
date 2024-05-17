import React from "react";
import Navbar from "../components/Navbar";
import Kakao_main from "../kakaoMap/Kakao_main";
import { Navigate } from "react-router-dom";

function MainPage({ isAuth }) {
  return isAuth ? (
    <div className="bg-ye-100" style={{ height: "calc(100vh - 65px)" }}>
      <Kakao_main />
      <Navbar />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default MainPage;
