import React from "react";
import TextFieldLine from "../components/TextField";
import { uEmail } from "../utils/validation";

function RegisterEmail({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="uEmail"
      >
        이메일
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="uEmail"
          label="이메일"
          fullWidth
          {...register("uEmail", uEmail)}
        />
        {errors.uEmail && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.uEmail.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterEmail;
