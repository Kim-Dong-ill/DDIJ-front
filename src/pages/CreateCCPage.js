import React, { useState } from "react";

const max = [
  { key: 1, value: "2명" },
  { key: 2, value: "3명" },
  { key: 3, value: "4명" },
  { key: 4, value: "5명" },
];
const usingTime = [
  { key: 1, value: " 30분" },
  { key: 2, value: "45분" },
  { key: 3, value: "1시간" },
  { key: 4, value: "1시간 15분" },
  { key: 5, value: "1시간 30분" },
  { key: 6, value: "1시간 45분" },
  { key: 7, value: "2시간" },
];


function CreateCCPage() {
  const [introduction, setIntroduction] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startshowBox, setStartshowBox] = useState(false);
  const [endshowBox, setEndshowBox] = useState(false);

  const introductionChange = (e) => {
    setIntroduction(e.target.value);
  };
  const startTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const startToggleBox = () => {
    setStartshowBox(!startshowBox);
  };
  const endToggleBox = () => {
    setEndshowBox(!endshowBox);
  };
  return (
    <>
      <div className="bg-white px-12 h-[100vh] border-2 border-da-100">
        <div>
          {/* 경고창 */}
          <div>
            <div className="text-center border-2 rounded-md px-4 py-2">
              <span className="text-red-500">동일한 시간대</span>에 중복된
              모임이있는지
              <br />
              확인하셨나요?
            </div>
            <div className="flex justify-around items-center px-4 py-2 gap-7">
              <button className="border-2 border-da-100 w-[185px] h-[35px] rounded-md">
                했어요
              </button>
              <button className="border-2 border-da-100 w-[185px] h-[35px] rounded-md">
                안했어요
              </button>
            </div>
          </div>
          {/* 모임설명 */}
          <div>
            <div className="flex justify-center items-center rounded-md gap-7 px-4 py-2">
              <h4>모임명</h4>
              <input
                type="text"
                className="border-2 rounded-md w-[300px] px-4 py-2"
              />
            </div>

            <textarea
              value={introduction}
              onChange={introductionChange}
              placeholder="소개말을 입력해주세요."
              className="bg-gray-200 rounded-md w-full h-[100px] text-justify mb-3 px-4 py-2"
            />
          </div>
          {/* 장소,시간설정 */}
          <div>
            <div>
              <label htmlFor="" className="block mb-3">
                출발지
              </label>
              <input
                type="String"
                className="w-full border-2 rounded-md mb-3 px-4 py-2"
                onClick={startToggleBox}
                readOnly
              />
              {startshowBox && (
                <div className="bg-gray-100 px-4 py-2 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div>
              <h4 className="mb-3">목적지</h4>
              <input
                type="text"
                className="w-full border-2 rounded-md mb-3 px-4 py-2"
                readOnly
                onClick={endToggleBox}
              />
              {endshowBox && (
                <div className="bg-gray-100 px-4 py-2 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div>
              <label htmlFor="startTime" className="mb-3">
                시작시간
              </label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                className="w-full border-2 rounded-md mb-3 px-4 py-2 "
                onChange={startTimeChange}
              />
            </div>
            <div>
              <label htmlFor="max" className="block mb-3">
                인원수
              </label>
              <select
                name="max"
                id="max"
                className="w-full px-4 py-2 mb-3 border-2 rounded-md  h-[45px]"
              >
                {max.map((item, idx) => {
                  return (
                    <option value={item.key} key={idx}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="usingTime" className="block mb-3">
                소요시간
              </label>
              <select
                name="usingTime"
                id="usingTime"
                className="w-full border-2 px-4 py- 2 mb-10 rounded-md block h-[45px]"
              >
                {usingTime.map((item, idx) => {
                  return (
                    <option value={item.key} key={idx}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* 취소,등록버튼 */}
          <div className="flex justify-center items-center gap-10">
            <button className="bg-da-300 text-wh-100 rounded-full w-[80px] h-[25px]">
              취소
            </button>
            <button className="bg-ye-600 text-da-300 rounded-full w-[80px] h-[25px]">
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCCPage;
