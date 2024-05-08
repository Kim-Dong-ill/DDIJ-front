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
      <Routes>
        <Route index element={<IntroPage />} />
      </Routes>

      <div className="bg-ye-100 w-[100%] h-[100vh]">
        <div className="bg-ye-400 w-[500px] m-auto h-[100vh]">
          {/* auth user */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>

          {/* header 있는 layout */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/appealwrite" element={<AppealWritePage />} />
              <Route path="/allcclist" element={<AllCCListPage />} />
              <Route path="/attendcclist" element={<AttendCCListPage />} />
              <Route path="/createcc" element={<CreateCCPage />} />
              <Route path="/ccview" element={<CCViewPage />} />
              <Route path="/userinfo" element={<UserInfoPage />} />
              <Route path="/usermodify" element={<UserModifyPage />} />
              <Route path="/mypetlist" element={<MyPetListPage />} />
            </Route>
          </Routes>

          {/* header 없는 layout */}
          <Routes>
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
