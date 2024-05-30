import React, { useState } from "react";

function CCViewCommentWrite() {
  const [commentText, setCommentText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText("");
  }
  function handleInputChange(e) {
    setCommentText(e.target.value);
  }
  return (
    <div>
      <div className=" flex my-[20px] gap-[10px] text-black">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="댓글입력"
            className=" border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum"
            value={commentText}
            onChange={handleInputChange}
          />
          {/* 유효성검사 에러코드 */}
          {/* {errors.commentText && (
            <div className="text-red-500 text-xs mt-1">
              {errors.commentText.message}
            </div>
          )} */}
          <button className="w-[50px] bg-da-100 rounded-[50px]">등록</button>
        </form>
      </div>
    </div>
  );
}

export default CCViewCommentWrite;
