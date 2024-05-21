import React, { useEffect, useState } from "react";
import TextFieldLine from "../components/TextField";
import { nickName } from "../utils/validation";
import axiosInstance from "../utils/axios";

function RegisterNick({ hasDog, errors, register, handleNickErr }) {
  const [nickValue, setNickValue] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function checkNickname() {
    const body = { nickValue };
    const res = await axiosInstance.post("/user/checknickname", body);
    setMsg(res.data.message);
    setErrMsg(res.data.errorMsg);
  }

  useEffect(() => {
    if (errMsg) {
      console.log(errMsg);
      handleNickErr(false);
    } else {
      handleNickErr(true);
    }
  }, [errMsg]);
  useEffect(() => {
    handleNickErr(false);
  }, []);

  function handleValue(e) {
    setNickValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between relative">
        <label
          className={hasDog ? `w-[150px]` : `w-[100px] text-da-500`}
          htmlFor="nickName"
        >
          닉네임
          <button type="button" onClick={checkNickname}>
            <i className=" pl-2 text-ye-600 fa-solid fa-circle-check">
              중복체크
            </i>
          </button>
        </label>
        <div className="absolute right-0 nanumBold text-green-500 text-xs mt-1">
          {msg}
        </div>
        <div className="nanumBold text-red-500 text-xs mt-1">{errMsg}</div>
      </div>
      <div>
        <TextFieldLine
          onInput={handleValue}
          required
          disabled={hasDog ? false : true}
          id="nickName"
          label="닉네임"
          fullWidth
          {...register("nickName", nickName)}
        />
        {errors.nickName && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.nickName.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterNick;
