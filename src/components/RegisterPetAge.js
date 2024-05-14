import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPetAge({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="petAge"
      >
        나이
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="petAge"
          label="나이"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPetAge;
