import React from "react";

function RabiesButton({ handleRabies, rabies }) {
  function doRabies() {
    handleRabies(true);
  }

  function doNotRabies() {
    handleRabies(false);
  }

  return (
    <div className="flex gap-[30px]">
      <div className="flex flex-grow-0 w-1/2">
        <button
          type="button"
          className={
            rabies
              ? `bg-black rounded-md h-[35px] border border-black w-full`
              : `bg-white rounded-md h-[35px] border border-black w-full`
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
          hidden
          onClick={doRabies}
          checked={rabies ? true : false}
          id="doRabies"
          type="radio"
          name="rabies"
        />
      </div>
      <div className="flex flex-grow-0 w-1/2">
        <button
          type="button"
          className={
            rabies
              ? `bg-white rounded-md h-[35px] border border-black w-full`
              : `bg-black rounded-md h-[35px] border border-black w-full`
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
          hidden
          onClick={doNotRabies}
          checked={rabies ? false : true}
          id="doNotRabies"
          type="radio"
          name="rabies"
        />
      </div>
    </div>
  );
}

export default RabiesButton;
