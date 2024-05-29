import React, { useEffect, useState } from "react";
import ButtonBl from "../components/ButtonBl";
import ButtonYe from "../components/ButtonYe";
import TextFieldLine from "../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  defaltPassword,
  modEmail,
  modName,
  modNickName,
} from "../utils/validation";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

function UserModifyPage() {
  const { kakao } = window;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "all" });
  const state = useSelector((state) => {
    return state.user.userData.user;
  });
  const [defaultP, setDefaultP] = useState();
  const [msg, setMsg] = useState("");
  const [nMsg, setNMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errNMsg, setErrNMsg] = useState("");
  const [nickValue, setNickValue] = useState(state.nickName);
  const [passwordState, setPasswordState] = useState(false); //기존비번 확인
  const [nickState, setNickState] = useState(true); //기존 닉네임 확인
  const [write, setWrite] = useState(false);
  const [uAddress, setUAddress] = useState("");
  const [addState, setAddState] = useState(false);
  const [coords, setCoords] = useState([]);

  //주소 좌표로 변경하기
  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = {
          latitude: result[0].road_address.y,
          longtitude: result[0].road_address.x,
        };
        console.log(coords);
        setCoords(coords);
      }
    };

    geocoder.addressSearch(`${uAddress}`, callback);
  }, [uAddress]);

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
        setUAddress(data.address);
        setAddState(true);
      },
    }).open();
  };

  const handleTextFieldClick = () => {
    openPostcode(); // TextFieldLine 클릭 시 주소 입력 창 열기
  };

  // useEffect(() => {
  //   if (passwordState) {
  //     setWrite(true);
  //   } else {
  //     setWrite(false);
  //   }
  // }, [passwordState]);
  const navigate = useNavigate();
  async function onSubmit(body) {
    body.coords = coords;
    try {
      const res = await axiosInstance.patch(`/user/${state.id}/update`, body);
      navigate("/userinfo");
    } catch (error) {
      console.log(error);
    }
  }

  function defaultPassword(e) {
    setDefaultP(e.target.value);
  }

  async function handleDefaultP() {
    try {
      const body = { defaultP, userId: state.id };
      console.log(body);
      const res = await axiosInstance.post("/user/checkpassword", body);
      console.log(res.data);
      setPasswordState(res.data.passwordState);
      setMsg(res.data.message);
      setErrMsg(res.data.errMsg);
    } catch (error) {}
  }

  function handleValue(e) {
    setNickValue(e.target.value);
  }
  async function checkNickname() {
    const body = { nickValue };
    console.log(body);
    const res = await axiosInstance.post("/user/checknickname", body);
    console.log(res.data);
    setNickState(res.data.nickState);
    if (nickValue === state.nickName) {
      console.log("같음");
      setNickState(true);
    }
    setNMsg(res.data.message);
    setErrNMsg(res.data.errorMsg);
  }
  console.log("nickState", nickState);
  console.log("SpasswordStatetate", passwordState);
  const states = useSelector((state) => {
    return state.user.userData.user;
  });

  function handleCheck(e) {
    if (e.target.type === "button") {
      toast.error("비밀번호 확인은 필수입니다!!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <div
        className="bg-white w-[500px] border border-da-100 "
        // h-[100vh]
        style={{ height: "calc(100% - 65px)" }}
      >
        <div className="flex w-[500px] pt-[90px]">
          <Link to="/userinfo" className="flex-1">
            <button className="w-full border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
              보호자 정보
            </button>
          </Link>
          <Link to={`/mypet/${states.id}`} className="flex-1">
            <button className="w-full  border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
              반려견 정보
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[400px] m-auto grid gap-3 pt-[40px] ">
            {/* <div className="h-[45px] flex justify-between py-[10px] pr-[5px] mb-[30px]">
              <div className="flex justify-start gap-2">
                <img
                  src="/images/user-profile.svg"
                  className="w-[20px] h-[20px]"
                />
                <h2 className="text-[15px]">보호자 정보</h2>
              </div>
            </div> */}
            <div className="text-red-500 nanumBold text-center mb-6">
              비밀번호 확인은 필수입니다.
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between relative">
                <label
                  className="w-[190px] nanumBold text-[15px] mb-2"
                  htmlFor="defaultp"
                >
                  비밀번호 확인
                  <button type="button" onClick={handleDefaultP}>
                    <i className=" pl-3 text-ye-600 fa-solid fa-circle-check">
                      <span className="ml-1">확인</span>
                    </i>
                  </button>
                </label>
                <div className="absolute right-0 nanumBold text-green-500 text-xs mt-1">
                  {msg}
                </div>
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errMsg}
                </div>
              </div>
              <div>
                <TextFieldLine
                  onInput={defaultPassword}
                  type="password"
                  id="defaultp"
                  label="기존 비밀번호"
                  fullWidth
                  {...register("defaultp", defaltPassword)}
                />
                {errors.defaultp && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.defaultp.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label
                className="w-[100px] nanumBold text-[15px] mb-2"
                htmlFor="name"
              >
                이름
              </label>
              <div>
                <TextFieldLine
                  defaultValue={state.name}
                  id="name"
                  label="이름"
                  fullWidth
                  {...register("name", modName)}
                />
                {errors.name && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label
                className="w-[100px] nanumBold text-[15px] mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <div>
                <TextFieldLine
                  disabled={true}
                  defaultValue={state.email}
                  id="email"
                  label="이메일"
                  fullWidth
                  {...register("email", modEmail)}
                />
                {errors.email && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label
                className="w-[100px] nanumBold text-[15px]"
                htmlFor="password"
              >
                비밀번호
              </label>
              <div>
                <TextFieldLine
                  disabled={passwordState ? false : true}
                  type="password"
                  id="password"
                  label="변경할 때에만 작성해주세요."
                  fullWidth
                  {...register("password", defaltPassword)}
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
                className="w-[120px] nanumBold text-[15px]"
                htmlFor="checkPassword"
              >
                비밀번호 재입력
              </label>
              <div>
                <TextFieldLine
                  disabled={passwordState ? false : true}
                  type="password"
                  id="checkPassword"
                  label="변경할 때에만 작성해주세요."
                  fullWidth
                  {...register("checkPassword", {
                    validate: (value) => {
                      return (
                        value === watch("password") || "비밀번호 일치 안함"
                      );
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
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between relative">
                <label
                  className="w-[190px] nanumBold text-[15px] mb-2"
                  htmlFor="nickName"
                >
                  닉네임
                  <button type="button" onClick={checkNickname}>
                    <i className=" pl-3 text-ye-600 fa-solid fa-circle-check">
                      <span className="ml-1">중복체크</span>
                    </i>
                  </button>
                </label>
                <div className="absolute right-0 nanumBold text-green-500 text-xs mt-1">
                  {nMsg}
                </div>
                <div className="nanumBold text-red-500 text-xs mt-1">
                  {errNMsg}
                </div>
              </div>
              <div>
                <TextFieldLine
                  onInput={handleValue}
                  value={nickValue}
                  id="nickName"
                  label="닉네임"
                  fullWidth
                  {...register("nickName", modNickName)}
                />
                {errors.nickName && (
                  <div className="nanumBold text-red-500 text-xs mt-1">
                    {errors.nickName.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-10">
              <label
                className="w-[100px] nanumBold text-[15px] mb-2"
                htmlFor="address"
              >
                주소
              </label>
              <div>
                <TextFieldLine
                  onClick={handleTextFieldClick}
                  // value={uAddress}
                  value={addState ? uAddress : state.address}
                  // defaultValue={state.address}
                  id="address"
                  label="주소"
                  fullWidth
                  {...register("address")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pb-[115px]">
            <Link to="/userinfo/:userid">
              <ButtonBl>취소</ButtonBl>
            </Link>
            <ButtonYe
              type={passwordState ? `submit` : `button`}
              onClick={handleCheck}
            >
              수정완료
            </ButtonYe>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserModifyPage;
