import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterNick({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor=""
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
          id="nickName"
          label="닉네임"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterNick;
