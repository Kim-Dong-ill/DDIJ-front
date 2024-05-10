import React from "react";

function MyPetListPage() {
  return (
    <div
      className="w-[500px] bg-white"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <div className=" flex justify-between ">
        <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800 ">
          보호자 정보
        </button>
        <button className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800">
          반려견 정보
        </button>
      </div>

      <div className="w-[450px] m-auto grid gap-[25px] pt-[50px] pb-[115px] bg-white text-center">
        <div className="border border-border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-ye-600 h-[30px] px-[5px] rounded-lg">
              <img
                src="./images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <img
            src="./images/dog1.svg"
            className="w-[100px] h-[100px] rounded-full m-auto"
          />
          <div>
            <span className="inline-block leading-[40px] mr-[10px]">뚜비</span>
            <i class="fa-solid fa-mars"></i>
          </div>
          <div className="border-t">
            <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
              수정하기
            </button>
          </div>
        </div>

        <div className="border border-border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100">
              <img
                src="./images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <img
            src="./images/dog2.svg"
            className="w-[100px] h-[100px] rounded-full m-auto"
          />
          <div>
            <span className="inline-block leading-[40px] mr-[10px]">나나</span>
            <i class="fa-solid fa-venus"></i>
          </div>
          <div className="border-t">
            <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
              수정하기
            </button>
          </div>
        </div>

        <div className="border border-border-da-100 rounded-lg">
          <p className="text-right pr-[15px] pt-[15px]">
            <button className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100">
              <img
                src="./images/star1.svg"
                className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
              />
              <span className="inline-block  text-[14px]">대표</span>
            </button>
          </p>
          <button className=" bg-ye-500 h-[100px] w-[100px]  rounded-full  ">
            <img
              src="./images/camera1.svg"
              className="w-[60px] h-[60px] m-auto"
            />
          </button>
          <div>
            <span className="inline-block leading-[40px] mr-[10px]"></span>
            {/* <i class="fa-solid fa-mars"></i> */}
          </div>
          <div className="border-t">
            <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPetListPage;
