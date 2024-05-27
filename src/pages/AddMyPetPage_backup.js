import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import PetGenderButton from "../components/PetGenderButton";
import TextFieldLine from "../components/TextField";
import NeuterButton from "../components/NeuterButton";
import VaccineButton from "../components/VaccineButton";
import RabiesButton from "../components/RabiesButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";
import FileUploadOne from "../components/FileUploadOne";
import Dropzone from "react-dropzone";
function AddMyPetPage() {
  const {
    register, //데이터 담을때
    handleSubmit, //form데이터 전송할때
    formState: { errors }, //에러 메세지 나오게 할때
    reset, //input 초기화할때
    watch, //비밀번호 재 확인할때 같은지 확인
  } = useForm({ mode: "onChange" }); //체인지 될때 위게 값 확인
  const [hasDog, setHasDog] = useState(true); //반려동물 있는지 없는지
  const [gender, setGender] = useState(""); //남자인지 여자인지
  const [neuter, setNeuter] = useState(false); //중성화 여부
  const [vaccine, setVaccine] = useState(false); //기본접종 여부
  const [rabies, setRabies] = useState(false); //광견병 여부
  const [pageMove, setPageMove] = useState(true);
  const [image, setImage] = useState(""); //반려견 이미지
  // //로그인 유저 _id값 긁어오기
  // const state = useSelector((state) => {
  //   return state.user.userData.user;
  // });
  // 로그인된 유저 _id값 가져오는과정
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  // console.log(loginState);
  const navigate = useNavigate();

  const [addPetInfo, setAddPetInfo] = useState({
    index: 0,
    // image: "",
    pName: "",
    pGender: "",
    pBreed: "",
    pCharOne: "",
    pAge: "",
    vaccine: false,
    neuter: false,
    rabies: false,
  });

  //gpt 추가 ---- 버튼 눌렀을 때 set으로 랜더링 및 데이터 변화값 반영
  useEffect(() => {
    setAddPetInfo((prevState) => ({
      ...prevState,
      pGender: gender,
      neuter: neuter,
      vaccine: vaccine,
      rabies: rabies,
    }));
  }, [gender, neuter, vaccine, rabies]);

  function handleRabies(result) {
    setRabies(result);
  }

  function handleGender(result) {
    setGender(result);
  }

  function handleNeuter(result) {
    setNeuter(result);
  }

  function handleVaccine(result) {
    setVaccine(result);
  }

  function handlePage() {
    setPageMove(!pageMove);
    $("html, body").scrollTop("0");
  }

  function handleImg(result) {
    setImage(result);
  }

  // function onSubmit(body) {
  //   alert("전송");
  // }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setAddPetInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function onSubmit() {
    // e.preventDefault();
    const body = {
      // pAge,pCharOne,pBreed,pName, - 변수 선언 해줘야함
      // gender: gender,
      // neuter: neuter,
      // vaccine: vaccine,
      // rabies: rabies,
      // index: 0,
      ...addPetInfo,
    };

    console.log("Sending data:", body); // 보내는 데이터를 콘솔에 출력

    try {
      const res = await axiosInstance.post(`/pet/${loginState}`, body);
      console.log(res.data);
      navigate(`/mypet/${loginState}`);
    } catch (error) {
      console.log("Error message:", error.message); // 오류 메시지 콘솔에 출력
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="bg-white w-[500px] border border-da-100 "
        style={{ height: "calc(100% - 65px)" }}
      >
        {/* subheader start */}
        <div className="subHeader bg-ye-600 w-[500px] h-[265px] top-0 text-center border border-da-100">
          <div className="h-[50px] border-b-2 flex  justify-between items-center">
            <Link to="/mypet/:userid">
              <h2>
                <img src="/images/backicon.svg" alt="" />
              </h2>
            </Link>
            <h2 className="text-[20px]">반려견 추가</h2>
            <h2 className="invisible">
              <img src="/images/backicon.svg" alt="" />
            </h2>
          </div>
          {/* name start */}
          {/* <form> */}

          <div className="grid gap-[15px] pt-[30px]">
            <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
              <img
                src="/images/camera1.svg"
                className="w-[60px] h-[60px] m-auto"
              />
            </div>
            {/* button start */}

            <div className="flex justify-center items-center">
              {/* <button className="w-auto border border-da-300 px-[15px] rounded-xl"> */}
              <span className="inline-block text-[13px] mr-[3px]">
                사진추가
              </span>
              <img
                src="/images/plus.svg"
                className="inline-block align-middle w-[14px] h-[14px]"
              />
              {/* </button> */}
            </div>
          </div>
          {/* </form> */}
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* 입력창부분 실질적으로 시작 */}
        <div className="w-[400px] mx-auto py-[50px]">
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px] nanumBold" htmlFor="petName">
              이름
            </label>
            <div>
              <TextFieldLine
                required
                id="petName"
                label="이름"
                fullWidth
                name="pName"
                onChange={handleChange}
                value={addPetInfo.pName}
              />
            </div>
          </div>
          {/* 견종시작 */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px] nanumBold" htmlFor="breed">
              견종
            </label>
            <div>
              <TextFieldLine
                onChange={handleChange}
                required
                id="breed"
                label="견종"
                name="pBreed"
                fullWidth
                value={addPetInfo.pBreed}
              />
            </div>
          </div>
          {/* 나이 시작 */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[100px] nanumBold" htmlFor="petAge">
              나이
            </label>
            <div>
              <TextFieldLine
                onChange={handleChange}
                required
                id="petAge"
                label="나이"
                fullWidth
                name="pAge"
                value={addPetInfo.pAge}
              />
            </div>
          </div>
          {/* 성별시작 */}
          <div className="flex gap-5 items-center mb-6">
            <div className="nanumBold">성별</div>
            <PetGenderButton
              register={register}
              handleGender={handleGender}
              gender={gender}
              onChange={handleChange}
              value={addPetInfo.pGender}
            />
          </div>
          <div>
            {/* 중성화버튼 시작 */}
            <div className="mb-6">
              <div className="mb-2 nanumBold">중성화</div>
              <NeuterButton
                register={register}
                neuter={neuter}
                handleNeuter={handleNeuter}
                onChange={handleChange}
                value={addPetInfo.neuter}
              />
            </div>
            {/* 백신버튼시작 */}
            <div className="mb-6">
              <div className="mb-2 nanumBold">기본 접종</div>
              <VaccineButton
                register={register}
                vaccine={vaccine}
                handleVaccine={handleVaccine}
                onChange={handleChange}
                value={addPetInfo.vaccine}
              />
            </div>
            {/* 광견병접종버튼시작 */}
            <div className="mb-6">
              <div className="mb-2 nanumBold">광견병</div>
              <RabiesButton
                register={register}
                handleRabies={handleRabies}
                rabies={rabies}
                onChange={handleChange}
                value={addPetInfo.vaccine}
              />
            </div>
          </div>
          {/* 성격입력버튼시작 */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="w-[110px] nanumBold" htmlFor="petEtc">
              우리 아이 성격
            </label>
            <div>
              <TextFieldLine
                onChange={handleChange}
                required
                id="petEtc"
                label="성격"
                fullWidth
                name="pCharOne"
                value={addPetInfo.pCharOne}
              />
            </div>
          </div>
          {/* 취소+등록버튼 묶음 시작 */}
          <div className="flex justify-center gap-3 mb-28">
            {/* 취소버튼 */}
            <Link to={`/mypet/${loginState}`}>
              <ButtonBl onClick={handlePage}>취소</ButtonBl>
            </Link>
            {/* 등록버튼시작 */}
            {/* <Link to={`/mypet/${loginState}`}> */}
            <ButtonYe type="submit">등록</ButtonYe>
            {/* </Link> */}
          </div>
        </div>
        {/* </form> */}
        <Navbar />
      </div>
    </form>
  );
}

export default AddMyPetPage;
