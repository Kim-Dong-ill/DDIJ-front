import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import PetGenderButton from "../components/PetGenderButton";
import TextFieldLine from "../components/TextField";
import NeuterButton from "../components/NeuterButton";
import VaccineButton from "../components/VaccineButton";
import RabiesButton from "../components/RabiesButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FileUploadOne from "../components/FileUploadOne";
import FileFetchOne from "../components/FileFetchOne";
import {
  pAge,
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

  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  const user = useSelector((state) => {
    return state;
  });
  // const [userData, setUserData] = useState();
  const [gender, setGender] = useState(""); //남자인지 여자인지
  const [neuter, setNeuter] = useState(); //중성화 여부
  const [vaccine, setVaccine] = useState(); //기본접종 여부
  const [rabies, setRabies] = useState(); //광견병 여부
  const [petName, setPetName] = useState(); //이름
  const [petBreed, setPetBreed] = useState(); //견종
  const [petAge, setPetAge] = useState(); //나이
  const [petNeuter, setPetNeuter] = useState(); //중성화
  const [petChar, setPetChar] = useState(); //성격
  // const [petArray, setPetArray] = useState([]); //반려견 배열
  const [petData, setPetData] = useState(); //pet데이터
  const navigate = useNavigate();
  const petid = useParams();
  const { pathname } = useLocation(); //page의 path 알려준다.
  const [ageValue, setAgeValue] = useState();
  const [petImage, setPetImage] = useState(); // FileFetchOne으로 전달
  console.log("이미지이미지이미지", petImage);
  //배열에 있는 데이터 filter로 가져옴
  useEffect(() => {
    const targetId = petid.petid;

    // petArray가 비어 있지 않은지 확인 후 필터링
    if (user.user.petsData.length > 0) {
      const filteredData = user.user.petsData.filter(
        (item) => item._id === targetId
      );
      console.log("filteredData", filteredData[0]);
      setPetData(filteredData[0]);
      setNeuter(filteredData[0].neuter);
      setRabies(filteredData[0].rabies);
      setVaccine(filteredData[0].vaccine);
      setPetImage(filteredData[0].image);
    }
  }, [pathname]);

  function handleChange(e) {
    const { id, value } = e.target;
    console.log("id", id, "value", value);
    console.log("neuter", neuter);
    setPetData((prevState) => {
      return {
        ...prevState,
        [id]: value,
        neuter: neuter,
        vaccine: vaccine,
        rabies: rabies,
      };
    });
  }
  console.log("petData", petData);
  function handleRabies(result) {
    setRabies(result);
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

  async function onSubmit(data) {
    const body = {
      ...petData,
    };
    console.log("바아아아아디", body);
    try {
      const res = await axiosInstance.put("/pet/modify", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAge(e) {
    const { id, value } = e.target;
    console.log("하태민", value);
    if (value < 0) {
      setAgeValue(0);
    } else {
      setAgeValue(value);
    }
  }
  useEffect(() => {
    const targets = [
      {
        target: {
          id: "pAge",
          value: parseInt(ageValue),
        },
      },
    ];
    handleChange(targets[0]);
  }, [ageValue]);

  return (
    <div
      className="bg-white w-[500px] border"
      style={{ height: "calc(100% - 65px)" }}
    >
      {/* subheader start */}
      <div className="subHeader bg-ye-600 w-full top-0 text-center h-[250px] border-b">
        <div className="h-[50px] border-b flex  justify-between items-center">
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
        <FileFetchOne petImage={petImage} />
        {/* // FileFetchOne으로 전달 */}
      </div>

      <div className="w-[400px] mx-auto py-[50px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-7">
            <label className={`w-[100px] nanumBold`} htmlFor="pName">
              이름
            </label>
            <div>
              <TextFieldLine
                // onInput={handleValue}
                onInput={handleChange}
                value={petData?.pName}
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
          <div className="flex flex-col gap-2 mb-7">
            <label className={`w-[100px] nanumBold`} htmlFor="pBreed">
              견종
            </label>
            <div>
              <TextFieldLine
                // onInput={handleBreed}
                onInput={handleChange}
                required={false}
                value={petData?.pBreed}
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
          <div className="flex flex-col gap-2 mb-7">
            <label className={`w-[100px] nanumBold`} htmlFor="petAge">
              나이
            </label>
            <div>
              <TextFieldLine
                // onInput={handleChange}
                onInput={handleAge}
                value={petData?.pAge}
                type="number"
                id="pAge"
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

          <div>
            <div className="mb-8">
              <div className="mb-3 nanumBold">중성화</div>
              <NeuterButton
                handleChange={handleChange}
                register={register}
                neuter={neuter}
                handleNeuter={handleNeuter}
              />
            </div>
            <div className="mb-8">
              <div className="mb-3 nanumBold">기본 접종</div>
              <VaccineButton
                handleChange={handleChange}
                register={register}
                vaccine={vaccine}
                handleVaccine={handleVaccine}
              />
            </div>
            <div className="mb-8">
              <div className="mb-3 nanumBold">광견병</div>
              <RabiesButton
                handleChange={handleChange}
                register={register}
                handleRabies={handleRabies}
                rabies={rabies}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-12">
            <label className={`w-[110px] nanumBold`} htmlFor="petEtc">
              우리 아이 성격
            </label>
            <div>
              <TextFieldLine
                value={petData?.pCharOne}
                // onInput={handleChar}
                onInput={handleChange}
                id="pCharOne"
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
