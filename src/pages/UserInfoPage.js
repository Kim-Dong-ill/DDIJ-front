import React, { useState } from "react";
import TextFieldLine from "../components/TextField";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../store/thunkFunctions";

function UserInfoPage() {
  const dispatch = useDispatch();

  //회원 탈퇴
  async function handleSignout() {
    if (window.confirm("탈퇴하시겠습니까?")) {
      await dispatch(signOutUser(state.id));
      alert("탈퇴되었습니다.");
    }
  }

  const state = useSelector((state) => {
    return state.user.userData.user;
  });
  return (
    <>
      <div
        className="bg-white w-[500px] border border-da-100"
        style={{ height: "calc(100% - 65px)" }}
      >
        <div className="flex w-[500px] pt-[90px]">
          {/* <Link to={`/userinfo/${state.id}`} className="flex-1"> */}
          <Link to={`/userinfo`} className="flex-1">
            <button className="w-full border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
              보호자 정보
            </button>
          </Link>
          <Link to={`/mypet/${state.id}`} className="flex-1">
            <button className="w-full  border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
              반려견 정보
            </button>
          </Link>
        </div>

        <div className="w-[400px] m-auto grid gap-3 pt-[50px] pb-[115px]">
          <div className="h-[45px] flex justify-between pr-[5px] mb-3">
            <div className="flex justify-start gap-2">
              <img
                src="/images/user-profile.svg"
                className="w-[20px] h-[20px]"
              />
              <h2 className="text-[17px]">내 정보</h2>
            </div>

            <Link to="/usermod/:userid`">
              <button className="px-2 border border-da-200 w-full h-[25px] text-[12px] text-center rounded-md">
                수정하기
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label
              className="w-[100px] nanumBold text-[15px]"
              htmlFor="userName"
            >
              이름
            </label>
            <div>
              <TextFieldLine
                // required
                disabled={true}
                id="userName"
                label={`${state.name}`}
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label
              className="w-[100px] nanumBold text-[15px]"
              htmlFor="userEmail"
            >
              이메일
            </label>
            <div>
              <TextFieldLine
                disabled={true}
                id="userEmail"
                label={`${state.email}`}
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px] nanumBold text-[15px] " htmlFor="">
              닉네임
              <button type="button">
                <i className="pl-2 text-ye-600 fa-solid fa-circle-check"></i>
              </button>
            </label>
            <div>
              <TextFieldLine
                disabled={true}
                id="nickName"
                label={state.nickName}
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-16">
            <label className="w-[100px] nanumBold text-[15px]" htmlFor="adress">
              주소
            </label>
            <div>
              <TextFieldLine
                disabled={true}
                id="adress"
                label={state.address}
                fullWidth
              />
            </div>
          </div>
          <div className="text-da-200">
            <button
              onClick={handleSignout}
              className="border border-da-500 rounded-[6px] px-2 py-1 nanum text-[12px] hover:bg-da-200 hover:text-da-300"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfoPage;
