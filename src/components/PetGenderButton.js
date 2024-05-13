import React from "react";

function PetGenderButton({ handleGender, gender }) {
  function male() {
    handleGender("male");
  }

  function female() {
    handleGender("female");
  }

  return (
    <div className="flex gap-10 items-center">
      <div className="flex items-center gap-2">
        <input type="radio" id="male" name="gender" hidden />
        <label className="flex gap-2 items-center" htmlFor="male">
          <div type="button">
            <i
              onClick={male}
              className={
                gender === "male"
                  ? `text-[25px] bg-ye-600 rounded-full fa-regular fa-circle-check`
                  : `text-[25px] rounded-full fa-regular fa-circle-check`
              }
            ></i>
          </div>
        </label>
        <div>
          <i className="text-blue-600 text-[30px] fa-solid fa-mars"></i>
        </div>
      </div>
      <div className="flex itmes-center gap-2">
        <input type="radio" id="female" name="gender" hidden />
        <label className="flex items-center gap-2" htmlFor="female">
          <div type="button">
            <i
              onClick={female}
              className={`text-[25px] rounded-full fa-regular fa-circle-check ${
                gender === "female" ? `bg-ye-600` : ""
              }`}
            ></i>
          </div>
        </label>
        <div>
          <i className="text-pink-600 fa-solid text-[30px] fa-venus"></i>
        </div>
      </div>
    </div>
  );
}

export default PetGenderButton;
