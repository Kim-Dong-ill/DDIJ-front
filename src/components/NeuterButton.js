import React from "react";

function NeuterButton({
  handleChange,
  handleNeuter,
  neuter,
  register,
  petNeuter,
}) {
  function doNeuter(e) {
    handleChange(e);
    handleNeuter(true);
  }

  function doNotNeuter(e) {
    handleChange(e);
    handleNeuter(false);
  }

  return (
    <div className="flex justify-center gap-5">
      <div className="w-[100%]">
        <button
          onClick={doNeuter}
          type="button"
          className={
            neuter || petNeuter
              ? `bg-black rounded-md w-[100%] h-[35px] border border-black`
              : `bg-white rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              neuter || petNeuter
                ? `text-white px-12 py-2`
                : `text-black px-12 py-2`
            }
            htmlFor="doNeuter"
          >
            했어요
          </label>
        </button>
        <input
          value={neuter}
          hidden
          onClick={doNeuter}
          checked={neuter || petNeuter ? true : false}
          id="doNeuter"
          type="radio"
          name="pNeuter"
          {...register("neuter")}
        />
      </div>

      <div className="w-[100%]">
        <button
          onClick={doNotNeuter}
          type="button"
          className={
            neuter || petNeuter
              ? `bg-white rounded-md w-[100%] h-[35px] border border-black`
              : `bg-black rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              neuter || petNeuter
                ? `text-black px-11 py-2`
                : `text-white px-11 py-2`
            }
            htmlFor="doNotNeuter"
          >
            안했어요
          </label>
        </button>
        <input
          value={neuter}
          hidden
          onClick={doNotNeuter}
          checked={neuter || petNeuter ? false : true}
          id="doNotNeuter"
          type="radio"
          name="pNeuter"
          {...register("neuter")}
        />
      </div>
    </div>
  );
}

export default NeuterButton;
