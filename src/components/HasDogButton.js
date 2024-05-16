import React from "react";

function HasDogButton({ handleHasDog, hasDog, reset }) {
  function haveDog() {
    handleHasDog(true);
  }
  function haveNotDog() {
    handleHasDog(false);
    reset();
  }

  return (
    <div className="flex justify-center items-center gap-5 mb-6">
      <div className="w-[100%]">
        <button
          onClick={haveDog}
          type="button"
          className={
            hasDog
              ? `bg-black rounded-md w-[100%] h-[35px] border border-black`
              : `bg-white rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              hasDog ? `text-white px-12 py-2` : `text-black px-12 py-2`
            }
            htmlFor="hasdog"
          >
            있어요
          </label>
        </button>
        <input
          value={true}
          hidden
          // onClick={haveDog}
          checked={hasDog ? true : false}
          id="hasdog"
          type="radio"
          name="dog"
        />
      </div>
      <div className="w-[100%]">
        <button
          onClick={haveNotDog}
          type="button"
          className={
            hasDog
              ? `bg-white rounded-md w-[100%] h-[35px] border border-black`
              : `bg-black rounded-md w-[100%] h-[35px] border border-black`
          }
        >
          <label
            className={
              hasDog ? `text-black px-12 py-2` : `text-white px-12 py-2`
            }
            htmlFor="hasnotdog"
          >
            없어요
          </label>
        </button>
        <input
          value={false}
          hidden
          // onClick={haveNotDog}
          checked={hasDog ? false : true}
          id="hasnotdog"
          type="radio"
          name="dog"
        />
      </div>
    </div>
  );
}

export default HasDogButton;
