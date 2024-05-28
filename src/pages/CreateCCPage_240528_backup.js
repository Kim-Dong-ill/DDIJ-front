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
import axiosInstance from "../utils/axios";
import { format, formatDate } from "date-fns";
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

function CreateCCPage() {
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  // const loginLocation = useSelector((state) => {
  //   return state.user.userData.user.location.coordinates;
  // });
  // console.log(loginLocation);
  const [startTime, setStartTime] = useState("");
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
  } = useForm({ mode: "onChange" });
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

    startTime: "",
    usingTime: "",
    peoples: "",
  });

  useEffect(() => {
    setnewCCInfo((prevState) => ({
      ...prevState,
      startTime: startTime,
      usingTime: usingTime,
      peoples: peoples,
    }));
  }, [startTime, usingTime, peoples]);

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

  async function onSubmit() {
    const body = {
      ...newCCInfo,
      // startTime을 변경된 형식으로 변환하여 전송
      startTime:
        new Date().toISOString().slice(0, 10) +
        "T" +
        newCCInfo.startTime +
        ":00.000Z",
      // usingTime을 숫자로 변환하여 전송
      usingTime: parseInt(newCCInfo.usingTime),
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

      toast.error("🤷‍♂️🤷‍♂️🤷‍♂️ 모임생성을 실패했습니다.!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const validationRules = {
    name: {
      required: "모임명은 필수 입니다.",
      minLength: {
        value: 4,
        message: "최소 4글자 입니다.",
      },
    },
    text: {
      required: "소개말은 필수입니다.",
      minLength: {
        value: 4,
        message: "최소 4글자 입니다.",
      },
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
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                  ? `bg-gray-200 rounded-md w-full h-[100px] text-justify mb-3 px-4 py-2 border hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none`
                  : `bg-gray-200 rounded-md w-full h-[100px] text-justify mb-3 px-4 py-2 border hover:border-ye-800 text-da-500`
              }
              value={newCCInfo.text}
              onChange={handleChangeValue}
              disabled={checkCircle ? false : true}
              error={!!errors.text}
              helperText={errors.text?.message}
              // className="bg-gray-200 rounded-md w-full h-[100px] text-justify mb-4 px-4 py-2"
            />
          </div>

          {/* 장소,시간설정 */}
          <div>
            <div>
              <div>
                <label
                  htmlFor="startPoint"
                  className={
                    checkCircle
                      ? `mb-4 flex gap-2`
                      : `mb-4 flex gap-2 text-da-500`
                  }
                >
                  {/* <label htmlFor="startPoint" className=" mb-4 flex gap-2 "> */}
                  <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                  출발지
                </label>
                <TextFieldLine
                  onChange={handleChangeValue}
                  required
                  id="startLoc"
                  name="startLoc"
                  label="출발지"
                  fullWidth
                  // readOnly
                  className="cursor-pointer"
                  disabled
                  value={newCCInfo.startLoc}
                />
              </div>
              <img
                src="/images/plusglass_icon.svg"
                alt="돋보기 아이콘"
                className="block relative  left-[370px] bottom-[37px] cursor-pointer"
                onClick={startToggleBox}
              />
              {startshowBox && (
                <div className="bg-gray-100 px-4 py-2 mb-4 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <label
                  htmlFor="endPoint"
                  className={
                    checkCircle
                      ? `mb-4 flex gap-2`
                      : `mb-4 flex gap-2 text-da-500`
                  }
                >
                  {/* <label htmlFor="endPoint" className=" mb-4 flex gap-2 "> */}
                  <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                  목적지
                </label>

                <TextFieldLine
                  onChange={handleChangeValue}
                  required
                  id="endLoc"
                  name="endLoc"
                  label="목적지"
                  fullWidth
                  // readOnly
                  className="cursor-pointer"
                  disabled
                  value={newCCInfo.endLoc}
                />
              </div>
              <img
                src="/images/plusglass_icon.svg"
                alt="돋보기 아이콘"
                className="block relative  left-[370px] bottom-[37px] cursor-pointer"
                onClick={endToggleBox}
              />
              {endshowBox && (
                <div className="bg-gray-100 px-4 py-2 mb-4 border-2 rounded-md">
                  지도 창
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="startDate"
                className={
                  checkCircle
                    ? `mb-4 flex gap-2`
                    : `mb-4 flex gap-2 text-da-500`
                }
              >
                {/* <label htmlFor="startTime" className=" mb-4 flex gap-2 "> */}
                <img src="/images/clock_icon.svg" alt="시계 아이콘" />
                시작 날짜
              </label>

              <TextFieldLine
                onChange={handleChangeValue}
                required
                id="startDate"
                name="startDate"
                fullWidth
                type="date"
                readOnly
                className="cursor-pointer"
                disabled={checkCircle ? false : true}
                value={newCCInfo.startDate}
                {...register("startDate", validationRules.startDate)}
              />
              {/* {errors.startDate && (
              <div className="nanumBold text-red-500 text-xs mt-1">
                {errors.startDate.message}
              </div>
            )} */}
            </div>
            <div className="mb-6">
              <label
                htmlFor="startTime"
                className={
                  checkCircle
                    ? `mb-4 flex gap-2`
                    : `mb-4 flex gap-2 text-da-500`
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
                    ? `w-full mb-6 py-2 px-4 border rounded-md`
                    : `w-full mb-6 py-2 px-4 border rounded-md text-da-500`
                }
                onChange={(e) => setStartTime(e.target.value)}
                disabled={checkCircle ? false : true}
                value={newCCInfo.startTime}
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
              />
            </div>

            <div>
              <label
                htmlFor="usingTime"
                className={
                  checkCircle ? `block mb-4` : `block mb-4 text-da-500`
                }
              >
                {/* <label htmlFor="usingTime" className="block mb-4"> */}
                <h4 className="flex mb-3 gap-2">
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
                disabled={checkCircle ? false : true}
                // onChange={(e) => setUsingTime(e.target.value)}
                onChange={handleChangeValue}
                value={newCCInfo.usingTime}
                error={!!errors.usingTime}
                helperText={errors.usingTime?.message}
              >
                <option value="">소요 시간을 선택해주세요.</option>
                {usingTimeOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="peoples"
                className={
                  checkCircle ? `block mb-4` : `block mb-4 text-da-500`
                }
              >
                <h4 className="flex mb-3 gap-2">
                  <img src="/images/people_icon.svg" alt="사람 아이콘" />
                  참여 인원 수
                </h4>
              </label>

              <select
                {...register("peoples", validationRules.peoples)}
                id="peoples"
                name="peoples"
                className="w-full px-4 py-2 mb-10 border rounded-md  h-[60px] cursor-pointer border-[#e0e3e7] hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none"
                disabled={checkCircle ? false : true}
                // className={
                //   checkCircle
                //     ? `w-full mb-6 py-2 px-4 border rounded-md`
                //     : `w-full mb-6 py-2 px-4 border rounded-md text-da-500`
                // }
                onChange={handleChangeValue}
                // onChange={(e) => setPeoples(e.target.value)}
                value={newCCInfo.peoples}
                error={!!errors.peoples}
                helperText={errors.peoples?.message}
              >
                <option value="">참여 인원수를 선택해주세요.</option>
                {peoplesOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* 취소,등록버튼 */}
          <div
            className="flex justify-center items-center gap-10"
            disabled={checkCircle ? false : true}
          >
            <Link to="/circles">
              <ButtonBl>취소</ButtonBl>
              {/* <button>취소</button> */}
            </Link>
            {/* <Link to="/circles"> */}
            {/* <ButtonYe onClick={handleButtonClick}>등록</ButtonYe> */}
            <ButtonYe type="submit">등록</ButtonYe>
            {/* <button>등록</button> */}
            {/* </Link> */}
          </div>
        </form>
      </div>
      {/* 중복모임 확인 안했을시 돋보기클릭 , 등록버튼 잠궈야함 */}
    </>
  );
}

export default CreateCCPage;
