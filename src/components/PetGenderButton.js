import React from "react";

function PetGenderButton({ handleGender, gender, register }) {
  function male() {
    handleGender("male");
  }

  function female() {
    handleGender("female");
  }

  return (
    <div className="flex gap-10 items-center">
      <div className="flex items-center gap-2 ">
        <input
          type="radio"
          id="male"
          name="pGender"
          hidden
          value="남"
          checked={gender === "male" ? true : false}
          {...register("gender")}
        />
        <label
          onClick={male}
          className="flex gap-2 items-center"
          htmlFor="male"
        >
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
          <div>
            <i className="text-blue-600 text-[30px] fa-solid fa-mars"></i>
          </div>
        </label>
      </div>
      <div className="flex itmes-center gap-2">
        <input
          checked={gender === "female" ? true : false}
          type="radio"
          id="female"
          name="pGender"
          hidden
          value="여"
          {...register("gender")}
        />
        <label
          onClick={female}
          className="flex items-center gap-2"
          htmlFor="female"
        >
          <div type="button">
            <i
              onClick={female}
              className={`text-[25px] rounded-full fa-regular fa-circle-check ${
                gender === "female" ? `bg-ye-600` : ""
              }`}
            ></i>
          </div>
          <div>
            <i className="text-pink-600 fa-solid text-[30px] fa-venus"></i>
          </div>
        </label>
      </div>
    </div>
  );
}

export default PetGenderButton;
