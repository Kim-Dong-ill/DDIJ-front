import React from "react";
import { Link } from "react-router-dom";

function MyPetListPage() {
  return (
    <div
      className="w-[500px] bg-white pt-[90px] pb-[115px] border border-da-100"
      style={{ height: "calc(100% - 65px)" }}
    >
      <div className="flex mb-[30px]">
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

      <div className="w-[450px] m-auto grid gap-[25px]  bg-white text-center">
        <div className="border border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-ye-600 h-[30px] px-[5px] rounded-lg">
              <img
                src="/images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <img
            src="/images/dog1.svg"
            className="w-[100px] h-[100px] rounded-full m-auto"
          />
          <div>
            <span className="inline-block leading-[40px] mr-[10px] nanumBold">
              뚜비
            </span>
            <i class="fa-solid fa-mars"></i>
          </div>
          <div className="border-t">
            <Link to="/mypet/mod/:petid">
              <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                수정하기
              </button>
            </Link>
          </div>
        </div>

        <div className="border border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100">
              <img
                src="/images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <img
            src="/images/dog2.svg"
            className="w-[100px] h-[100px] rounded-full m-auto"
          />
          <div>
            <span className="inline-block leading-[40px] mr-[10px] nanumBold">
              나나
            </span>
            <i class="fa-solid fa-venus"></i>
          </div>
          <div className="border-t">
            <Link to="/mypet/mod/:petid">
              <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                수정하기
              </button>
            </Link>
          </div>
        </div>

        <div className="border border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100">
              <img
                src="/images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
            <img
              src="/images/camera1.svg"
              className="w-[60px] h-[60px] m-auto"
            />
          </div>
          <div>
            <span className="inline-block leading-[40px] mr-[10px]"></span>
            {/* <i class="fa-solid fa-mars"></i> */}
          </div>
          <div className="border-t">
            <Link to="/mypet/add">
              <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                추가하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPetListPage;
