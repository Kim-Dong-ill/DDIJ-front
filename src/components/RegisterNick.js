import React from "react";
import TextFieldLine from "../components/TextField";
import { uNickName } from "../utils/validation";

function RegisterNick({ hasDog, errors, register }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="uNickName"
      >
        닉네임
        <button type="button">
          <i className=" pl-1 text-ye-600 fa-solid fa-circle-check"></i>
        </button>
      </label>
      <div>
        <TextFieldLine
          required
          disabled={hasDog ? false : true}
          id="uNickName"
          label="닉네임"
          fullWidth
          {...register("uNickName", uNickName)}
        />
        {errors.uNickName && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.uNickName.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterNick;
