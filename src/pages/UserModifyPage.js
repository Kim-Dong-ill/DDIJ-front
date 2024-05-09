import React from "react";

function UserModifyPage() {
  return (
    <div className="w-[500px]  bg-white mt ">
      <div className=" flex justify-between mt-[50px] mb-[50px]  ">
        <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800 ">
          보호자 정보
        </button>
        <button className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[13px] hover:border-gray-800">
          반려견 정보
        </button>
      </div>

      <div>
        <button className="flex items-center bg-ye-600  h-[30px] px-[5px] py-[5px] rounded-lg ">
          <img
            src="./images/star1.svg"
            className="w-[14px] h-[14px] mr-[3px] "
          />
          <span className="text-[14px]">대표</span>
        </button>
        <img src="./images/dog1.svg" className="w-[100px] h-[100px]" />
        <div>
          <span>뚜비</span>
          <img src="./images/man.svg" className="w-[20px] h-[20px]" />
        </div>
        <button>수정하기</button>
      </div>
      <div>
        <button className="flex items-center bg-white h-[30px] px-[5px] py-[5px] rounded-lg border border-da-100 ">
          <img
            src="./images/star1.svg"
            className="w-[14px] h-[14px] mr-[3px] "
          />
          <span className="text-[14px]">대표</span>
        </button>
        <img src="./images/dog2.svg" className="w-[100px] h-[100px]" />
        <h2>나나</h2>
        <img src="./images/woman.svg" className="w-[20px] h-[20px]" />
        <button>수정하기</button>
      </div>
      <div>
        <button className="flex items-center bg-white  h-[30px] px-[5px] py-[5px] rounded-lg border border-da-100">
          <img
            src="./images/star1.svg"
            className="w-[14px] h-[14px] mr-[3px] "
          />
          <span className="text-[14px]">대표</span>
        </button>

        <button className="flex items-center bg-ye-500 h-[100px] px-[5px] py-[5px] rounded-lg  ">
          <img src="./images/camera1.svg" className="w-[100px] h-[100px]" />
        </button>
        {/* <div className="bg-ye-500">
          <img src="./images/camera1.svg" className="w-[100px] h-[100px]" />
        </div> */}
        <h2></h2>
        <button>추가하기</button>
      </div>
    </div>
  );
}

export default UserModifyPage;
