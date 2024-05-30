import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
import CreateCCPage from "./pages/CreateCCPage";
import CCViewPage from "./pages/CCViewPage";
import UserInfoPage from "./pages/UserInfoPage";
import UserModifyPage from "./pages/UserModifyPage";
import MyPetListPage from "./pages/MyPetListPage";
import MyPetModifyPage from "./pages/MyPetModifyPage";
import AddMyPetPage from "./pages/AddMyPetPage";
import { useDispatch, useSelector } from "react-redux";
import ProtectRouter from "./components/ProtectRouter";
import { authUser } from "./store/thunkFunctions";
import ErrPathPage from "./pages/ErrPathPage";

function App() {
  // 원래있던부분
  const isAuth = useSelector((state) => {
    return state.user.isAuth;
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation(); //page의 path 알려준다.
  const navigate = useNavigate();
  console.log(pathname);
  useEffect(() => {
    if (isAuth) {
      const result = dispatch(authUser()); //dispatch는 신호를 보낸다.
      if (authUser.rejected.match(result)) {
        navigate("/login");
      }
    }
  }, [isAuth, dispatch, pathname]); // 세개의 값중 하나가 변화하면 실행
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

              <Route element={<Layout isAuth={isAuth} />}>
                <Route
                    path="/appealwrite/:userId"
                    element={<AppealWritePage />}
                />
                <Route path="/circles" element={<AllCCListPage />} />
                <Route path="/newcircle" element={<CreateCCPage />} />
                <Route path="/circles/:circleId" element={<CCViewPage />} />
                <Route path="/circles/:circleId/mod" element={<CreateCCPage />} />
                <Route path="/userinfo/:userId" element={<UserInfoPage />} />
                <Route path="/userinfo" element={<UserInfoPage />} />
                <Route path="/usermod/:userId" element={<UserModifyPage />} />
                <Route path="/mypet/:userId" element={<MyPetListPage />} />
              </Route>

              {/* header 없는 layout */}
            <Route element={<ProtectRouter isAuth={isAuth} />}>
              <Route index element={<MainPage />} />
              <Route path="/appeal/:userId" element={<AppealPage />} />
              <Route path="/mypet/mod/:petId" element={<MyPetModifyPage />} />
              <Route path="/mypet/add" element={<AddMyPetPage />} />
            </Route>
            <Route path="/*" element={<ErrPathPage />} />
          </Routes>
        </div>
        </div>
      </>
  );
}

export default App;

