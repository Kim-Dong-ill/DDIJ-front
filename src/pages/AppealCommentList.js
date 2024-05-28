import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";

function AppealCommentList(props) {
  const { userId } = useParams(); // URL의 userId 파라미터 가져오기
  const [appealComment, setAppealComment] = useState([]); // 댓글 목록 상태
  const [textData, setTextData] = useState({ text: "" }); // 입력 필드 상태
  const [commentNick, setCommentNick] = useState([]);
  const [loginUserId, setLoginUserId] = useState(null);
  const [moreComments, setMoreComments] = useState(false); // 댓글 더보기 상태 추가
  const maxTextLength = 150;

  // 입력 필드 변경 시 호출되는 함수
  function textDataChange(e) {
    const { name, value } = e.target;
    if (value.length <= maxTextLength) {
      setTextData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  }

  // 댓글 작성 후 제출하는 함수
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      appealPostId: props.appealPostId, // 부모 컴포넌트에서 전달된 appealPostId
      text: textData.text,
      userId: loginState,
    };
    try {
      await axiosInstance.post(`appeal/${userId}/comment`, body);
      setTextData({ text: "" }); // 입력 필드 초기화
      fetchAppealComment(); // 댓글 목록 다시 불러오기
    } catch (error) {
      console.log(error);
    }
  }

  // 댓글 목록을 가져오는 함수
  async function fetchAppealComment() {
    try {
      const res = await axiosInstance.get(`/appeal/${userId}/comment`, {
        params: { appealPostId: props.appealPostId }, // 쿼리 파라미터로 appealPostId 전달
      });
      setAppealComment(res.data.appealComment); // 댓글 목록 상태 업데이트
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAppealComment(); // 컴포넌트가 마운트될 때 댓글 목록 가져오기
    // console.log("appealComment", appealComment);
  }, [userId, props.appealPostId]); // userId와 appealPostId가 변경될 때마다 다시 요청

  // ======== 동일님이 알려준 useSelector____
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  console.log(loginState);

  // 댓글 더보기 토글 함수
  const showComments = () => {
    setMoreComments((prevState) => !prevState);
  };

  return (
    <>
      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="flex w-full my-[20px] pl-[10px] pr-[16px] py-[7px] gap-[10px] border rounded-[10px]">
          <input
            type="text"
            placeholder="댓글입력"
            className="nanum w-[390px]"
            name="text"
            value={textData.text}
            onChange={textDataChange}
            maxLength={maxTextLength}
          />
          <button>
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </form>
      {/* 댓글 목록 */}

      {/* {appealComment.map((item) => ( */}
      {appealComment
        // 더보기 버튼 클릭 전 댓글 1개만 보여줌
        .slice(0, moreComments ? appealComment.length : 1)
        .map((item) => {
          const imageUrl = `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${item.petImage}`;
          const createdAtDate = new Date(item.createdAt);
          let timeAgo = formatDistance(createdAtDate, new Date(), {
            addSuffix: true,
            locale: ko,
          });
          timeAgo = timeAgo.replace("약 ", "");
          return (
            <div key={item._id} className="w-full pt-[5px]">
              <div className="flex w-full items-center pl-[6px] mb-6">
                {item.petImage && (
                  <img
                    src={imageUrl} // 각 댓글의 펫 이미지 URL
                    alt=""
                    className="w-[37px] h-[37px] mr-[18px] rounded-full"
                  />
                )}
                <div>
                  {/* 닉네임 + 시간 */}
                  <div className="flex items-center gap-2 mb-[5px]">
                    <p className="nanum text-[15px] text-da-600">
                      <span className="nanum mr-[3px] text-[13px] text-da-600">
                        @
                      </span>
                      {item.user.nickName}
                    </p>
                    <p className="nanum text-xs text-da-200">{timeAgo}</p>
                  </div>
                  {/* 닉네임 + 시간 */}
                  <div className="nanum text-wrap break-all">{item.text}</div>
                </div>
              </div>
            </div>
          );
        })}

      {/* 댓글 더보기 버튼 */}
      {/* 댓글 2개 이상 달리면 더보기 버튼 생성 */}
      {appealComment.length > 1 && (
        <div className="text-center mt-2">
          <button
            onClick={showComments}
            className="text-sm text-da-300 cursor-pointer mt-10"
          >
            {/* {moreComments ? "접기" : "댓글 더보기"} */}
            {moreComments ? (
              <>
                <span className="nanumBold">접기</span>
                <i className="fa-solid fa-caret-up text-da-300 ml-2"></i>
              </>
            ) : (
              <>
                <span className="nanumBold">댓글 더보기</span>
                <i className="fa-solid fa-caret-down text-da-300 ml-2"></i>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default AppealCommentList;
