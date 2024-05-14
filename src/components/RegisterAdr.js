import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterAdr({ hasDog }) {
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
        />
      </div>
    </div>
  );
}

export default RegisterAdr;
