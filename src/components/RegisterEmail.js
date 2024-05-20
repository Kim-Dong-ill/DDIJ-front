import React from "react";
import TextFieldLine from "../components/TextField";
import { email } from "../utils/validation";

function RegisterEmail({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="email"
      >
        이메일
      </label>

      <div>
        <TextFieldLine
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
