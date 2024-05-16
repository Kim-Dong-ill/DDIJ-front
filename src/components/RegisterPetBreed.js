import React from "react";
import TextFieldLine from "../components/TextField";
import { pBreed } from "../utils/validation";

function RegisterPetBreed({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="pBreed"
      >
        견종
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="pBreed"
          label="견종"
          fullWidth
          {...register("pBreed", pBreed)}
        />
        {errors.pBreed && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.pBreed.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetBreed;
