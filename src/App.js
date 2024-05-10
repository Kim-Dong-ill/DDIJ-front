import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/tStyle.css";
import "./assets/index.scss";

import IntroPage from "./pages/IntroPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layout/Layout";
import AppealPage from "./pages/AppealPage";
import AppealWritePage from "./pages/AppealWritePage";
import AllCCListPage from "./pages/AllCCListPage";
import AttendCCListPage from "./pages/AttendCCListPage";
import CreateCCPage from "./pages/CreateCCPage";
import CCViewPage from "./pages/CCViewPage";
import UserInfoPage from "./pages/UserInfoPage";
import UserModifyPage from "./pages/UserModifyPage";
import MyPetListPage from "./pages/MyPetListPage";
import MyPetModifyPage from "./pages/MyPetModifyPage";
import AddMyPetPage from "./pages/AddMyPetPage";

function App() {
  const pageTitle = [
    { title: "함께걷개" },
    { title: "어디가개" },
    { title: "자랑하개" },
    { title: "마이펫이지" },
  ];

  const [number, setNumber] = useState(0);
  return (
    <>
      {/* 인트로 페이지 */}
      <Routes>
        <Route path="/intro" element={<IntroPage />} />
      </Routes>

      <div className="bg-ye-100 w-[100%]">
        {/* 로그인 안되어있으면 hidden */}
        <div className="bg-ye-300 w-[500px] m-auto ">
          {/* auth user */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* header 있는 layout */}
            <Route element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/appealwrite/:petid" element={<AppealWritePage />} />
              <Route path="/circles" element={<AllCCListPage />} />
              <Route path="/circles/attended" element={<AttendCCListPage />} />
              <Route path="/newcircle" element={<CreateCCPage />} />
              <Route path="/circles/:circleid" element={<CCViewPage />} />
              <Route path="/circles/:circleid/mod" element={<CreateCCPage/>} />
              <Route path="/userinfo/:userid" element={<UserInfoPage />} />
              <Route path="/usermod/:userid" element={<UserModifyPage />} />
              <Route path="/mypet/:userid" element={<MyPetListPage />} />
            </Route>
            {/* header 없는 layout */}
            <Route path="/appeal/:petid" element={<AppealPage />} />
            <Route path="/mypet/mod/:petid" element={<MyPetModifyPage />} />
            <Route path="/mypet/add" element={<AddMyPetPage />} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
