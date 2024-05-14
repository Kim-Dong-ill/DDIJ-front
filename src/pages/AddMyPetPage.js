import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import PetGenderButton from "../components/PetGenderButton";
import TextFieldLine from "../components/TextField";
import NeuterButton from "../components/NeuterButton";
import VaccineButton from "../components/VaccineButton";
import RabiesButton from "../components/RabiesButton";
import { Link } from "react-router-dom";
import $ from "jquery";

function AddMyPetPage() {
  const [hasDog, setHasDog] = useState(false); //반려동물 있는지 없는지
  const [gender, setGender] = useState(""); //남자인지 여자인지
  const [neuter, setNeuter] = useState(); //중성화 여부
  const [vaccine, setVaccine] = useState(); //기본접종 여부
  const [rabies, setRabies] = useState(); //광견병 여부
  const [pageMove, setPageMove] = useState(true);

  function handleHasDog(result) {
    setHasDog(result);
  }

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

  function onSubmit() {
    alert("전송");
  }
  return (
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
        <div className="grid gap-[15px] pt-[30px]">
          <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
            <img
              src="/images/camera1.svg"
              className="w-[60px] h-[60px] m-auto"
            />
          </div>

          {/* button start */}
          <div className="flex justify-center items-center">
            <button className="w-auto border border-da-300 px-[15px] rounded-xl">
              <span className="inline-block text-[13px] mr-[3px]">
                사진추가
              </span>
              <img
                src="/images/plus.svg"
                className="inline-block align-middle w-[14px] h-[14px]"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-[400px] mx-auto py-[50px]">
        <div className="flex flex-col gap-2 mb-6">
          <label className={`w-[100px] nanumBold`} htmlFor="petName">
            이름
          </label>
          <div>
            <TextFieldLine required id="petName" label="이름" fullWidth />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className={`w-[100px] nanumBold`} htmlFor="breed">
            견종
          </label>
          <div>
            <TextFieldLine required id="breed" label="견종" fullWidth />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className={`w-[100px] nanumBold`} htmlFor="petAge">
            나이
          </label>
          <div>
            <TextFieldLine required id="petAge" label="나이" fullWidth />
          </div>
        </div>
        <div className="flex gap-5 items-center mb-6">
          <div className="nanumBold">성별</div>
          <PetGenderButton handleGender={handleGender} gender={gender} />
        </div>
        <div>
          <div className="mb-6">
            <div className="mb-2 nanumBold">중성화</div>
            <NeuterButton neuter={neuter} handleNeuter={handleNeuter} />
          </div>
          <div className="mb-6">
            <div className="mb-2 nanumBold">기본 접종</div>
            <VaccineButton vaccine={vaccine} handleVaccine={handleVaccine} />
          </div>
          <div className="mb-6">
            <div className="mb-2 nanumBold">광견병</div>
            <RabiesButton handleRabies={handleRabies} rabies={rabies} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className={`w-[110px] nanumBold`} htmlFor="petEtc">
            우리 아이 성격
          </label>
          <div>
            <TextFieldLine required id="petEtc" label="성격" fullWidth />
          </div>
        </div>
        <div className="flex justify-center gap-3 mb-28">
          <Link to="/mypet/:userid">
            <ButtonBl onClick={handlePage}>취소</ButtonBl>
          </Link>
          <Link to="/mypet/:userid">
            <ButtonYe type="submit">수정완료</ButtonYe>
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default AddMyPetPage;
