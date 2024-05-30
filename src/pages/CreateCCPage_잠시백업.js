import React, { useEffect, useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import { Link, useNavigate } from "react-router-dom";
import TextFieldLine from "../components/TextField";
import CheckCircleButton from "../components/CheckCircleButton";
// import axiosInstance from "../utils/axios";
import { createCircle } from "../store/thunkFunctions";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Kakao_point from "../kakaoMap/Kakao_point";
import axiosInstance from "../utils/axios";
import { format, formatDate } from "date-fns";
import Kakao_start_point from "../kakaoMap/Kakao_start_point";
// import { Box, FormControl, MenuItem, Select } from "@mui/material";
// import SelectButton from "../components/SelectButton";
// import { SelectUnstyled, OptionUnstyled } from "@mui/base";
// import { styled } from "@mui/system";

const peoplesOptions = [
  { key: 1, value: 2, display: "2명" },
  { key: 2, value: 3, display: "3명" },
  { key: 3, value: 4, display: "4명" },
  { key: 4, value: 5, display: "5명" },
];

const usingTimeOptions = [
  { key: 1, value: 30, display: "30분" },
  { key: 2, value: 45, display: "45분" },
  { key: 3, value: 60, display: "1시간" },
  { key: 4, value: 75, display: "1시간 15분" },
  { key: 5, value: 90, display: "1시간 30분" },
  { key: 6, value: 105, display: "1시간 45분" },
  { key: 7, value: 120, display: "2시간" },
];

//            circle/new에 post요청보내기 // address를 coord로 변환하기

function CreateCCPage() {
  const { kakao } = window;
  const [endAddress, setEndAddress] = useState(""); //시작주소
  const [startAddress, setStartAddress] = useState(""); //시작주소
  const [endCoord, setEndCoord] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });

  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [usingTime, setUsingTime] = useState([
    { key: 1, value: " 30분" },
    { key: 2, value: "45분" },
    { key: 3, value: "1시간" },
    { key: 4, value: "1시간 15분" },
    { key: 5, value: "1시간 30분" },
    { key: 6, value: "1시간 45분" },
    { key: 7, value: "2시간" },
  ]);
  const [peoples, setPeoples] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // watch,
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const [startshowBox, setStartshowBox] = useState(false); // 출발지 토글박스
  const [endshowBox, setEndshowBox] = useState(false); // 목적지 토글박스
  const [checkCircle, setCheckCircle] = useState(false); // 중복된모임체크
  const [newCCInfo, setnewCCInfo] = useState({
    user: loginState,
    name: "",
    text: "",
    startLoc: "",
    endLoc: "",
    startDate: "",
    startTime: "",
    usingTime: "",
    peoples: "",
  });

  useEffect(() => {
    setnewCCInfo((prevState) => ({
      ...prevState,
      startTime: startTime,
      startDate: startDate,
      usingTime: usingTime,
      peoples: peoples,
      startLoc: { coordinates: coordinates },
      endLoc: { endCoordinates: endCoord },
      startAdd: startAddress,
    }));
  }, [
    startTime,
    usingTime,
    peoples,
    startDate,
    coordinates,
    endCoord,
    startAddress,
  ]);

  // 출발지 토글박스
  const startToggleBox = () => {
    setStartshowBox(!startshowBox);
  };

  // 목적지 토글박스
  const endToggleBox = () => {
    setEndshowBox(!endshowBox);
  };

  // 중복된모임체크
  function handleCheckCircle(result) {
    setCheckCircle(result);
  }

  // useNavigate
  const navigate = useNavigate();

  function handleChangeValue(e) {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setnewCCInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function onSubmit(test) {
    console.log(test);
    const body = {
      ...newCCInfo,

      startTime: new Date(
        newCCInfo.startDate + "T" + newCCInfo.startTime + ":00.000Z"
      ),
      usingTime: new Date(Number(newCCInfo.usingTime)),
    };

    console.log("sending Data:::", body);

    try {
      const res = await axiosInstance.post(`/circles/new/${loginState}`, body);
      console.log("모임생성 성공", res.data);

      toast.success("👨👩 모임생성을 성공했습니다.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,

        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      reset();

      navigate("/circles");
    } catch (error) {
      //  에러 토스트가 안뜸
      console.log("모임생성 실패", error.message);

      toast.error(
        <div>
          모임생성을 실패했습니다.!!
          <br />
          출발지와 목적지를 다시 해주세요
        </div>,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  const validationRules = {
    name: {
      required: {
        value: true,
        message: "모임명을 입력해주세요.",
      },

      maxLength: {
        value: 10,
        message: "최대 10글자 입니다.",
      },
    },
    text: {
      required: "소개말은 필수입니다.",
      maxLength: {
        value: 100,
        message: "100자 이내로 작성해 주세요.",
      },
    },
    startDate: {
      required: "시작 날짜는 필수입니다.",
    },
    startTime: {
      required: "시작 시간은 필수입니다.",
    },
    usingTime: {
      required: "소요 시간을 입력해주세요.",
    },
    peoples: {
      required: "참여 인원수를 지정해주세요.",
    },
  };

  // 출발지 주소 좌표로 변경하기
  useEffect(() => {
    if (startAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(startAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coordinates = [
            Number(result[0].road_address.x),
            Number(result[0].road_address.y),
          ];
          setCoordinates(coordinates);
          console.log("Start Coordinates:", coordinates); // 출발지 좌표 출력

          setnewCCInfo((prevState) => ({
            ...prevState,
            startLoc: startAddress,
          }));
          startToggleBox();
        }
      });
    }
  }, [startAddress]);

  // 목적지 주소 좌표로 변경하기
  useEffect(() => {
    if (endAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(endAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coordinates = [
            Number(result[0].road_address.x),
            Number(result[0].road_address.y),
          ];
          setEndCoord(coordinates);
          console.log("End Coordinates:", coordinates); // 목적지 좌표 출력
          setnewCCInfo((prevState) => ({
            ...prevState,
            endLoc: endAddress,
          }));
          endToggleBox();
        }
      });
    }
  }, [endAddress]);

  //주소 검색하기
  useEffect(() => {
    // 스크립트가 이미 로드되어 있는지 확인
    if (!window.daum) {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      // script.onload = () => {
      //   openPostcode();
      // };
      document.head.appendChild(script);
    } else {
      // openPostcode();
    }
  }, []);

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        console.log(data.address); // 주소 데이터를 처리하는 코드를 작성합니다.
        setEndAddress(data.address);
      },
    }).open();
  };
  const startOpenPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        console.log(data.address); // 주소 데이터를 처리하는 코드를 작성합니다.
        setStartAddress(data.address);
      },
    }).open();
  };

  const checkDate = (date) => {
    if (
      new Date((date.startDate + "T" + date.startTime + ":00.000Z").getTime()) >
      new Date.now()
    ) {
      return false;
    } else handleChangeValue();
  };

  const handleTextFieldClick = () => {
    return openPostcode(); // TextFieldLine 클릭 시 주소 입력 창 열기
  };
  const starthandleTextFieldClick = () => {
    startOpenPostcode(); // TextFieldLine 클릭 시 주소 입력 창 열기
  };

  return (
    <>
      <div className="bg-white px-12 border-[1px] border-da-100 ">
        <form
          className="pt-[90px] pb-[100px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <form className="pt-[90px] pb-[100px]"> */}
          {/* 중복모임 체크 */}
          <div className="mt-4">
            <div className="text-center border rounded-md  mb-4 px-4 py-2">
              <span className="text-red-500">동일한 시간대</span>에 중복된
              모임이있는지
              <br />
              확인하셨나요?
            </div>
            {/* <div className="flex justify-around items-center mb-4 px-4 py-2 gap-7"> */}
            <CheckCircleButton
              handleCheckCircle={handleCheckCircle}
              checkCircle={checkCircle}
            />
          </div>
          <div>
            {/* 모임명 start */}
            <div className="flex flex-col mb-6 ">
              <label
                className={
                  checkCircle ? `w-[100px] mb-4` : `w-[100px] mb-4 text-da-500`
                }
                htmlFor="title"
              >
                모임명
              </label>
              <TextFieldLine
                {...register("name", validationRules.name)}
                required
                disabled={!checkCircle}
                id="name"
                name="name"
                label="모임명"
                fullWidth
                onChange={handleChangeValue}
                value={newCCInfo.name}
                // error={!!errors.name}
                // helperText={errors.name?.message}
              />
              {checkCircle && errors.name && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>
            {/* 모임명end */}
            {/* 소개말 */}
            <textarea
              {...register("text", validationRules.text)}
              placeholder="소개말을 입력해주세요."
              id="text"
              name="text"
              className={
                checkCircle
                  ? `bg-gray-200 rounded-md w-full h-[100px] text-justify px-4 py-2 border hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none`
                  : `bg-gray-200 rounded-md w-full h-[100px] text-justify px-4 py-2 border hover:border-ye-800 text-da-500`
              }
              value={newCCInfo.text}
              onChange={handleChangeValue}
              disabled={checkCircle ? false : true}
              // error={!!errors.text}
              // helperText={errors.text?.message}
              // className="bg-gray-200 rounded-md w-full h-[100px] text-justify mb-4 px-4 py-2"
            />
            {checkCircle && errors.text && (
              <div className="nanumBold text-red-500 text-xs mt-1">
                {errors.text.message}
              </div>
            )}
          </div>

          {/* 장소,시간설정 */}
          <div>
            <div>
              <div>
                <label
                  htmlFor="startPoint"
                  className={
                    checkCircle
                      ? `mb-2 flex gap-2 mt-4`
                      : `mb-2 flex gap-2 text-da-500 mt-4`
                  }
                >
                  {/* <label htmlFor="startPoint" className=" mb-4 flex gap-2 "> */}
                  <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                  출발지
                </label>
                <TextFieldLine
                  onChange={handleChangeValue}
                  onClick={starthandleTextFieldClick}
                  required
                  id="startLoc"
                  name="startLoc"
                  label="출발지"
                  fullWidth
                  readOnly
                  className="cursor-pointer"
                  disabled={!checkCircle}
                  // value={newCCInfo.startLoc}
                  value={startAddress}
                />
              </div>
              {/* <div className="relative h-[37px]">
                {checkCircle && (
                  <img
                    src="/images/plusglass_icon.svg"
                    alt="돋보기 아이콘"
                    className="block absolute left-[369px] bottom-[57px] cursor-pointer"
                    onClick={starthandleTextFieldClick}
                    disabled={!checkCircle}
                  />
                )}
              </div> */}
              {/* <img
                src="/images/plusglass_icon.svg"
                alt="돋보기 아이콘"
                className="block relative  left-[370px] bottom-[37px] cursor-pointer"
                onClick={starthandleTextFieldClick}
              /> */}
              {startshowBox && (
                <div className="bg-gray-100 px-4 py-2 mb-4 border-2 rounded-md z-10 startstart">
                  <Kakao_start_point
                    startCoord={coordinates && coordinates}
                    startToggleBox={startToggleBox}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <label
                  htmlFor="endPoint"
                  className={
                    checkCircle
                      ? `mb-2 flex gap-2 mt-4`
                      : `mb-2 flex gap-2 text-da-500 mt-4`
                  }
                >
                  {/* <label htmlFor="endPoint" className=" mb-4 flex gap-2 "> */}
                  <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                  목적지
                </label>

                <TextFieldLine
                  onClick={handleTextFieldClick}
                  onChange={handleChangeValue}
                  required
                  id="endLoc"
                  name="endLoc"
                  label="목적지"
                  fullWidth
                  // readOnly
                  className="cursor-pointer"
                  // value={newCCInfo.endLoc}
                  value={endAddress}
                  disabled={!checkCircle}
                />
              </div>
              {/* <div className="relative h-[37px]">
                {checkCircle && (
                  <img
                    src="/images/plusglass_icon.svg"
                    alt="돋보기 아이콘"
                    className="block absolute left-[369px] bottom-[
                      57px] cursor-pointer"
                    onClick={handleTextFieldClick}
                    disabled={!checkCircle}
                  />
                )}
              </div> */}
              {/* <img
                src="/images/plusglass_icon.svg"
                alt="돋보기 아이콘"
                className="block relative  left-[370px] bottom-[37px] cursor-pointer"
                // onClick={endToggleBox}
                onClick={handleTextFieldClick}
              /> */}
              {endshowBox && (
                <div className=" bg-gray-100 p-1  mb-4 border-2 rounded-md ">
                  <Kakao_point
                    endCoord={endCoord && endCoord}
                    endToggleBox={endToggleBox}
                    className="z-10"
                  />
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="startDate"
                className={
                  checkCircle
                    ? `mb-2 flex gap-2 mt-4`
                    : `mb-2 flex gap-2 text-da-500 mt-4`
                }
              >
                {/* <label htmlFor="startTime" className=" mb-4 flex gap-2 "> */}
                <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                시작 날짜
              </label>

              <TextFieldLine
                {...register("startDate", validationRules.startDate)}
                onChange={(e) => setStartDate(e.target.value)}
                required
                id="startDate"
                name="startDate"
                fullWidth
                type="date"
                // readOnly={false} // readOnly 속성 제거 또는 조건적으로 false 설정
                readOnly // readOnly 속성 제거 또는 조건적으로 false 설정
                className="cursor-pointer"
                disabled={!checkCircle} // 조건식을 명확하게
                value={newCCInfo.startDate}
                // error={!!errors.startDate}
                // helperText={errors.startDate?.message}
              />
              {checkCircle && errors.startDate && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.startDate.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="startTime"
                className={
                  checkCircle
                    ? `mb-2 flex gap-2 mt-4`
                    : `mb-2 flex gap-2 text-da-500 mt-4`
                }
              >
                {/* <label htmlFor="startTime" className=" mb-4 flex gap-2 "> */}
                <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                시작 시간
              </label>

              <input
                {...register("startTime", validationRules.startTime)}
                required
                // type="datetime-local"
                type="time"
                id="startTime"
                name="startTime"
                className={
                  checkCircle
                    ? `w-full mb-2 py-2 px-4 border rounded-md `
                    : `w-full mb-2 py-2 px-4 border rounded-md text-da-500`
                }
                onChange={(e) => setStartTime(e.target.value)}
                disabled={!checkCircle}
                value={newCCInfo.startTime}
                // error={!!errors.startTime}
                // helperText={errors.startTime?.message}
              />
              {checkCircle && errors.startTime && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.startTime.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="usingTime"
                className={
                  checkCircle ? `block mb-2` : `block mb-4 text-da-500`
                }
              >
                {/* <label htmlFor="usingTime" className="block mb-4"> */}
                <h4 className="flex gap-2">
                  <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                  소요 시간
                </h4>
              </label>

              <select
                {...register("usingTime", validationRules.usingTime)}
                id="usingTime"
                name="usingTime"
                // className={
                //   checkCircle
                //     ? `w-full mb-6 py-2 px-4 border rounded-md`
                //     : `w-full mb-6 py-2 px-4 border rounded-md text-da-500`
                // }
                className="w-full border px-4 py- 2 mb-4 rounded-md block h-[60px] cursor-pointer border-[#e0e3e7] hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none"
                disabled={!checkCircle}
                // onChange={(e) => setUsingTime(e.target.value)}
                onChange={handleChangeValue}
                value={newCCInfo.usingTime}
                error={!!errors.usingTime}
                helperText={errors.usingTime?.message}
              >
                <option value="">소요 시간을 선택해주세요.</option>
                {usingTimeOptions.map((option) => (
                  <option key={option.key} value={option.value * 1000 * 60}>
                    {option.display}
                  </option>
                ))}
              </select>
              {checkCircle && errors.usingTime && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.usingTime.message}
                </div>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="peoples"
                className={
                  checkCircle ? `block mb-4` : `block mb-4 text-da-500 `
                }
              >
                <h4 className="flex mb-3 gap-2 ">
                  <img src="/images/people_icon.svg" alt="사람 아이콘" />
                  참여 인원 수
                </h4>
              </label>

              <select
                {...register("peoples", validationRules.peoples)}
                id="peoples"
                name="peoples"
                className="w-full px-4 py-2 mb-10 border rounded-md  h-[60px] cursor-pointer border-[#e0e3e7] hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none"
                disabled={!checkCircle}
                // className={
                //   checkCircle
                //     ? `w-full mb-6 py-2 px-4 border rounded-md`
                //     : `w-full mb-6 py-2 px-4 border rounded-md text-da-500`
                // }
                onChange={handleChangeValue}
                // onChange={(e) => setPeoples(e.target.value)}
                value={newCCInfo.peoples}
                // error={!!errors.peoples}
                // helperText={errors.peoples?.message}
              >
                <option value="">참여 인원수를 선택해주세요.</option>
                {peoplesOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
              {checkCircle && errors.peoples && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.peoples.message}
                </div>
              )}
            </div>
          </div>
          {/* 취소,등록버튼 */}
          <div
            className="flex justify-center items-center gap-10"
            disabled={!checkCircle}
          >
            <Link to="/circles">
              <ButtonBl>취소</ButtonBl>
              {/* <button>취소</button> */}
            </Link>
            {/* <Link to="/circles"> */}
            <ButtonYe type="submit" disabled={checkCircle ? false : true}>
              등록
            </ButtonYe>
            {/* <ButtonYe type="submit">등록</ButtonYe> */}
            {/* </Link> */}
          </div>
        </form>
      </div>
      {/* 중복모임 확인 안했을시 돋보기클릭 , 등록버튼 잠궈야함 */}
    </>
  );
}

export default CreateCCPage;
