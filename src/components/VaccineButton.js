import React from "react";

function VaccineButton({ handleChange, handleVaccine, vaccine, register }) {
  function doVaccine(e) {
    handleChange(e);
    handleVaccine(true);
  }
  function doNotVaccine(e) {
    handleChange(e);
    handleVaccine(false);
  }

  return (
    <div className="flex gap-5">
      <div className="w-[100%]">
        <button
          onClick={doVaccine}
          type="button"
          className={
            vaccine
              ? `bg-black rounded-md w-[100%] h-[35px] border border-black`
              : `bg-white rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              vaccine ? `text-white px-12 py-2` : `text-black px-12 py-2`
            }
            htmlFor="doVaccine"
          >
            했어요
          </label>
        </button>
        <input
          value={vaccine}
          hidden
          onClick={doVaccine}
          checked={vaccine ? true : false}
          id="doVaccine"
          type="radio"
          name="pVaccine"
          {...register("vaccine")}
        />
      </div>

      <div className="w-[100%]">
        <button
          onClick={doNotVaccine}
          type="button"
          className={
            vaccine
              ? `bg-white rounded-md w-[100%] h-[35px] border border-black`
              : `bg-black rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              vaccine ? `text-black px-11 py-2` : `text-white px-11 py-2`
            }
            htmlFor="doNotVaccine"
          >
            안했어요
          </label>
        </button>
        <input
          value={vaccine}
          hidden
          onClick={doNotVaccine}
          checked={vaccine ? false : true}
          id="doNotVaccine"
          type="radio"
          name="pVaccine"
          {...register("vaccine")}
        />
      </div>
    </div>
  );
}

export default VaccineButton;
