import "./assets/tStyle.css";
import "./assets/index.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
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
  return (
    <>
      {/* 인트로 페이지  */}
      <div className="bg-ye-100 w-[100%] h-[100vh]">
        <div className="bg-ye-400 w-[500px] m-auto h-[100vh]">
          <Routes>
            <Route index element={<IntroPage />} />

            {/* auth user */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* header 있는 layout */}
            <Route path="/main" element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/main/appealwrite" element={<AppealWritePage />} />
              <Route path="/main/allcclist" element={<AllCCListPage />} />
              <Route path="/main/attendcclist" element={<AttendCCListPage />} />
              <Route path="/main/createcc" element={<CreateCCPage />} />
              <Route path="/main/ccview" element={<CCViewPage />} />
              <Route path="/main/userinfo" element={<UserInfoPage />} />
              <Route path="/main/usermodify" element={<UserModifyPage />} />
              <Route path="/main/mypetlist" element={<MyPetListPage />} />
            </Route>

            {/* header 없는 layout */}

            <Route path="/appeal" element={<AppealPage />} />
            <Route path="/mypetmodify" element={<MyPetModifyPage />} />
            <Route path="/addmypet" element={<AddMyPetPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
