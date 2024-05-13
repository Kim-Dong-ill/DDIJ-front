import React from "react";

function NeuterButton({ handleNeuter, neuter }) {
  function doNeuter() {
    handleNeuter(true);
  }

  function doNotNeuter() {
    handleNeuter(false);
  }
  return (
    <div className="flex justify-center gap-5">
      <div className="w-[100%]">
        <button
          type="button"
          className={
            neuter
              ? `bg-black rounded-md w-[100%] h-[35px] border border-black`
              : `bg-white rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              neuter ? `text-white px-12 py-2` : `text-black px-12 py-2`
            }
            htmlFor="doNeuter"
          >
            했어요
          </label>
        </button>
        <input
          hidden
          onClick={doNeuter}
          checked={neuter ? true : false}
          id="doNeuter"
          type="radio"
          name="neuter"
        />
      </div>
      <div className="w-[100%]">
        <button
          type="button"
          className={
            neuter
              ? `bg-white rounded-md w-[100%] h-[35px] border border-black`
              : `bg-black rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              neuter ? `text-black px-11 py-2` : `text-white px-11 py-2`
            }
            htmlFor="doNotNeuter"
          >
            안했어요
          </label>
        </button>
        <input
          hidden
          onClick={doNotNeuter}
          checked={neuter ? false : true}
          id="doNotNeuter"
          type="radio"
          name="neuter"
        />
      </div>
    </div>
  );
}

export default NeuterButton;
