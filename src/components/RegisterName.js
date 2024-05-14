import React from "react";
import TextFieldLine from "../components/TextField";
import { userName } from "../utils/validation";

function RegisterName({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
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
          {...register("userName", userName)}
        />
        {errors.userName && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.userName.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterName;
