import React, { useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import { NavLink } from "react-router-dom";
import PetGenderButton from "../components/PetGenderButton";
import HasDogButton from "../components/HasDogButton";
import $ from "jquery";
import TextFieldLine from "../components/TextField";
import { password } from "../utils/validation";
import RegisterName from "../components/RegisterName";
import RegisterEmail from "../components/RegisterEmail";
import RegisterNick from "../components/RegisterNick";
import RegisterAdr from "../components/RegisterAdr";
import RegisterPetName from "../components/RegisterPetName";
import RegisterPetBreed from "../components/RegisterPetBreed";
import RegisterPetAge from "../components/RegisterPetAge";
import RegisterPetVC from "../components/RegisterPetVC";
import RegisterPetEtc from "../components/RegisterPetEtc";

import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const [hasDog, setHasDog] = useState(false); //반려동물 있는지 없는지
  const [gender, setGender] = useState("male"); //남자인지 여자인지
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

  function onSubmit(body) {
    console.log(body);
  }

  return (
    <div className=" bg-white h-[100vh] flex flex-col items-center ">
      <div className=" w-[500px] fixed z-50 bg-white top-0 flex justify-center border-x">
        <div>
          <img src="./images/intro_logo_wh.svg" alt="" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white w-full border-x  mt-[326px] flex flex-col justify-center items-center "
      >
        {/* 유저 정보입력 */}
        <div className="w-[400px]" hidden={pageMove ? false : true}>
          <div className="my-2">반려동물이 있나요?</div>
          <HasDogButton
            reset={reset}
            handleHasDog={handleHasDog}
            hasDog={hasDog}
          />

          <RegisterName errors={errors} register={register} hasDog={hasDog} />

          <RegisterEmail errors={errors} register={register} hasDog={hasDog} />

          {/* <RegisterPW errors={errors} register={register} hasDog={hasDog} /> */}
          <div className="flex flex-col gap-2 mb-6">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
              htmlFor="password"
            >
              비밀번호
            </label>
            <div>
              <TextFieldLine
                type="password"
                required
                disabled={hasDog ? false : true}
                id="password"
                label="비밀번호"
                fullWidth
                {...register("password", password)}
              />
              {errors.password && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
              htmlFor="checkPassword"
            >
              비밀번호 확인
            </label>
            <div>
              <TextFieldLine
                type="password"
                required
                disabled={hasDog ? false : true}
                id="checkPassword"
                label="비밀번호 확인"
                fullWidth
                {...register("checkPassword", {
                  validate: (value) => {
                    return value === watch("uPassword") || "비밀번호 일치 안함";
                  },
                })}
              />
              {errors.checkPassword && (
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errors.checkPassword.message}
                </div>
              )}
            </div>
          </div>

          <RegisterNick errors={errors} register={register} hasDog={hasDog} />

          <RegisterAdr errors={errors} register={register} hasDog={hasDog} />
          <div className="flex justify-center gap-3 mb-28">
            <NavLink to="/intro">
              <ButtonBl>취소</ButtonBl>
            </NavLink>
            <ButtonYe type="button" onClick={handlePage}>
              다음
            </ButtonYe>
          </div>
        </div>

        {/* 강아지 정보 입력 */}
        <div className="w-[400px]" hidden={pageMove ? true : false}>
          <div>저에게 반려견을 소개해 주세요!</div>
          <div className="flex justify-center py-5">
            <div className="bg-ye-300 w-[200px] h-[200px] rounded-[25px] flex justify-center items-center">
              <div className="border border-black w-[150px] h-[150px] rounded-full flex justify-center items-center">
                <img
                  onClick={() => {
                    alert("a");
                  }}
                  src="./images/camera1.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <RegisterPetName
            errors={errors}
            register={register}
            hasDog={hasDog}
          />

          <RegisterPetBreed
            errors={errors}
            register={register}
            hasDog={hasDog}
          />

          <RegisterPetAge errors={errors} register={register} hasDog={hasDog} />

          <div className="flex gap-5 items-center mb-6">
            <div>성별</div>
            <PetGenderButton handleGender={handleGender} gender={gender} />
          </div>

          <RegisterPetVC
            neuter={neuter}
            vaccine={vaccine}
            rabies={rabies}
            handleNeuter={handleNeuter}
            handleVaccine={handleVaccine}
            handleRabies={handleRabies}
          />

          <RegisterPetEtc errors={errors} register={register} hasDog={hasDog} />

          <div className="flex justify-center gap-3 mb-28">
            <ButtonBl onClick={handlePage}>이전</ButtonBl>
            <ButtonYe type="submit">회원가입</ButtonYe>
          </div>
        </div>
      </form>

      <div className="border-x w-[500px] flex flex-col items-center fixed z-50 bottom-0 py-5 bg-white">
        <div className="flex gap-5 ">
          <span>Do you have an account?</span>
          <span className="text-ye-600">
            <NavLink to="/login">Login Now</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
