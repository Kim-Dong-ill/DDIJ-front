import React from "react";

function RabiesButton({ handleChange, handleRabies, rabies, register }) {
  function doRabies(e) {
    handleChange(e);
    handleRabies(true);
  }

  function doNotRabies(e) {
    handleChange(e);
    handleRabies(false);
  }

  return (
    <div className="flex gap-5">
      <div className="w-[100%]">
        <button
          onClick={doRabies}
          type="button"
          className={
            rabies
              ? `bg-black rounded-md w-[100%] h-[35px] border border-black`
              : `bg-white rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              rabies ? `text-white px-12 py-2` : `text-black px-12 py-2`
            }
            htmlFor="doRabies"
          >
            했어요
          </label>
        </button>
        <input
          value={rabies}
          hidden
          onClick={doRabies}
          checked={rabies ? true : false}
          id="doRabies"
          type="checkbox"
          name="pRabies"
          {...register("rabies")}
        />
      </div>

      <div className="w-[100%]">
        <button
          onClick={doNotRabies}
          type="button"
          className={
            rabies
              ? `bg-white rounded-md w-[100%] h-[35px] border border-black`
              : `bg-black rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              rabies ? `text-black px-11 py-2` : `text-white px-11 py-2`
            }
            htmlFor="doNotRabies"
          >
            안했어요
          </label>
        </button>
        <input
          value={rabies}
          hidden
          onClick={doNotRabies}
          checked={rabies ? false : true}
          id="doNotRabies"
          type="checkbox"
          name="pRabies"
          {...register("rabies")}
        />
      </div>
    </div>
  );
}

export default RabiesButton;
