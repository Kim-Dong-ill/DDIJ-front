import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterEmail({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
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
  );
}

export default RegisterEmail;
