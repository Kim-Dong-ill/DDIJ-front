import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPetName({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petName"
      >
        이름
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="petName"
          label="이름"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPetName;
