import React from "react";
import TextFieldLine from "../components/TextField";
import { pChar } from "../utils/validation";

function RegisterPetEtc({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="pChar"
      >
        우리 아이 성격
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="pChar"
          label="성격"
          fullWidth
          {...register("pChar", pChar)}
        />
        {errors.pChar && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.pChar.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPetEtc;
