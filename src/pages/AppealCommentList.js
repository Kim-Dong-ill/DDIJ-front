import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";

function AppealCommentList(props) {
  const { userId } = useParams(); // URL의 userId 파라미터 가져오기
  const [appealComment, setAppealComment] = useState([]); // 댓글 목록 상태
  const [textData, setTextData] = useState({ text: "" }); // 입력 필드 상태
  const [commentNick, setCommentNick] = useState([]);
  const [loginUserId, setLoginUserId] = useState(null);

  // 입력 필드 변경 시 호출되는 함수
  function textDataChange(e) {
    const { name, value } = e.target;
    setTextData((prevState) => {
      return { ...prevState, [name]: value };
    });
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

  return (
    <>
      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="flex my-[20px] gap-[10px]">
          <input
            type="text"
            placeholder="댓글입력"
            className="border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum z-10"
            // z-index를 안넣으면 인풋창 인식이 느려서 넣었습니다
            name="text"
            value={textData.text}
            onChange={textDataChange}
          />
          <button className="w-[50px] bg-da-100 rounded-[50px]">확인</button>
        </div>
      </form>

      {/* 댓글 목록 */}
      {appealComment.map((item) => (
        <div
          key={item._id}
          className="flex justify-between mb-[20px] gap-[20px] items-center w-full"
        >
          <div className="flex items-center gap-1">
            <div className="flex gap-[1px]">
              <img src="/images/commenticon.svg" alt="" className="block" />
              <div className="flex items-center w-[90px]">
                <p className="nanumBold">{item.user.nickName}</p>
                {/* <p className="nanumBold">{item.user}</p> */}
              </div>
            </div>
            <div className="nanum flex-wrap w-[280px] overflow-wrap break-words">
              {item.text}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AppealCommentList;
