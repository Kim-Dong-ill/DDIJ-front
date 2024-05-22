import React, { useState } from "react";
// import HasDogButton from "../components/HasDogButton";
import TextFieldLine from "../components/TextField";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../store/thunkFunctions";

function UserInfoPage() {
  const [hasDog, setHasDog] = useState(false); //반려동물 있는지 없는지
  const [pageMove, setPageMove] = useState(true);
  // const [userId, setUserId] = useState(""); //유저아이디
  const dispatch = useDispatch();

  function handleHasDog(result) {
    setHasDog(result);
  }

  function handlePage() {
    setPageMove(!pageMove);
    $("html, body").scrollTop("0");
  }

  function onSubmit() {
    alert("전송");
  }

  //회원 탈퇴
  async function handleSignout() {
    if (window.confirm("탈퇴하시겠습니까?")) {
      await dispatch(signOutUser(state));
      alert("탈퇴되었습니다.");
    }
  }
  const state = useSelector((state) => {
    // setUserId(state.user.userData.user.id);
    return state.user.userData.user.id;
  });
  return (
    <>
      <div
        className="bg-white w-[500px] border border-da-100"
        // h-[100vh]
        style={{ height: "calc(100% - 65px)" }}
      >
        <div className="flex w-[500px] pt-[90px]">
          <Link to="/userinfo/:userid" className="flex-1">
            <button className="w-full border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
              보호자 정보
            </button>
          </Link>
          <Link to="/mypet/:userid" className="flex-1">
            <button className="w-full  border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
              반려견 정보
            </button>
          </Link>
        </div>

        <div className="w-[400px] m-auto grid gap-3 pt-[50px] pb-[115px]">
          <div className="h-[45px] flex justify-between py-[10px] pr-[5px] mb-[30px]">
            <div className="flex justify-start gap-2">
              <img
                src="/images/user-profile.svg"
                className="w-[20px] h-[20px]"
              />
              <h2 className="text-[15px]">보호자 정보</h2>
            </div>

            <Link to="/usermod/:userid">
              <button className="px-2 bg-ye-600 w-[55px] h-[25px] text-[11px] text-center rounded-2xl">
                수정하기
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] nanumBold`}
              htmlFor="userName"
            >
              이름
            </label>
            <div>
              <TextFieldLine
                required
                disabled={hasDog ? false : true}
                id="userName"
                label="이름"
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] nanumBold`}
              htmlFor="userEmail"
            >
              이메일
            </label>
            <div>
              <TextFieldLine
                required
                disabled={hasDog ? false : true}
                id="userEmail"
                label="이메일"
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] nanumBold`}
              htmlFor=""
            >
              닉네임
              <button type="button">
                <i className=" pl-1 text-ye-600 fa-solid fa-circle-check"></i>
              </button>
            </label>
            <div>
              <TextFieldLine
                required
                disabled={hasDog ? false : true}
                id="nickName"
                label="닉네임"
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-10">
            <label
              className={hasDog ? `w-[100px]` : `w-[100px] nanumBold`}
              htmlFor="adress"
            >
              주소
            </label>
            <div>
              <TextFieldLine
                required
                disabled={hasDog ? false : true}
                id="adress"
                label="주소"
                fullWidth
              />
            </div>
          </div>
          <div className="text-da-200">
            <button
              onClick={handleSignout}
              className="border border-da-200 rounded-[6px] px-2 py-1 hover:bg-da-200 hover:text-da-300"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfoPage;
