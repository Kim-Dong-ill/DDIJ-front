import React, { useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import TextFieldLine from "../components/TextField";
import { NavLink } from "react-router-dom";

function RegisterPage() {
  const [hasDong, setHasDong] = useState(true);
  return (
    <div className=" bg-white h-[100vh] flex flex-col items-center ">
      <div className=" w-[500px] fixed z-50 bg-white top-0 flex justify-center border-x">
        <div>
          <img src="./images/intro_logo_wh.svg" alt="" />
        </div>
      </div>

      <div className=" bg-white w-full border-x  mt-[326px] flex justify-center ">
        <div className="w-[400px] ">
          <div className="my-2">반려동물이 있나요?</div>
          <div className="flex mb-6">
            <div>
              <button className="bg-black rounded-md w-[150px] h-[35px]">
                <label className=" px-12 py-2 text-white" htmlFor="hasdog">
                  있어요
                </label>
              </button>
              <input id="hasdog" type="radio" name="dog" />
            </div>
            <div>
              <button className="bg-black rounded-md w-[150px] h-[35px]">
                <label className=" px-12 py-2 text-white" htmlFor="hasnotdog">
                  없어요
                </label>
              </button>
              <input id="hasnotdog" type="radio" name="dog" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px]" htmlFor="userName">
              이름
            </label>
            <div>
              <TextFieldLine id="userName" label="이름" fullWidth />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px]" htmlFor="userEmail">
              이메일
            </label>
            <div>
              <TextFieldLine id="userEmail" label="이메일" fullWidth />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px]" htmlFor="usePassword">
              비밀번호
            </label>
            <div>
              <TextFieldLine id="userPassword" label="비밀번호" fullWidth />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px]" htmlFor="checkPassword">
              비밀번호 확인
            </label>
            <div>
              <TextFieldLine
                id="checkPassword"
                label="비밀번호 확인"
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px]" htmlFor="">
              닉네임
              <i className="pl-1 text-ye-600 fa-solid fa-circle-check"></i>
            </label>
            <div>
              <TextFieldLine id="nickName" label="닉네임" fullWidth />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-10">
            <label className="w-[100px]" htmlFor="adress">
              주소
            </label>
            <div>
              <TextFieldLine id="adress" label="주소" fullWidth />
            </div>
          </div>
          <div className="flex justify-center gap-3 mb-28">
            <NavLink to="/intro">
              <ButtonBl>취소</ButtonBl>
            </NavLink>
            <ButtonYe>다음</ButtonYe>
          </div>
        </div>
      </div>

      <div className="border-x w-[500px] flex flex-col items-center fixed z-50 bottom-0 py-5 bg-white">
        <div className="flex gap-5 ">
          <span>Do you have an account?</span>
          <span className="text-ye-600">
            <NavLink to="/login">Login Now</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
