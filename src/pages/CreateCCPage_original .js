import React, { useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import { Link, useNavigate } from "react-router-dom";
import TextFieldLine from "../components/TextField";
import CheckCircleButton from "../components/CheckCircleButton";
// import axiosInstance from "../utils/axios";
import { createCircle } from "../store/thunkFunctions";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { Box, FormControl, MenuItem, Select } from "@mui/material";
// import SelectButton from "../components/SelectButton";
// import { SelectUnstyled, OptionUnstyled } from "@mui/base";
// import { styled } from "@mui/system";

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

  // 출발지 토글박스
  const startToggleBox = () => {
    setStartshowBox(!startshowBox);
  };

  // 목적지 토글박스
  const endToggleBox = () => {
    setEndshowBox(!endshowBox);
  };

  // // const handleClick = (button) => {
  // //   setSelectButton(button);
  // // };

  // 변수 저장소
  // const [newCircle, setNewCircle] = useState({
  //   title: "",
  //   content: "",
  //   // startTime: "",
  //   usingTime: 1,
  //   max: 1,
  // });

  // 중복된모임체크
  function handleCheckCircle(result) {
    setCheckCircle(result);
  }

  // useNavigate
  const navigate = useNavigate();

  // onChange thunkfunction하느라 주석
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   console.log(value, name);
  //   setNewCircle((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // }

  // thunkFuntion버전
  async function onSubmit({
    title,
    content,
    startPoint,
    endPoint,
    startDate,
    startTime,
    usingTime,
    max,
  }) {
    const body = {
      title,
      content,
      startPoint,
      endPoint,
      startDate,
      startTime,
      usingTime,
      max,
    };

    // dispatch(createCircle(body));
    // console.log(body);

    // reset();

    try {
      const res = await dispatch(createCircle(body));
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
      console.log("모임생성 실패", error);

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

  const circleTitle = {
    required: {
      value: true,
      message: "모임명은 필수 입니다.",
    },
    minLength: {
      value: 4,
      message: "최소 4글자 입니다.",
    },
  };
  const circleContent = {
    required: {
      value: true,
      message: "소개명은 필수입니다.",
    },
    minLength: {
      value: 4,
      message: "최소 4글자 입니다.",
    },
  };
  const circleStartDate = {
    required: {
      value: true,
      message: "시작날짜는 필수입니다.",
    },
  };
  const circleStartTime = {
    required: {
      value: true,
      message: "시작시간은 필수입니다.",
    },
  };
  const circleUsingTime = {
    required: {
      value: true,
    },
  };
  const circleMax = {
    required: {
      value: true,
    },
  };

  // handleSubmit navigate 버전
  // async function onSubmit() {
  //   alert("ddd");
  //   const body = {
  //     ...newCircle,
  //   };
  //   try {
  //     await axiosInstance.post("/workingCircle", body);
  //     navigate("/circles");
  //   } catch (error) {
  //     console.log("handleSubmit error");
  //   }
  // }

  // no navigate 버전
  // async function handleButtonClick() {
  //   const body = { ...newCircle };
  //   try {
  //     await axiosInstance.post("/circleRouter", body);
  //     // 원하는 경로로 이동
  //     window.location.href = "/circles";
  //   } catch (error) {
  //     console.log("handleButtonClick error");
  //   }
  // }

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
          {/* 모임명 */}
          <div>
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
                required
                disabled={checkCircle ? false : true}
                id="title"
                name="title"
                label="모임명"
                fullWidth
                // onChange={handleChange}
                // value={newCircle.title}
                {...register("title", circleTitle)}
              />
              {errors.title && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* 소개말 */}
            <textarea
              // value={newCircle.content}
              // onChange={handleChange}
              {...register("content", circleContent)}
              placeholder="소개말을 입력해주세요."
              id="content"
              name="content"
              className={
                checkCircle
                  ? `bg-gray-200 rounded-md w-full h-[100px] text-justify mb-3 px-4 py-2 border hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none`
                  : `bg-gray-200 rounded-md w-full h-[100px] text-justify mb-3 px-4 py-2 border hover:border-ye-800 text-da-500`
              }
              // className="bg-gray-200 rounded-md w-full h-[100px] text-justify mb-4 px-4 py-2"
              disabled={checkCircle ? false : true}
            />
            {errors.content && (
              <div className="nanumBold text-red-500 text-xs mb-4 ">
                {errors.content.message}
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
                      ? `mb-4 flex gap-2`
                      : `mb-4 flex gap-2 text-da-500`
                  }
                >
                  {/* <label htmlFor="startPoint" className=" mb-4 flex gap-2 "> */}
                  <img src="/images/plag_icon.svg" alt="깃발아이콘" />
                  출발지
                </label>
                <TextFieldLine
                  required
                  id="startPoint"
                  label="출발지"
                  fullWidth
                  type="String"
                  disabled
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <img
                src="/images/plusglass_icon.svg"
                alt="돋보기아이콘"
                className="block relative  left-[3790px] bottom-[37px] cursor-pointer"
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
                  required
                  id="endPoint"
                  label={"목적지"}
                  fullWidth
                  type="String"
                  disabled
                  onClick={endToggleBox}
                  className="cursor-pointer"
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
                required
                id="startDate"
                name="startDate"
                // label="시작 시간"
                fullWidth
                type="Date"
                readOnly
                // value={startTime}
                // onChange={handleChange}
                className="cursor-pointer"
                disabled={checkCircle ? false : true}
                {...register("startDate", circleStartDate)}
              />
              {errors.startDate && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.startDate.message}
                </div>
              )}
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
              <TextFieldLine
                required
                id="startTime"
                name="startTime"
                // label="시작 시간"
                fullWidth
                type="Time"
                readOnly
                // value={startTime}
                // onChange={handleChange}
                className="cursor-pointer"
                disabled={checkCircle ? false : true}
                {...register("startTime", circleStartTime)}
              />
              {errors.startTime && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.startTime.message}
                </div>
              )}
            </div>

            <div className="mb-6">
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
                name="usingTime"
                id="usingTime"
                className="w-full border px-4 py- 2 mb-4 rounded-md block h-[60px] cursor-pointer border-[#e0e3e7] hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none"
                disabled={checkCircle ? false : true}
                // onChange={handleChange}
                // value={newCircle.usingTime}
                {...register("usingTime", circleUsingTime)}
              >
                {usingTime.map((item) => {
                  return (
                    <option value={item.value} key={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <CustomSelectButton id="usingTime">소요 시간</CustomSelectButton>
            <CustomSelect
              labelId="usingTime"
              id="usingTime"
              value={usingTime}
              onChange={handleUsingTimeChange}
            >
              <CustomOption value={30}>30분</CustomOption>
              <CustomOption value={45}>45분</CustomOption>
              <CustomOption value={60}>1시간</CustomOption>
              <CustomOption value={90}>1시간 30분</CustomOption>
              <CustomOption value={105}>1시간 45분</CustomOption>
              <CustomOption value={120}>2시간</CustomOption>
            </CustomSelect> */}

            <div>
              <label
                htmlFor="max"
                className={
                  checkCircle ? `block mb-4` : `block mb-4 text-da-500`
                }
              >
                <h4 className="flex mb-3 gap-2">
                  <img src="/images/people_icon.svg" alt="사람 아이콘" />
                  인원수
                </h4>
              </label>
              <select
                name="max"
                id="max"
                className="w-full px-4 py-2 mb-10 border rounded-md  h-[60px] cursor-pointer border-[#e0e3e7] hover:border-ye-800 focus:border-ye-600 focus:border-2 outline-none"
                disabled={checkCircle ? false : true}
                // value={newCircle.max}
                // onChange={handleChange}
                {...register("max", circleMax)}
              >
                {max.map((item, idx) => {
                  return (
                    <option value={item.value} key={idx}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <Box sx={{ minWidth: 120 }} className="mb-6">
              <FormControl fullWidth>
                <SelectButton id="max">인원수</SelectButton>
                <Select
                  labelId="max"
                  id="max"
                  value={max}
                  label="인원수"
                  onChange={handleMaxChange}
                >
                  <MenuItem value={2}>2명</MenuItem>
                  <MenuItem value={3}>3명</MenuItem>
                  <MenuItem value={4}>4명</MenuItem>
                  <MenuItem value={5}>5명</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
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
