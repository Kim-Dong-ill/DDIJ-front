import React from "react";
import TextFieldLine from "../components/TextField";
import { petName } from "../utils/validation";

function RegisterPetName({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petName"
      >
        이름
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="petName"
          label="이름"
          fullWidth
          {...register("petName", petName)}
        />
        {errors.petName && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.petName.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetName;
