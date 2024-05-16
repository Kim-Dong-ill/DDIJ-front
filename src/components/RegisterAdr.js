import React from "react";
import TextFieldLine from "../components/TextField";
import { adress } from "../utils/validation";

function RegisterAdr({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="adress"
      >
        주소
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="adress"
          label="주소"
          fullWidth
          {...register("adress", adress)}
        />
        {errors.adress && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.adress.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterAdr;
