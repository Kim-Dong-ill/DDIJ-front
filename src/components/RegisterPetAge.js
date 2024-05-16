import React from "react";
import TextFieldLine from "../components/TextField";
import { pAge } from "../utils/validation";

function RegisterPetAge({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="pAge"
      >
        나이
      </label>
      <div>
        <TextFieldLine
          // value가 0이상으로 설정 필요
          type="number"
          disabled={hasDog ? false : true}
          required
          id="pAge"
          label="나이"
          fullWidth
          {...register("pAge", pAge)}
        />
        {errors.pAge && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.pAge.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetAge;
