import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPetEtc({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petEtc"
      >
        우리 아이 성격
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="petEtc"
          label="성격"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPetEtc;
