import React from "react";

function CheckCircleButton(handleCheckCircle) {
  function checkDuplicateCircle() {
    handleCheckCircle(true);
  }
  function noCheckDuplicateCircle() {
    handleNoCheckCircle(false);
  }
  return (
    <>
      <div>
        <div>
          <button>
            <label htmlFor="chekDuplicateCircle">했어요</label>
          </button>
        </div>
      </div>
    </>
  );
}

export default CheckCircleButton;
