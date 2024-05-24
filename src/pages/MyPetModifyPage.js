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
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FileUploadOne from "../components/FileUploadOne";
import FileFetchOne from "../components/FileFetchOne";
import {
  pBreed,
  pModAge,
  pModBreed,
  pModChar,
  pModName,
} from "../utils/validation";
import axiosInstance from "../utils/axios";

function MyPetModifyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const [gender, setGender] = useState(""); //남자인지 여자인지
  const [neuter, setNeuter] = useState(); //중성화 여부
  const [vaccine, setVaccine] = useState(); //기본접종 여부
  const [rabies, setRabies] = useState(); //광견병 여부
  const [petData, setPetData] = useState(); //pet데이터
  const [petName, setPetName] = useState(); //이름
  const [petBreed, setPetBreed] = useState(); //견종
  const [petAge, setPetAge] = useState(); //나이
  const [petNeuter, setPetNeuter] = useState(); //중성화
  const [petChar, setPetChar] = useState(); //성격
  const navigate = useNavigate();
  const petid = useParams();

  // useEffect(() => {
  //   async function getData() {
  //     const res = await axiosInstance.get(`/pet/modify/${petid.petid}`);
  //     setPetData(res.data.pet);
  //     setPetName(res.data.pet.pName);
  //     setPetBreed(res.data.pet.pBreed);
  //     setPetAge(res.data.pet.pAge);
  //     setPetNeuter(res.data.pet.neuter);
  //     setPetChar(res.data.pet.pCharOne);
  //   }
  //   getData();
  // }, [petid]);
  // console.log(petData);

  // 로그인된 유저 _id값 가져오는과정
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  const pets = useSelector((state) => {
    return state;
  });
  console.log("pets", pets);
  // console.log(loginState);

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
    $("html, body").scrollTop("0");
  }

  function onSubmit(body) {
    console.log(body);
  }

  function handleValue(e) {
    setPetName(e.target.value);
  }
  function handleBreed(e) {
    setPetBreed(e.target.value);
  }
  function handleAge(e) {
    const age = e.target.value;
    if (age < 0) {
      setPetAge(0);
    } else {
      setPetAge(age);
    }
  }
  function handleChar(e) {
    setPetChar(e.target.value);
  }
  // useEffect(async () => {
  //   // const res = await axiosInstance.get(`pet/modify/${petId}`);
  //   // console.log(res.data);
  // }, [petId]);

  return (
    <div
      className="bg-white w-[500px] border border-da-100 "
      style={{ height: "calc(100% - 65px)" }}
    >
      {/* subheader start */}
      <div className="subHeader bg-ye-600 w-[500px] top-0 text-center h-[265px] border border-da-100">
        <div className="h-[50px] border-b-2 flex  justify-between items-center">
          <h2>
            <img
              src="/images/backicon.svg"
              alt=""
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer"
            />
          </h2>

          <h2 className="text-[20px]">프로필 수정</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>

        {/* name start */}
        {/* <div className="grid gap-2 pt-[15px]">
          <img
            src="/images/dog1.svg"
            alt=""
            className="w-[100px] h-[100px] rounded-full m-auto my-[5px]"
          />

          <div className="flex justify-center items-center gap-1">
            <div className="nanumBold">뚜비</div>
            <div>
              <i class="fa-solid fa-mars"></i>
            </div>
          </div> */}

        {/* button start */}
        {/* <div className="flex justify-center items-center">
            <button className="w-auto border border-da-300 px-[15px] rounded-xl">
              <span className="inline-block text-[13px] mr-[3px]">
                사진변경
              </span>
              <img
                src="/images/plus.svg"
                className="inline-block align-middle w-[14px] h-[14px]"
              />
            </button>
          </div>
        </div> */}
        <FileFetchOne />
      </div>

      <div className="w-[400px] mx-auto py-[50px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-6">
            <label className={`w-[100px] nanumBold`} htmlFor="pName">
              이름
            </label>
            <div>
              <TextFieldLine
                onInput={handleValue}
                value={petName}
                id="pName"
                // label={petName}
                fullWidth
                {...register("pName", pModName)}
              />
              {errors.pName && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.pName.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className={`w-[100px] nanumBold`} htmlFor="pBreed">
              견종
            </label>
            <div>
              <TextFieldLine
                onInput={handleBreed}
                required={false}
                value={petBreed}
                id="pBreed"
                fullWidth
                {...register("pBreed", pModBreed)}
              />
              {errors.pBreed && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.pBreed.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className={`w-[100px] nanumBold`} htmlFor="petAge">
              나이
            </label>
            <div>
              <TextFieldLine
                onInput={handleAge}
                value={petAge}
                type="number"
                id="petAge"
                fullWidth
                {...register("pAge", pModAge)}
              />
              {errors.pAge && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.pAge.message}
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex gap-5 items-center mb-6">
            <div className="nanumBold">성별</div>
            <PetGenderButton
              register={register}
              handleGender={handleGender}
              gender={gender}
            />
          </div> */}
          <div>
            <div className="mb-6">
              <div className="mb-2 nanumBold">중성화</div>
              <NeuterButton
                petNeuter={petNeuter}
                register={register}
                neuter={neuter}
                handleNeuter={handleNeuter}
              />
            </div>
            <div className="mb-6">
              <div className="mb-2 nanumBold">기본 접종</div>
              <VaccineButton
                register={register}
                vaccine={vaccine}
                handleVaccine={handleVaccine}
              />
            </div>
            <div className="mb-6">
              <div className="mb-2 nanumBold">광견병</div>
              <RabiesButton
                register={register}
                handleRabies={handleRabies}
                rabies={rabies}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className={`w-[110px] nanumBold`} htmlFor="petEtc">
              우리 아이 성격
            </label>
            <div>
              <TextFieldLine
                value={petChar}
                onInput={handleChar}
                id="petEtc"
                fullWidth
                {...register("pChar", pModChar)}
              />
              {errors.pChar && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.pChar.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-3 mb-28">
            <Link to={`/mypet/${loginState}`}>
              <ButtonBl onClick={handlePage}>취소</ButtonBl>
            </Link>

            <ButtonYe type="submit">수정완료</ButtonYe>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  );
}

export default MyPetModifyPage;
