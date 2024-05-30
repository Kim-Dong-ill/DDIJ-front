
import React, { useEffect, useState } from "react";
import Kakao_StrEnd from "../kakaoMap/Kakao_StrEnd";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";

function CCViewPage() {
  const location = useLocation();
  const item = location.state?.item||{};  // 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
    // watch,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  function onSubmit({ textData }) {
    const body = {
      textData,
    };
    textData.preventDefault(); // 폼의 기본제출 동작 막기
    handleInsertComment(textData); // 댓글추가
  }

  let [textData, setTextData] = useState(""); // 댓글 입력
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [circleViewCon, setCircleViewCon] = useState(null); // 모임 content (circles/detail)
  const [moreComments, setMoreComments] = useState(false); // 댓글 더보기
  const userData = useSelector((state) => state.user?.userData); // 유저데이터 가져오기

  const { circleId } = useParams();

  // 댓글 더보기
  const showComments = () => {
    setMoreComments((prevState) => !prevState);
  };

  // handleSubmit
  // function handleSubmit(e) {
  //   e.preventDefault(); // 폼의 기본제출 동작 막기
  //   handleInsertComment(textData); // 댓글추가
  //   setTextData(""); // 입력필드 초기화
  // }

  // onChange

  function textDataChange(e) {
    setTextData(e.target.value);
  }

  // function clickListener() {
  //   let temp = [...commentList];
  //   setCommentList([textData, ...temp]);
  //   setTextData("");
  // }

  // 모임 정보 가져오기
  // useEffect(() => {
  //   async function loadCircleViewCon() {
  //     try {
  //       const res = await axiosInstance.get(`/ciecles`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  // 모임댓글 가져오기 -Get
  useEffect(() => {
    async function comment() {
      try {
        const res = await axiosInstance.get(`circles/${item._id}/comment`);
        if(res){
          setCommentList(res.data.circleComment)
        }
        else{
          setCommentList("댓글이 없습니다.")
        }
      } catch (error) {
        console.log(error);
      }
    }
    comment();
  }, []);

  if (!circleViewCon) return null;

  // 모임댓글 추가-Post
  const handleInsertComment = async (commentContent) => {
    const commentData = {
      content: commentContent,
      circleId: circleId,
      userId: userData.user._id,
    };
    try {
      const res = await axiosInstance.post(
        `/circles/${circleId}/comment`,
        commentData
      );
      const newComment = res.data.comment;
      setCommentList([...commentList, newComment]);
    } catch (error) {
      console.log(error);
    }
  };

  // 모임 댓글 유효성검사
  const commentText = {
    required: {
      value: true,
      message: "댓글을 입력해 주세요.",
    },
    maxLength: {
      value: 50,
      message: "최대 50자 입니다.",
    },
  };


  return (
    <>
      <div className="grid gap-3 bg-da-400 pt-[90px] pb-[100px] border-[1px]">
        <div className="w-[500px] h-[255px] bg-slate-300">
          <Kakao_StrEnd />
        </div>
        <div className="text-wh-100">
          {/* 박스 안 contents start======= */}
          <div className=" border border-da-900 mx-5 my-[30px] rounded-lg p-5">
            <div className="flex mb-[20px] ">
              <img
                src="/images/dog3.svg"
                className="w-[100px] h-[100px] rounded-full"
              />

              <div className="grid gap-[3px] ml-[20px]">
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">이름 :&nbsp;</p>
                  <p className="nanum">봄</p>
                </div>
                <div className="flex text-da-800 text-[15px]">
                  <p className="nanum">나이 :&nbsp;</p>
                  <p className="nanum">11살</p>
                </div>
                <div className="flex text-da-800 text-[15px] items-center">
                  <p className="nanum">성별 :&nbsp;</p>
                  <i class="fa-solid fa-mars"></i>
                </div>
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">특이사항 :&nbsp;</p>
                  <p className="nanum">칭구 조와!!</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="nanumBold text-center"> {item.name}</h2>
            </div>
          </div>
          {/* =======박스 안 contents end */}
          <div className="grid gap-[5px] px-[25px] mb-[20px]">
            <p className="nanumBold text-[18px]">어서오시개</p>
            <hr className="mb-[20px] border-da-900"/>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              출발 : {item.DateData} {item.TimeData}
            </p>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              예상 종료시간  : {item.finishTime.split("T")[1].split(":")[0]}시 {item.finishTime.split("T")[1].split(":")[1]}분
            </p>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              출발 장소 : {item.startAdd}
            </p>
            <hr className="mb-[20px] border-da-900"/>
          </div>
          <div className="grid gap-[5px] px-[25px] mb-[50px]">
            <p className="nanumBold mt-[30px] text-[18px]">소개말</p>
            <hr className="mb-[20px] border-da-900"/>
            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              {item.text}
            </p>
            <hr className="mb-[30px] border-da-900"/>
            <div className="w-full grid gap-3 ">
              <p className="nanumBold mt-[30px] text-[18px]">참석댕명단 {item.nowUser}/{item.peoples}</p>
              {/* 참석자명단시작! - map돌려야합니다 */}
              <div
                  className="w-full h-auto rounded-[10px] flex items-center px-[15px] py-[5px] gap-3 mb-3 border border-da-900">
                <div>
                  <div className="w-[45px] h-[45px] rounded-[50px] bg-slate-300"></div>
                </div>
                <div>
                  <p className="text-wh-100 text-[15px] nanumBold pb-[2px]">
                    겨울이엄마
                  </p>
                  <p className="text-da-800 text-xs nanum">
                    겨울이 여 5세 "활발한 편이에요 / 활동량이 많아요 / 뛰는걸
                    좋아해요"
                  </p>
                </div>
              </div>
              {/* 참석자명단 end - 여기까지 map돌립니다 */}
            </div>
            {/* 글 contents 섹션 완료 */}
            <hr className="my-[30px] border-da-900"/>
            {/* 댓글구간 시작============= */}
            <div>
              <p className="nanumBold text-[18px]">할 말이 있개!</p>
            </div>


            {/* 댓글입력창 */}
            <div
              className=" flex my-[20px] gap-[10px] text-black"
              onClick={handleInsertComment}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <input

                  type="text"
                  placeholder="댓글입력"
                  className=" border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum"
                  onChange={textDataChange}
                  value={textData}

                  id="commentText"
                  {...register("commentText", commentText)}
                />
                {error.commentText && <div>{error.commentText.message}</div>}
                <button
                  className="w-[50px] bg-da-100 rounded-[50px]"
                  // onClick={clickListener}
                  type="submit"
                >
                  등록
                </button>
              </form>

            </div>
            {/* <div className="flex justify-between mb-[20px] gap-[20px] items-center w-full">
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px] ">
                  <img
                    src="/images/commenticon_white.svg"
                    alt=""
                    className="block"
                  />
                  <div className="flex items-center w-[90px]">
                    <p className="nanumBold">닉네임6글자</p>
                  </div>
                </div> */}


            {commentList
              .slice(0, moreComments ? commentList.length : 1)
              .map((item, idx) => {
                return (
                  <>
                    <div
                      className="flex justify-between mb-[20px] gap-[20px] items-center w-full"
                      comment={item}
                      key={idx}
                    >
                      <div className="flex items-center gap-1">
                        <div className="flex gap-[1px] ">
                          <img
                            src="/images/commenticon_white.svg"
                            alt=""
                            className="block"
                          />
                          <div className="flex items-center w-[90px]">
                            <p className="nanumBold">{item.user.nickName}</p>
                          </div>
                        </div>
                        <div className="nanum flex-wrap w-[280px] overflow-wrap">
                          {item.content}

                        </div>
                      </div>
                    </div>
                  </>

                );
              })}

            {/* </div>
            </div> */}
            {/*=============== 댓글구간 끝 */}
          </div>
          <div className="w-full flex justify-center">
            <button
              className="fixed bottom-[60px] w-[150px] h-[40px] m-auto text-[13px] text-center rounded-[20px] bg-ye-600 text-black my-4"
              onClick={() => {
                alert("참석완료");
              }}
            >
              참석하기 {item.nowUser}/{item.peoples}
              {/* 정원 꽉 차면 버튼색상 #222222 - 정원이 다 찼개... 로 버튼변경  */}
              {/* 참석하기 완료되면 취소하기 버튼으로 버튼 변경 - #313131 */}
              {/* 글작성자의 경우 수정하기 / 삭제하기 버튼으로 노출 - #313131 */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CCViewPage;
