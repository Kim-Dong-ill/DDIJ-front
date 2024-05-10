import React from "react";
import TextFieldLine from "../components/TextField";
import ButtonYe from "../components/ButtonYe";
import { NavLink } from "react-router-dom";

function LoginPage() {
  return (
    <div className="bg-white h-[100vh] flex flex-col items-center border-x">
      <div className="mb-10">
        <img src="./images/intro_logo_wh.svg" alt="" />
      </div>
      <div className=" w-[80%] mb-10">
        <form className="flex flex-col items-center">
          <div className="w-[100%] flex flex-col gap-7 mb-10">
            <TextFieldLine fullWidth label="E-mail" />
            <TextFieldLine
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          {/* 로그인 오류시 나올 에러메세지 */}
          <div className="text-er-100 nanumBold text-sm">
            입력하신 정보를 다시 확인해주세요.
          </div>
          <div className="mt-10">
            <ButtonYe>
              <div className="w-[200px] text-[18px]">로그인</div>
            </ButtonYe>
          </div>
        </form>
      </div>
      <div className="flex gap-5">
        <span>Don't have an account?</span>
        <span className="text-ye-600">
          <NavLink to="/register">Create Account</NavLink>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
