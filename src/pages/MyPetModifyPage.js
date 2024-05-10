import React from "react";
import Navbar from "../components/Navbar";

function MyPetModifyPage() {
  return (
    <div>
      <div className="subHeader relative bg-ye-600 w-[500px] top-0 fixed h-[240px] text-center">
        <div className="h-[50px] border-b-2 mb-3 flex  justify-between items-center">
          <h2>
            <img src="/images/backicon.svg" alt="" />
          </h2>
          <h2>프로필 수정</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>

        <div className="grid gap-2">
          <div className="h-[100px] w-[100px] bg-ye-100 m-auto rounded-[50px] my-[5px]"></div>

          <div className="flex justify-center items-center gap-1">
            <div>뚜비</div>
            <div>
              <i class="fa-solid fa-mars"></i>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="border border-da-300 px-[5px] py-[3px] rounded-lg">
              <span className="inline-block text-[13px] mr-[3px]">
                사진추가
              </span>
              <img
                src="./images/plus.svg"
                className="inline-block align-middle w-[14px] h-[14px]"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute w-[500px] bg-white"
        style={{ height: "calc(100vh - 65px)" }}
      >
        {/* content-between h-[670px] */}
        <div className="w-[400px]  m-auto grid gap-3 pt-[50px] pb-[115px] ">
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
              <h2 className="text-base p-[10px]">나이</h2>
              <input
                type="text"
                className="w-full p-[10px] nanum border-b-2 border-da-100 "
              ></input>
            </div>

            <div className="p-2">
              <h2 className="text-base p-[10px]">성별</h2>
              <input
                type="text"
                className="w-full p-[10px] nanum border-b-2 border-da-100"
              ></input>
            </div>

            <div className="p-2">
              <p className="nanumBold p-[10px] ">중성화 여부</p>
              <div className="justify-between px-[10px] py-[10px]">
                <button className="w-1/2 border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  했어요
                </button>
                <button className="w-1/2 border border-gray-200 rounded-md hover:bg-da-300 hover:text-white">
                  안했어요
                </button>
              </div>
            </div>

            <div className="p-2">
              <h2 className="text-base  p-[10px]">기본접종</h2>
              <button>했어요</button>
              <button>안했어요</button>
            </div>

            <div className="p-2">
              <h2 className="text-base  p-[10px]">광견병</h2>
              <button>했어요</button>
              <button>안했어요</button>
            </div>
          </div>

          <div className="flex justify-center h-[28px] mb-[50px] gap-2 ">
            <button className=" w-[82px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-da-600 hover:text-white">
              취소
            </button>
            <button className=" w-[82px] text-[13px] text-center rounded-2xl bg-ye-600 text-da-300 hover:bg-ye-800 hover:text-da-300">
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
