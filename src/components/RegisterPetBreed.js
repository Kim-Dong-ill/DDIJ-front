import React from "react";
import TextFieldLine from "../components/TextField";
import { petBreed } from "../utils/validation";

function RegisterPetBreed({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petBreed"
      >
        견종
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="petBreed"
          label="견종"
          fullWidth
          {...register("petBreed", petBreed)}
        />
        {errors.petBreed && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.petBreed.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetBreed;
