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
import Dropzone from "react-dropzone";
import FileUploadAddPet from "../components/FileUploadAddPet";
function AddMyPetPage() {
  const {
    register, //데이터 담을때
    handleSubmit, //form데이터 전송할때
    formState: { errors }, //에러 메세지 나오게 할때
    reset, //input 초기화할때
    watch, //비밀번호 재 확인할때 같은지 확인
  } = useForm({ mode: "onChange" }); //체인지 될때 위의 값 확인
  const [hasDog, setHasDog] = useState(true); //반려동물 있는지 없는지
  const [gender, setGender] = useState("male"); //남자인지 여자인지
  const [neuter, setNeuter] = useState(false); //중성화 여부
  const [vaccine, setVaccine] = useState(false); //기본접종 여부
  const [rabies, setRabies] = useState(false); //광견병 여부
  const [pageMove, setPageMove] = useState(true);
  const [image, setImage] = useState(""); //반려견 이미지

  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  const navigate = useNavigate();
  const [addPetInfo, setAddPetInfo] = useState({
    index: 0,
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

  function handleChangeValue(e) {
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
      ...addPetInfo,
      image: image,
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

  function handleImage(newImages) {
    setAddPetInfo((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  }

  function handleChange() {}

  const validationRules = {
    pName: {
      required: "반려견 이름은 필수입니다.",
      maxLength: {
        value: 8,
        message: "8자 이내로 입력해주세요",
      },
    },
    pBreed: {
      required: "견종은 필수입니다.",
      maxLength: {
        value: 14,
        message: "14자 이내로 입력해주세요",
      },
    },
    pCharOne: {
      required: "성격은 필수입니다.",
      maxLength: {
        value: 30,
        message: "더이상 입력할 수 없습니다.",
      },
    },
    pAge: {
      required: "나이는 필수입니다.",
      maxLength: {
        value: 2,
        message: "적절한 나이를 입력해주세요",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="bg-white w-[500px] border"
        style={{ height: "calc(100% - 65px)" }}
      >
        {/* subheader start */}
        <div className="subHeader bg-ye-600 w-full h-[250px] top-0 text-center border-b">
          <div className="h-[50px] border-b flex  justify-between items-center">
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
          <div className="grid gap-[15px] pt-[30px]">
            <FileUploadAddPet
              onImageChange={handleImage}
              setImage={setImage}
              image={image}
            />
          </div>
        </div>
        {/* 입력창부분 실질적으로 시작 */}
        <div className="w-[400px] mx-auto py-[50px]">
          <div className="flex flex-col gap-2 mb-7">
            <label className="w-[100px] nanumBold" htmlFor="petName">
              이름
            </label>
            <div>
              {/* 이름 입력 필드 */}
              <TextFieldLine
                {...register("pName", validationRules.pName)}
                required
                id="petName"
                label="이름"
                fullWidth
                name="pName"
                onChange={handleChangeValue}
                value={addPetInfo.pName}
                error={!!errors.pName}
                helperText={errors.pName?.message}
              />
            </div>
          </div>
          {/* 견종시작 */}
          <div className="flex flex-col gap-2 mb-7">
            <label className="w-[100px] nanumBold" htmlFor="breed">
              견종
            </label>
            <div>
              <TextFieldLine
                onChange={handleChangeValue}
                required
                id="breed"
                label="견종"
                name="pBreed"
                fullWidth
                value={addPetInfo.pBreed}
                error={!!errors.pBreed} // 오류 상태를 pBreed의 유무로 결정
                helperText={errors.pBreed?.message} // pBreed 관련 오류 메시지를 표시
              />
            </div>
          </div>
          {/* 나이 시작 */}
          <div className="flex flex-col gap-2 mb-7">
            <label className="w-[100px] nanumBold" htmlFor="petAge">
              나이
            </label>
            <div>
              <TextFieldLine
                onChange={handleChangeValue}
                required
                id="petAge"
                label="나이"
                name="pAge"
                fullWidth
                value={addPetInfo.pAge}
                error={!!errors.pAge} // 오류 상태를 pAge의 유무로 결정
                helperText={errors.pAge?.message} // pAge 관련 오류 메시지를 표시
              />
            </div>
          </div>

          {/* 성별시작 */}
          <div className="flex gap-5 items-center mb-7">
            <div className="nanumBold">성별</div>
            <PetGenderButton
              register={register}
              handleGender={handleGender}
              gender={gender}
              onChange={handleChangeValue}
              value={addPetInfo.pGender}
            />
          </div>
          <div>
            {/* 중성화버튼 시작 */}
            <div className="mb-8">
              <div className="mb-2 nanumBold">중성화</div>
              <NeuterButton
                handleChange={handleChange}
                register={register}
                neuter={neuter}
                handleNeuter={handleNeuter}
                onChange={handleChangeValue}
                value={addPetInfo.neuter}
              />
            </div>
            {/* 백신버튼시작 */}
            <div className="mb-8">
              <div className="mb-2 nanumBold">기본 접종</div>
              <VaccineButton
                handleChange={handleChange}
                register={register}
                vaccine={vaccine}
                handleVaccine={handleVaccine}
                onChange={handleChangeValue}
                value={addPetInfo.vaccine}
              />
            </div>
            {/* 광견병접종버튼시작 */}
            <div className="mb-8">
              <div className="mb-2 nanumBold">광견병</div>
              <RabiesButton
                handleChange={handleChange}
                register={register}
                handleRabies={handleRabies}
                rabies={rabies}
                onChange={handleChangeValue}
                value={addPetInfo.vaccine}
              />
            </div>
          </div>
          {/* 성격입력버튼시작 */}
          <div className="flex flex-col gap-2 mb-12">
            <label className="w-[110px] nanumBold" htmlFor="petEtc">
              우리 아이 성격
            </label>
            <div>
              <TextFieldLine
                {...register("pCharOne", validationRules.pCharOne)}
                required
                id="petEtc"
                label="성격"
                fullWidth
                name="pCharOne"
                onChange={handleChangeValue}
                value={addPetInfo.pCharOne}
                error={!!errors.pCharOne}
                helperText={errors.pCharOne?.message}
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
            <ButtonYe type="submit">등록</ButtonYe>
          </div>
        </div>
        <Navbar />
      </div>
    </form>
  );
}

export default AddMyPetPage;
