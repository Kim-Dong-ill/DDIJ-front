import React, { useState } from "react";
import TextFieldLine from "../components/TextField";
import ButtonYe from "../components/ButtonYe";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginEmail, loginPassword } from "../utils/validation";

import { useDispatch } from "react-redux";
import { loginUser } from "../store/thunkFunctions";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onSubmit(body) {
    function handleLoginError(loginError) {
      setErrorMsg(loginError);
    }
    const result = await dispatch(loginUser({ body, handleLoginError }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
    reset();
  }

  return (
    <div className="bg-white h-[100vh] flex flex-col items-center border-x">
      <div className="mb-10">
        <img src="./images/intro_logo_wh.svg" alt="" />
      </div>
      <div className=" w-[80%] mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] flex flex-col gap-7 mb-10">
            <TextFieldLine
              id="email"
              fullWidth
              label="E-mail"
              {...register("email", loginEmail)}
            />
            {errors.email && (
              <div className="nanumBold text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
            <TextFieldLine
              id="password"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", loginPassword)}
            />
            {errors.password && (
              <div className="nanumBold text-red-500 text-xs mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
          {/* 로그인 오류시 나올 에러메세지 */}
          <div className="text-er-100 nanumBold text-sm">{errorMsg}</div>
          <div className="mt-10">
            <ButtonYe type="submit">
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
