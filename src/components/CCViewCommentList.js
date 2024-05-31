import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import { useSelector } from "react-redux";

// {commentList
//   .slice(0, moreComments ? commentList.length : 1)
//   .map((comment, idx) => {
//     return (
//       <div
//         className="flex justify-between mb-[20px] gap-[20px] items-center w-full"
//         key={idx}
//       >
//         <div className="flex items-center gap-1">
//           <div className="flex gap-[1px] ">
//             <img
//               src="/images/commenticon_white.svg"
//               alt=""
//               className="block"
//             />
//             <div className="flex items-center w-[90px]">
//               <p className="nanumBold">{comment.user?.nickName}</p>
//             </div>
//           </div>
//           <div className="nanum flex-wrap w-[280px] overflow-wrap">
//             {comment.content}
//           </div>
//         </div>
//       </div>
//     );
//   })}

function CCViewCommentList({ comment, deleteComment }) {
  const createdAtDate = new Date(comment.createdAt);

  const userData = useSelector((state) => {
    return state.user?.userData;
  });

  // 댓글삭제시 필요
  // const loggedInUserId = userData.user.id; // 현재 로그인한유저 ID
  // const commentAuthorId = comment.user._id; // 댓글 작성자의 ID

  // const isCommentAuthor = loggedInUserId === commentAuthorId; // Id비교

  // 댓글삭제시 필요
  // const handleDeleteComment = ()=>{
  //   delelteComment(comment._id)
  // }

  return (
    <div className="flex justify-between mb-[20px] gap-[20px] items-center w-full">
      <div className="flex items-center gap-1">
        <div className="flex gap-[1px] ">
          <img src="/images/commenticon_white.svg" alt="" className="block" />
          <div className="flex items-center w-[90px]">
            <p className="nanumBold">{comment.user?.nickName}</p>
            {/* {timeAgo && <p>{timeAgo}</p>} */}
          </div>
        </div>
        <div className="nanum flex-wrap w-[280px] overflow-wrap">
          {comment.content}
        </div>
      </div>
    </div>
  );
}

export default CCViewCommentList;
