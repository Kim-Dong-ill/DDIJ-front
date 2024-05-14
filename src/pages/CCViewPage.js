import React from "react";
import Kakao_StrEnd from "../kakaoMap/Kakao_StrEnd";

function CCViewPage() {
  return (
    <>
      <div className=" bg-da-400 pt-[90px] pb-[100px]">
        <div className="w-[500px] h-[255px] bg-slate-300">
          <Kakao_StrEnd />
        </div>
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
            <p className="nanum mb-[20px]">
              가산 디지털단지역 코드랩 아카데미 건물앞
            </p>
            <hr className="mb-[20px] " />
          </div>
          <div className="px-[18px] mb-[50px]">
            <p className="nanum text-lg mb-[20px]">소개말</p>
            <p className="nanum mb-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
              repudiandae. Corrupti nemo veritatis quo quidem dignissimos fugiat
              ipsam quis commodi ea. Sequi impedit a voluptatum quae voluptates
              omnis recusandae cumque?
            </p>
            <hr className="mb-[20px]" />
            <div className="w-full px-[18px]">
              <p className="text-xs mb-[30px]">참석자명단 4/5</p>
              {/* 참석자명단시작! - map돌려야합니다 */}
              <div className="w-[430px] h-[55px] rounded-[50px] m-auto flex items-center px-3 gap-3 mb-3 border">
                <div>
                  <div className="w-[45px] h-[45px] rounded-[50px] bg-slate-300"></div>
                </div>
                <div>
                  <p className="text-wh-100">겨울이엄마</p>
                  <p className="text-da-800 text-xs">
                    겨울이 여 5세 "활발한 편이에요 / 활동량이 많아요 / 뛰는걸
                    좋아해요"
                  </p>
                </div>
              </div>
              {/* 참석자명단 end - 여기까지 map돌립니다 */}
            </div>
          </div>
          {/* 글 contents 섹션 완료 */}
          <div className="w-full flex justify-center">
            <button className="fixed bottom-[60px] w-[150px] h-[40px] m-auto text-[13px] text-center rounded-[20px] bg-ye-600 text-black my-4">
              참석하기 4/5
              {/* 정원 꽉 차면 버튼색상 #222222 - 정원이 다 찼개... 로 버튼변경  */}
              {/* 참석하기 완료되면 취소하기 버튼으로 버튼 변경 - #313131 */}
              {/* 글작성자의 경우 수정하기 / 삭제하기 버튼으로 노출 - #313131 */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CCViewPage;
