import React from "react";
import TextFieldLine from "../components/TextField";
import { petAge } from "../utils/validation";

function RegisterPetAge({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petAge"
      >
        나이
      </label>
      <div>
        <TextFieldLine
          type="number"
          disabled={hasDog ? false : true}
          required
          id="petAge"
          label="나이"
          fullWidth
          {...register("petAge", petAge)}
        />
        {errors.petAge && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.petAge.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetAge;
