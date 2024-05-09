import React from "react";
import Navbar from "../components/Navbar";

function MyPetModifyPage() {
  return (
    <div>
      <div className="subHeader relative bg-ye-700 w-[500px] top-0 fixed h-[240px] text-center  ">
        <div className="h-[50px] border-b-2 mb-3 flex justify-between items-center justify-center">
          <h2>
            <img src="/images/backicon.svg" alt="" />
          </h2>
          <h2>자랑하개</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>
        <div className="h-[100px] w-[100px] bg-ye-100 m-auto rounded-[50px]  my-[5px]"></div>

        <div className="flex justify-center items-center gap-1">
          <div>뚜비</div>
          <div>
            <i class="fa-solid fa-mars"></i>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[25px] nanum">"</p>
          <p className="nanum">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className="text-[25px] nanum">"</p>
        </div>
      </div>

      {/* <div className="h-[200vh] mt-[195px]">
        MyPetModifyPage */}
      <div className=" absolute w-[500px] h-[100vh] bg-white   ">
        <div className=" flex justify-between mb-[50px]   ">
          <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800 ">
            보호자 정보
          </button>
          <button className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800">
            반려견 정보
          </button>
        </div>

        {/* content-between h-[670px] */}
        <div className="w-[350px] h-[670px] m-auto grid gap-3 ">
          <div className="h-[45px] flex justify-between">
            <div className="flex justify-start  gap-2">
              <img
                src="./images/user-profile.png"
                className="w-[20px] h-[20px]"
              />
              <h2 className="text-sm">보호자 정보</h2>
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

          <div className="flex justify-center h-[28px]  gap-2 ">
            <button className=" w-[82px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
              취소
            </button>
            <button className=" w-[82px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
              수정완료
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
    // </div>
  );
}

export default MyPetModifyPage;
