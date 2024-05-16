import React from "react";
import TextFieldLine from "../components/TextField";
import { uName } from "../utils/validation";

function RegisterName({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="uName"
      >
        이름
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="uName"
          label="이름"
          fullWidth
          {...register("uName", uName)}
        />
        {errors.uName && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.uName.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterName;
