import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPWCheck({ hasDog, register, errors, watch }) {
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
          {...register("checkPassword", {
            validate: (value) => {
              return value === watch("userPassword") || "비밀번호 일치 안함";
            },
          })}
        />
      </div>
    </div>
  );
}

export default RegisterPWCheck;
