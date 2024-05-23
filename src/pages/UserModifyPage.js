import React, { useEffect, useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import TextFieldLine from "../components/TextField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  defaltPassword,
  email,
  name,
  nickName,
  password,
} from "../utils/validation";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axios";

function UserModifyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const state = useSelector((state) => {
    return state.user.userData.user;
  });
  const [defaultP, setDefaultP] = useState();
  const [msg, setMsg] = useState("");
  const [nMsg, setNMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errNMsg, setErrNMsg] = useState("");
  const [nickValue, setNickValue] = useState(state.nickName);
  const [defaultState, setDefaultState] = useState(false); //기존비번 확인
  const [nickState, setNickState] = useState(false); //기존비번 확인
  function onSubmit(body) {
    console.log("바디바디", body);
  }

  function defaultPassword(e) {
    setDefaultP(e.target.value);
  }

  async function handleDefaultP() {
    try {
      const body = { defaultP, userId: state.id };
      console.log(body);
      const res = await axiosInstance.post("/user/checkpassword", body);
      console.log(res.data);
      setMsg(res.data.message);
      setErrMsg(res.data.errMsg);
    } catch (error) {}
  }

  useEffect(() => {
    if (msg) {
      setDefaultState(true);
    } else {
      setDefaultState(false);
    }
  }, [msg]);

  function handleValue(e) {
    setNickValue(e.target.value);
  }
  async function checkNickname() {
    const body = { nickValue };
    console.log(body);
    const res = await axiosInstance.post("/user/checknickname", body);
    setNMsg(res.data.message);
    setErrNMsg(res.data.errorMsg);
  }
  useEffect(() => {
    if (nMsg) {
      setNickState(true);
    } else {
      setNickState(false);
    }
  }, [nMsg]);
  console.log(nickState);
  return (
    <>
      <div
        className="bg-white w-[500px] border border-da-100 "
        // h-[100vh]
        style={{ height: "calc(100% - 65px)" }}
      >
        <div className="flex w-[500px] pt-[90px]">
          <Link to="/userinfo/:userid" className="flex-1">
            <button className="w-full border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
              보호자 정보
            </button>
          </Link>
          <Link to="/mypet/:userid" className="flex-1">
            <button className="w-full  border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
              반려견 정보
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[400px] m-auto grid gap-3 pt-[50px] ">
            <div className="h-[45px] flex justify-between py-[10px] pr-[5px] mb-[30px]">
              <div className="flex justify-start gap-2">
                <img
                  src="/images/user-profile.svg"
                  className="w-[20px] h-[20px]"
                />
                <h2 className="text-[15px]">보호자 정보</h2>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="w-[100px] nanumBold" htmlFor="name">
                이름
              </label>
              <div>
                <TextFieldLine
                  defaultValue={state.name}
                  id="name"
                  label="이름"
                  fullWidth
                  {...register("name", name)}
                />
                {errors.name && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="w-[100px] nanumBold" htmlFor="email">
                이메일
              </label>
              <div>
                <TextFieldLine
                  defaultValue={state.email}
                  id="email"
                  label="이메일"
                  fullWidth
                  {...register("email", email)}
                />
                {errors.email && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between relative">
                <label className="w-[190px]  nanumBold" htmlFor="defaultp">
                  기존 비밀번호
                  <button type="button" onClick={handleDefaultP}>
                    <i className=" pl-2 text-ye-600 fa-solid fa-circle-check">
                      확인
                    </i>
                  </button>
                </label>
                <div className="absolute right-0 nanumBold text-green-500 text-xs mt-1">
                  {msg}
                </div>
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errMsg}
                </div>
              </div>
              <div>
                <TextFieldLine
                  onInput={defaultPassword}
                  type="password"
                  id="defaultp"
                  label="기존 비밀번호"
                  fullWidth
                  {...register("defaultp", defaltPassword)}
                />
                {errors.defaultp && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.defaultp.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="w-[100px] nanumBold" htmlFor="password">
                비밀번호
              </label>
              <div>
                <TextFieldLine
                  disabled={defaultState ? false : true}
                  type="password"
                  id="password"
                  label="비밀번호"
                  fullWidth
                  {...register("password", defaltPassword)}
                />
                {errors.password && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="w-[120px] nanumBold" htmlFor="checkPassword">
                비밀번호 확인
              </label>
              <div>
                <TextFieldLine
                  disabled={defaultState ? false : true}
                  type="password"
                  id="checkPassword"
                  label="비밀번호 확인"
                  fullWidth
                  {...register("checkPassword", {
                    validate: (value) => {
                      return (
                        value === watch("password") || "비밀번호 일치 안함"
                      );
                    },
                  })}
                />
                {errors.checkPassword && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.checkPassword.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between relative">
                <label className="w-[190px] nanumBold" htmlFor="nickName">
                  닉네임
                  <button type="button" onClick={checkNickname}>
                    <i className=" pl-1 text-ye-600 fa-solid fa-circle-check">
                      중복체크
                    </i>
                  </button>
                </label>
                <div className="absolute right-0 nanumBold text-green-500 text-xs mt-1">
                  {nMsg}
                </div>
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errNMsg}
                </div>
              </div>
              <div>
                <TextFieldLine
                  onInput={handleValue}
                  // value={nickValue}
                  value={nickState ? nickValue : state.nickName}
                  id="nickName"
                  label="닉네임"
                  fullWidth
                  {...register("nickName", nickName)}
                />
                {errors.nickName && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.nickName.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-10">
              <label className="w-[100px] nanumBold" htmlFor="address">
                주소
              </label>
              <div>
                <TextFieldLine
                  id="address"
                  label="주소"
                  fullWidth
                  defaultValue={state.address}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pb-[115px]">
            <Link to="/userinfo/:userid">
              <ButtonBl>취소</ButtonBl>
            </Link>
            <ButtonYe type="submit">수정완료</ButtonYe>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserModifyPage;
