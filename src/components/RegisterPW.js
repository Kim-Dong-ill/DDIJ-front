import React from "react";
import TextFieldLine from "../components/TextField";
import { userPassword } from "../utils/validation";

function RegisterPW({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="userPassword"
      >
        비밀번호
      </label>
      <div>
        <TextFieldLine
          type="password"
          required
          disabled={hasDog ? false : true}
          id="userPassword"
          label="비밀번호"
          fullWidth
          {...register("userPassword", userPassword)}
        />
        {errors.userPassword && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.userPassword.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPW;
