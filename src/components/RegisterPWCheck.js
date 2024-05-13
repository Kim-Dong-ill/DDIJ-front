import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPWCheck({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="checkPassword"
      >
        비밀번호 확인
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="checkPassword"
          label="비밀번호 확인"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPWCheck;
