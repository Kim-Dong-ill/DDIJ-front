import React from "react";
import TextFieldLine from "../components/TextField";
import { uAdress } from "../utils/validation";

function RegisterAdr({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="uAdress"
      >
        주소
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="uAdress"
          label="주소"
          fullWidth
          {...register("uAdress", uAdress)}
        />
        {errors.uAdress && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.uAdress.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterAdr;
