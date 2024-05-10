import React from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import { NavLink } from "react-router-dom";

function RegisterPage() {
  return (
    <div className=" bg-white h-[100vh] flex flex-col items-center border-x ">
      <div className=" w-[500px] fixed  top-0 border flex justify-center">
        <div>
          <img src="./images/intro_logo_wh.svg" alt="" />
        </div>
      </div>

      <div className="bg-black w-full h-[100vh]">z</div>

      <div className="border w-[500px] flex flex-col items-center fixed bottom-0 my-5">
        <div className="flex gap-3 mb-4">
          <ButtonBl>취소</ButtonBl>
          <ButtonYe>다음</ButtonYe>
        </div>
        <div className="flex gap-5">
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
