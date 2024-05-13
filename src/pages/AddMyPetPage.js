import React from "react";
import Navbar from "../components/Navbar";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";

function AddMyPetPage() {
  return (
    <div>
      {/* subheader start */}
      <div className="subHeader relative bg-ye-600 w-[500px] top-0 fixed h-[260px] text-center">
        <div className="h-[50px] border-b-2 mb-3 flex  justify-between items-center">
          <h2>
            <img src="/images/backicon.svg" alt="" />
          </h2>
          <h2>반려견 추가</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>

        {/* name start */}
        <div className="grid gap-3">
          <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
            <img
              src="/images/camera1.svg"
              className="w-[60px] h-[60px] m-auto"
            />
          </div>

          {/* button start */}
          <div className="flex justify-center">
            <button className="border border-da-300 px-[5px] py-[3px] rounded-lg">
              <span className="inline-block text-[13px] mr-[3px]">
                사진추가
              </span>
              {/* <img src="./images/plus.svg" className="w-[14px] h-[14px]" /> */}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white" style={{ height: "calc(100vh - 65px)" }}>
        {/* view start*/}
        <div className="w-[400px]  m-auto grid gap-3 pt-[50px] pb-[115px] ">
          {/* <div className=" flex-col gap-y-20 "> */}

          {/* input start */}
          <div className="w-[400px] nanum flex-col items-center space-y-10 mb-[50px]">
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

          <div className="w-[400px] flex justify-center h-[28px] gap-2 mb-[50px]">
            <ButtonBl>취소</ButtonBl>
            <ButtonYe>수정완료</ButtonYe>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default AddMyPetPage;
