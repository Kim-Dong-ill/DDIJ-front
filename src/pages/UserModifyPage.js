import React from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";

function UserModifyPage() {
  return (
    <div className="bg-white">
      <div className=" flex justify-between">
        <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
          보호자 정보
        </button>
        <button className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
          반려견 정보
        </button>
      </div>
      {/* content-between h-[670px] */}
      <div
        className="w-[400px] m-auto grid gap-3 pt-[50px] pb-[115px] "
        style={{ height: "calc(100vh - 65px)" }}
      >
        <div className="h-[45px] flex justify-between p-[10px]">
          <div className="flex justify-start gap-2">
            <img src="/images/user-profile.svg" className="w-[20px] h-[20px]" />
            <h2 className="text-[15px]">보호자 정보</h2>
          </div>
          <button className="px-2 bg-ye-600 w-[55px] h-[25px] text-[11px] text-center rounded-2xl">
            수정하기
          </button>
        </div>
        {/* <div className=" flex-col gap-y-20 "> */}
        <div className=" nanum flex-col items-center space-y-10 mb-[50px]">
          <div className="p-2">
            <h2 className="text-base p-[10px]">이름</h2>
            <input
              type="text"
              className="w-full p-[10px] nanum border-b-2 border-da-100"
            ></input>
          </div>

          <div className="p-2">
            <h2 className="text-base p-[10px]">이메일</h2>
            <input
              type="text"
              className="w-full p-[10px] nanum border-b-2 border-da-100 "
            ></input>
          </div>

          <div className="p-2">
            <h2 className="text-base p-[10px]">닉네임</h2>
            <input
              type="text"
              className="w-full p-[10px] nanum border-b-2 border-da-100"
            ></input>
          </div>

          <div className="p-2  \">
            <h2 className="text-base  p-[10px] ">주소</h2>
            <input
              type="text"
              className="w-full p-[10px] nanum border-b-2 border-da-100"
            ></input>
          </div>
        </div>

        <div className="w-[400px] flex justify-center h-[28px] gap-2 mb-[50px] px-[100px]">
          <ButtonBl>취소</ButtonBl>
          <ButtonYe>수정완료</ButtonYe>
        </div>
      </div>
    </div>
  );
}

export default UserModifyPage;
