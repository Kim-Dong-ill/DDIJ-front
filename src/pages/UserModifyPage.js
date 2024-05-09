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
        <button>대표</button>
        <img src="./images/dog1.svg" className="w-[100px] h-[100px]" />
        <h2>뚜비</h2>
        <img src="./images/man.svg" className="w-[20px] h-[20px]" />
        <button>수정하기</button>
      </div>
      <div>
        <button>대표</button>
        <img src="./images/dog2.svg" className="w-[100px] h-[100px]" />
        <h2>나나</h2>
        <img src="./images/man.svg" className="w-[20px] h-[20px]" />
        <button>수정하기</button>
      </div>
      <div>
        <button>대표</button>
        <img src="./images/dog1.svg" className="w-[100px] h-[100px]" />
        <h2></h2>
        <img src="./images/man.svg" className="w-[20px] h-[20px]" />
        <button>추가하기</button>
      </div>
    </div>
  );
}

export default UserModifyPage;
