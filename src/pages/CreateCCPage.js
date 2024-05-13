import React, { useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import { Link } from "react-router-dom";

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
  const [selectButton, setSelectButton] = useState(null);

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

  // const handleClick = (button) => {
  //   setSelectButton(button);
  // };
  return (
    <>
      <div
        className="bg-white px-12 border-[1px] border-da-100 "
        style={{ height: "calc(100%)" }}
      >
        <div className="pt-[90px] pb-[100px]">
          {/* 경고창 */}
          <div className="mt-4">
            <div className="text-center border rounded-md  mb-4 px-4 py-2">
              <span className="text-red-500">동일한 시간대</span>에 중복된
              모임이있는지
              <br />
              확인하셨나요?
            </div>
            <div className="flex justify-around items-center mb-4 px-4 py-2 gap-7">
              {/* onClick 추가 */}
              <button
                className={
                  "border-2 border-da-100 w-[185px] h-[35px] rounded-md hover:bg-da-300 hover:text-wh-100 ${selectButton === 'Yesbutton'? 'bg-da-300 text-white' : ''}"
                }
                // onClick={() => handleClick("Yesbutton")}
              >
                했어요
              </button>
              {/* onClick 추가 */}
              <button
                className={
                  "border-2 border-da-100 w-[185px] h-[35px] rounded-md hover:bg-da-100 hover:text-red-500 ${selectButton === 'Nobutton' ? 'bg-da-100 text-red-500' : ''}"
                }
                // onClick={() => handleClick("Nobutton")}
              >
                안했어요
              </button>
            </div>
          </div>
          {/* 모임설명 */}
          <div>
            <div className="flex justify-center items-center rounded-md gap-7 mb-4 px-4 py-2">
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
              className="bg-gray-200 rounded-md w-full h-[100px] text-justify mb-4 px-4 py-2"
            />
          </div>
          {/* 장소,시간설정 */}
          <div>
            <div>
              <label htmlFor="" className=" mb-4 flex gap-2 ">
                <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                출발지
              </label>
              <input
                type="String"
                className="w-full border-2 rounded-md mb-3 px-4 py-2 cursor-pointer"
                onClick={startToggleBox}
                readOnly
              />
              <img
                src="/images/plusglass_icon.svg"
                alt="돋보기아이콘"
                className="block relative  left-[350px] bottom-[42px] cursor-pointer"
                onClick={startToggleBox}
              />
              {startshowBox && (
                <div className="bg-gray-100 px-4 py-2 mb-4 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div>
              <h4 className="mb-3  flex gap-2">
                <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                목적지
              </h4>
              <input
                type="text"
                className="w-full border-2 rounded-md mb-3 px-4 py-2 cursor-pointer"
                readOnly
                onClick={endToggleBox}
              />
              <img
                src="/images/plusglass_icon.svg"
                alt="돋보기 아이콘"
                className="block relative  left-[350px] bottom-[42px] cursor-pointer"
                onClick={endToggleBox}
              />
              {endshowBox && (
                <div className="bg-gray-100 px-4 py-2 mb-4 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div>
              <label htmlFor="startTime" className="mb-4">
                <h4 className="flex mb-3 gap-2">
                  <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                  시작시간
                </h4>
              </label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                value={startTime}
                className="w-full border-2 rounded-md mb-4 px-4 py-2 "
                onChange={startTimeChange}
              />
            </div>

            <div>
              <label htmlFor="usingTime" className="block mb-4">
                <h4 className="flex mb-3 gap-2">
                  <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                  소요시간
                </h4>
              </label>
              <select
                name="usingTime"
                id="usingTime"
                className="w-full border-2 px-4 py- 2 mb-4 rounded-md block h-[45px] cursor-pointer"
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
            <div>
              <label htmlFor="max" className="block mb-4">
                <h4 className="flex mb-3 gap-2">
                  <img src="/images/people_icon.svg" alt="사람 아이콘" />
                  인원수
                </h4>
              </label>
              <select
                name="max"
                id="max"
                className="w-full px-4 py-2 mb-10 border-2 rounded-md  h-[45px] cursor-pointer"
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
          </div>
          {/* 취소,등록버튼 */}
          <div className="flex justify-center items-center gap-10">
            <Link to="/circles">
              <ButtonBl>취소</ButtonBl>
            </Link>
            <Link to="/circles">
              <ButtonYe>등록</ButtonYe>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCCPage;
