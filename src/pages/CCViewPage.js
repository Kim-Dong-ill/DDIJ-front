import React from "react";
import Kakao_StrEnd from "../kakaoMap/Kakao_StrEnd";

function CCViewPage() {
  return (
    <>
      <div className="grid gap-3 bg-da-400 pt-[90px] pb-[100px] border-[1px]">
        <div className="w-[500px] h-[255px] bg-slate-300">
          <Kakao_StrEnd />
        </div>
        <div className="text-wh-100">
          {/* 박스 안 contents start======= */}
          <div className=" border border-da-900 mx-5 my-[30px] rounded-lg p-5">
            <div className="flex mb-[20px] ">
              <img
                src="/images/dog3.svg"
                className="w-[100px] h-[100px] rounded-full"
              />

              <div className="grid gap-[3px] ml-[20px]">
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">이름 :&nbsp;</p>
                  <p className="nanum">봄</p>
                </div>
                <div className="flex text-da-800 text-[15px]">
                  <p className="nanum">나이 :&nbsp;</p>
                  <p className="nanum">11살</p>
                </div>
                <div className="flex text-da-800 text-[15px] items-center">
                  <p className="nanum">성별 :&nbsp;</p>
                  <i class="fa-solid fa-mars"></i>
                </div>
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">특이사항 :&nbsp;</p>
                  <p className="nanum">칭구 조와!!</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="nanumBold text-center">" 나만 따라오개 ! "</h2>
            </div>
          </div>
          {/* =======박스 안 contents end */}
          <div className="grid gap-[5px] px-[25px] mb-[20px]">
            <p className="nanumBold text-[18px]">어서오시개</p>
            <p className="nanum text-[15px] text-da-800">
              [저녁] 7시 30분 ~ 9시 00분
            </p>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              가산 디지털단지역 코드랩 아카데미 건물앞
            </p>
            <hr className="mb-[20px] border-da-900" />
          </div>
          <div className="grid gap-[5px] px-[25px] mb-[50px]">
            <p className="nanumBold text-[18px]">소개말</p>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              날씨도 좋은데 퇴근하고 같이 강아지 산책시키실분들 계신가요???
              저녁은 각자 해결하고 7시 30분에 모여서 안양천 산책해요!! 모임
              장소는 코드랩 건물 앞입니다!
            </p>
            <hr className="mb-[30px] border-da-900" />
            <div className="w-full grid gap-3 ">
              <p className="nanumBold text-[18px]">참석댕명단 4/5</p>
              {/* 참석자명단시작! - map돌려야합니다 */}
              <div className="w-full h-auto rounded-[10px] flex items-center px-[15px] py-[5px] gap-3 mb-3 border border-da-900">
                <div>
                  <div className="w-[45px] h-[45px] rounded-[50px] bg-slate-300"></div>
                </div>
                <div>
                  <p className="text-wh-100 text-[15px] nanumBold pb-[2px]">
                    겨울이엄마
                  </p>
                  <p className="text-da-800 text-xs nanum">
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
