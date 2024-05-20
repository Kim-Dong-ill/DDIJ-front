import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

function AppealCommentList(props) {
  const { userId } = useParams();
  const [appealComment, setAppealComment] = useState([]); // set함수는 무조건 재랜더링된다!!!
  let [textData, setTextData] = useState({
    text: "",
  });
  function textDataChange(e) {
    const { name, value } = e.target;
    setTextData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  // 댓글 달아주려고 포스트 작성하는중.....ㅜㅜ
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      appealPostId: props.appealPostId,
      text: textData.text,
    };
    try {
      await axiosInstance.post(`appeal/${userId}/comment`, body);
      setTextData({ text: "" });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchAppealComment() {
      try {
        const res = await axiosInstance.get(`/appeal/${userId}/comment`);
        // console.log(props.appealPostId);
        console.log(res.data.appealComment);
        // console.log(res.data.appealComment);

        setAppealComment(res.data.appealComment);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppealComment();
    // console.log("appealComment" + appealComment);
  }, []);

  return (
    <>
      {/* 구분선 아래, 댓글입력창부터 시작 */}
      <form onSubmit={handleSubmit}>
        <div className=" flex my-[20px] gap-[10px]">
          <input
            type="text"
            placeholder="댓글입력"
            className=" border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum"
            // name="text"
            name="text"
            value={textData.text}
            onChange={textDataChange}
          />
          <button
            className="w-[50px] bg-da-100 rounded-[50px] "
            // onKeyPress={props.keyPressListener} // Enter 키 이벤트 추가
            // onClick={clickListener}
          >
            확인
          </button>
        </div>
      </form>
      {/* comment section 시작 */}
      {/* {props.appealPostId} */}
      {appealComment.map((item) => {
        return (
          <>
            <div className="flex justify-between mb-[20px] gap-[20px] items-center w-full ">
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px] ">
                  <img src="/images/commenticon.svg" alt="" className="block" />
                  <div className="flex items-center w-[90px]">
                    <p className="nanumBold">닉네임6글자</p>
                  </div>
                </div>
                <div className="nanum flex-wrap w-[280px] overflow-wrap">
                  {item.text}
                  {/* /{props.appealPostId} */}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default AppealCommentList;
