import React from "react";
import Navbar from "../components/Navbar";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";

function MyPetModifyPage() {
  return (
    <div>
      {/* subheader start */}
      <div className="subHeader relative bg-ye-600 w-[500px] top-0 fixed h-[260px] text-center">
        <div className="h-[50px] border-b-2 mb-3 flex  justify-between items-center">
          <h2>
            <img src="/images/backicon.svg" alt="" />
          </h2>
          <h2 className="text-[20px]">프로필 수정</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>

        {/* name start */}
        <div className="grid gap-2">
          <img
            src="/images/dog1.svg"
            alt=""
            className="w-[100px] h-[100px] rounded-full m-auto my-[5px]"
          />

          <div className="flex justify-center items-center gap-1">
            <div className="nanumBold">뚜비</div>
            <div>
              <i class="fa-solid fa-mars"></i>
            </div>
          </div>

          {/* button start */}
          <div className="flex justify-center items-center">
            <button className="w-auto border border-da-300 px-[15px] rounded-xl">
              <span className="inline-block text-[13px] mr-[3px]">
                사진추가
              </span>
              <img
                src="/images/plus.svg"
                className="inline-block align-middle w-[14px] h-[14px]"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white ">
        {/* view start*/}
        <div
          className="w-[400px] m-auto grid gap-3 pt-[50px] pb-[115px]"
          style={{ height: "calc(100vh - 65px)" }}
        >
          {/* <div className=" flex-col gap-y-20 "> */}

          {/* input start */}
          <div className="w-[400px] flex-col items-center space-y-10 mb-[50px]">
            <div className="p-2">
              <h2 className="nanumBold p-[10px]">이름</h2>
              <input
                type="text"
                className="w-full p-[10px] nanum border-b-2 border-da-100"
              ></input>
            </div>

            <div className="p-2">
              <h2 className="nanumBold p-[10px]">나이</h2>
              <input
                type="text"
                className="w-full p-[10px] nanum border-b-2 border-da-100 "
              ></input>
            </div>

            <div className="p-2">
              <h2 className="nanumBold p-[10px]">성별</h2>
              <input
                type="text"
                className="w-full p-[10px] nanum border-b-2 border-da-100"
              ></input>
            </div>

            <div className="p-2">
              <p className="nanumBold p-[10px] ">중성화여부</p>
              <div className="flex px-[10px]">
                <button className="inline-block flex-auto w-[50%] mr-[5px] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  했어요
                </button>
                <button className="inline-block flex-auto w-[50%] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  안했어요
                </button>
              </div>
            </div>

            <div className="p-2">
              <h2 className="nanumBold p-[10px]">기본접종</h2>
              <div className="flex p-[10px]">
                <button className="inline-block flex-auto w-[50%] mr-[5px] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  했어요
                </button>
                <button className="inline-block flex-auto w-[50%] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  안했어요
                </button>
              </div>
            </div>

            <div className="p-2">
              <h2 className="nanumBold p-[10px]">광견병</h2>
              <div className="flex p-[10px]">
                <button className="inline-block flex-auto w-[50%] mr-[5px] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  했어요
                </button>
                <button className="inline-block flex-auto w-[50%] px-[5px] py-[5px] border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  안했어요
                </button>
              </div>
            </div>
          </div>

          <div className="w-[400px] flex justify-center h-[28px] gap-2 mb-[50px] px-[100px]">
            <ButtonBl>취소</ButtonBl>
            <ButtonYe>수정완료</ButtonYe>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default MyPetModifyPage;
