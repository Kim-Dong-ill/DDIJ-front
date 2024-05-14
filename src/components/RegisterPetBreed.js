import React from "react";
import TextFieldLine from "../components/TextField";

function RegisterPetBreed({ hasDog }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        className={hasDog ? `w-[100px]` : `w-[100px] text-da-500`}
        htmlFor="breed"
      >
        견종
      </label>
      <div>
        <TextFieldLine
          disabled={hasDog ? false : true}
          required
          id="breed"
          label="견종"
          fullWidth
        />
      </div>
    </div>
  );
}

export default RegisterPetBreed;
