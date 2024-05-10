import React from "react";

function CCViewPage() {
  return (
    <>
      <div className=" bg-da-400 pt-[90px] pb-[100px]">
        <div className="w-[500px] h-[255px] bg-slate-300"></div>
        <div className="text-white">
          {/* 박스 안 contents start======= */}
          <div className=" border m-5 rounded-lg p-5">
            <div className="flex mb-[20px]">
              <div className="w-[100px] h-[100px] bg-slate-500 rounded-[50px]"></div>
              <div>
                <div className="flex text-white ">
                  <p className="nanum">이름:&nbsp;</p>
                  <p className="nanum">봄</p>
                </div>
                <div className="flex text-white ">
                  <p className="nanum">나이:&nbsp;</p>
                  <p className="nanum">11살</p>
                </div>
                <div className="flex text-white items-center">
                  <p className="nanum">성별:&nbsp;</p>
                  <i class="fa-solid fa-mars"></i>
                </div>
                <div className="flex text-white ">
                  <p className="nanum">특이사항:&nbsp;</p>
                  <p className="nanum">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="nanum text-center">
                "Lorem ipsum dolor sit, amet consectetur adipisicing."
              </h2>
            </div>
          </div>
          {/* =======박스 안 contents end */}
          <div className="px-[18px] mb-[10px]">
            <p className="text-2xl">title</p>
            <p className="nanum">[저녁] 7시 30분 ~ 9시 00분</p>
            <p className="nanum">가산 디지털단지역 코드랩 아카데미 건물앞</p>
            <hr className="mb-[20px] " />
          </div>
          <div className="px-[18px]">
            <p className="nanum text-lg mb-[20px]">소개말</p>
            <p className="nanum">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
              repudiandae. Corrupti nemo veritatis quo quidem dignissimos fugiat
              ipsam quis commodi ea. Sequi impedit a voluptatum quae voluptates
              omnis recusandae cumque?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CCViewPage;
