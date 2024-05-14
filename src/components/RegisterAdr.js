import React from "react";
import TextFieldLine from "../components/TextField";
import { userAdress } from "../utils/validation";

function RegisterAdr({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="userAdress"
      >
        주소
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="userAdress"
          label="주소"
          fullWidth
          {...register("userAdress", userAdress)}
        />
        {errors.userAdress && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.userAdress.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterAdr;
