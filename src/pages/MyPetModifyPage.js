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
  console.log("재희님 왜그랬어요", user);
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

  //배열에 있는 데이터 filter로 가져옴
  useEffect(() => {
    const targetId = petid.petId;
    console.log("재희", targetId);
    // petArray가 비어 있지 않은지 확인 후 필터링
    if (user.user.petsData.length > 0) {
      const filteredData = user.user.petsData.filter(
        (item) => item._id === targetId
      );
      if (filteredData.length > 0) {
        const pet = filteredData[0];
        setPetData(pet);
        setNeuter(pet.neuter);
        setRabies(pet.rabies);
        setVaccine(pet.vaccine);
        setPetImage(pet.image);
      }
    }
  }, [pathname, user.user.petsData]);

  function handleChange(e) {
    const { id, value } = e.target;
    console.log("id&&&&&&&&&&&&", id, "petImage", petImage);
    console.log("neuter", neuter);
    setPetData((prevState) => {
      return {
        ...prevState,
        [id]: value,
        neuter: neuter,
        vaccine: vaccine,
        rabies: rabies,
        image: petImage,
      };
    });
  }

  console.log("petData///////", petData);
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

  // petImage 값을 변경하는 함수
  const handleImageChange = (newImageName) => {
    setPetImage(newImageName); // 새 이미지 명을 petImage로 업데이트
    // setPetData를 통해 petData 안에 image를 새로운 이미지로 업데이트
    setPetData((prevState) => ({
      ...prevState,
      image: newImageName,
    }));
  };

  // 새로 업데이트 된 petData를 서버로 전송
  async function onSubmit(data) {
    const body = {
      ...petData,
    };
    console.log("바디", body);
    try {
      const res = await axiosInstance.put("/pet/modify", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(-1);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAge(e) {
    const { id, value } = e.target;
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

        <FileFetchOne
          petData={petData}
          petImage={petImage}
          onImageChange={handleImageChange}
        />
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
