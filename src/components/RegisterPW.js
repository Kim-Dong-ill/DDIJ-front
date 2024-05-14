import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPW({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="usePassword"
      >
        비밀번호
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="userPassword"
          label="비밀번호"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPW;
