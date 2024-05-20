import React from "react";

function CheckCircleButton({ handleCheckCircle, checkCircle }) {
  function checkDuplicateCircle() {
    handleCheckCircle(true);
  }
  function noCheckDuplicateCircle() {
    handleCheckCircle(false);
  }
  return (
    <>
      <div className="flex justify-center items-center gap-5 mb-6">
        <div className="w-[100%]">
          <button
            onClick={checkDuplicateCircle}
            className={
              checkCircle
                ? `bg-black w-[100%] h-[35px] border border-black rounded-md`
                : `bg-white w-[100%] h-[35px] border border-black rounded-md`
            }
          >
            <label
              htmlFor="checkCircle"
              className={
                checkCircle
                  ? `text-wh-100 px-12 py-2`
                  : `text-da-300 px-12 py-2`
              }
            >
              했어요
            </label>
          </button>
          <input
            type="radio"
            value={true}
            hidden
            checked={checkCircle ? true : false}
            id="checkCircle"
          />
        </div>
        <div className="w-[100%]">
          <button
            onClick={noCheckDuplicateCircle}
            className={
              checkCircle
                ? `bg-white w-[100%] h-[35px] border border-black rounded-md`
                : `bg-black w-[100%] h-[35px] border border-black rounded-md`
            }
          >
            <label
              htmlFor="checkCircle"
              className={
                checkCircle
                  ? `text-da-300 px-12 py-2`
                  : `text-wh-100 px-12 py-2`
              }
            >
              안했어요
            </label>
          </button>
          <input
            type="radio"
            value={false}
            hidden
            checked={checkCircle ? false : true}
            id="noCheckCircle"
          />
        </div>
      </div>
    </>
  );
}

export default CheckCircleButton;
