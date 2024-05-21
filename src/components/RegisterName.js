import React from "react";
import TextFieldLine from "../components/TextField";
import { name } from "../utils/validation";

function RegisterName({ hasDog, register, errors }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="name"
      >
        이름
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="name"
          label="이름"
          fullWidth
          {...register("name", name)}
        />
        {errors.name && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.name.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterName;
