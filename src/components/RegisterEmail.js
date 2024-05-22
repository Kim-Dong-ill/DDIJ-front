import React, { useEffect, useState } from "react";
import TextFieldLine from "../components/TextField";
import { email } from "../utils/validation";
import axiosInstance from "../utils/axios";

function RegisterEmail({ hasDog, register, errors, handleEmailErr }) {
  const [emailValue, setEmailValue] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function checkEmail() {
    const body = { emailValue };
    const res = await axiosInstance.post("/user/checkemail", body);
    setMsg(res.data.message);
    setErrMsg(res.data.errorMsg);
  }

  useEffect(() => {
    if (errMsg) {
      console.log(errMsg);
      handleEmailErr(false);
    } else {
      handleEmailErr(true);
    }
  }, [errMsg]);
  useEffect(() => {
    handleEmailErr(false);
  }, []);

  function handleValue(e) {
    setEmailValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between relative">
        <label
          className={hasDog ? `w-[150px]` : `w-[100px] text-da-500`}
          htmlFor="email"
        >
          이메일
          <button type="button" onClick={checkEmail}>
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
          id="email"
          label="이메일"
          fullWidth
          {...register("email", email)}
        />
        {errors.email && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.email.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterEmail;
