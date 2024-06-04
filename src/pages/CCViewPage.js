import React, { useEffect, useState } from "react";
import Kakao_StrEnd from "../kakaoMap/Kakao_StrEnd";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CCViewPage() {
  const location = useLocation();
  // const item = location.state?.item || {}; // 유효성 검사
  const [item, setItem] = useState(); // 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  let [textData, setTextData] = useState(""); // 댓글 입력
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [moreComments, setMoreComments] = useState(false); // 댓글 더보기
  const [circleUserData, setCircleUserData] = useState([]); // 모임 사용자 데이터
  const userData = useSelector((state) => state.user?.userData); // 유저데이터 가져오기
  const [startLoc, setStartLoc] = useState(); //모임 출발 좌표
  const [endLoc, setEndLoc] = useState(); //모임 도착 좌표
  const { circleId } = useParams();

  useEffect(() => {
    setItem(location.state?.item || {});
    console.log(location.state.item.endLoc.endCoordinates);
    console.log(location.state.item.startLoc.coordinates);
    setStartLoc(location.state.item.startLoc.coordinates);
    setEndLoc(location.state.item.endLoc.endCoordinates);
  }, [location]);

  async function onSubmit({ commentText }) {
    handleInsertComment(commentText); // 댓글추가
    reset();
  }
  // 댓글 더보기
  const showComments = () => {
    setMoreComments((prevState) => !prevState);
  };

  function textDataChange(e) {
    setTextData(e.target.value);
  }

  function clickListener() {
    let temp = [...commentList];
    setCommentList([textData, ...temp]);
    setTextData("");
  }

  // 모임댓글 가져오기 -Get
  useEffect(() => {
    async function fetchData() {
      try {
        const resForUser = await axiosInstance.get(
          `circles/detail/${circleId}`
        );
        const tempData = resForUser.data.member;
        console.log(resForUser.data);
        console.log(resForUser.data.userData.pets);
        setCircleUserData(Array.isArray(tempData) ? tempData : []); // 사용자 데이터를 상태로 설정, 배열이 아닌 경우 빈 배열로 설정
        // const res = await axiosInstance.get(`circles/${circleId}/comment`);
        // if (res.data.circleComment.length) {
        //   setCommentList(res.data.circleComment);
        // } else {
        //   setCommentList(["댓글이 없습니다."]);
        // }
      } catch (error) {
        console.log(error);
      }
    }
    if (circleId) {
      fetchData();
    }
  }, [circleId]);

  const fetchCircleUserData = async () => {
    try {
      const resForUser = await axiosInstance.get(`circles/detail/${circleId}`);
      // const tempPetData = resForUser.data.userData.mainPet
      const tempData = resForUser.data.member;
      setCircleUserData(Array.isArray(tempData) ? tempData : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCircleMember = async () => {
    try {
      const response = await axiosInstance.patch(`/circles/${circleId}/join`, {
        userId: userData.user.id,
      });
      if (response.status === 200) {
        setItem((prevItem) => ({
          ...prevItem,
          users: [...prevItem.users, userData.user.id],
          nowUser: prevItem.nowUser + 1,
        }));
        fetchCircleUserData();
        alert("참석 완료!");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || "참석에 실패했습니다.");
    }
  };

  const handleRemoveCircleMember = async () => {
    if (userData.user.id === item.user) {
      alert("작성자는 취소할 수 없습니다.");
      return;
    }

    try {
      console.log("이제취소할거다?" + userData.user.id);

      const response = await axiosInstance.patch(`/circles/${circleId}/leave`, {
        userId: userData.user.id,
      });
      if (response.status === 200) {
        setItem((prevItem) => ({
          ...prevItem,
          users: prevItem.users.filter((id) => id !== userData.user.id),
          nowUser: prevItem.nowUser - 1,
        }));
        fetchCircleUserData();
        alert("취소 완료!");
      }
    } catch (error) {
      console.log("프론트에서띄우는에러" + error.stack);
      console.log(error.message);
      alert(error.response.data.message || "취소에 실패했습니다.");
    }
  };

  function checkPeople(circleData) {
    if (circleData.users.length < circleData.peoples) {
      return true;
    } else return false;
  }

  // 모임댓글 추가-Post
  const handleInsertComment = async (commentContent) => {
    const commentData = {
      content: commentContent,
      circleId: circleId,
      userId: userData.user.id,
    };
    try {
      const res = await axiosInstance.post(
        `/circles/${circleId}/comment`,
        commentData
      );
      const newComment = res.data.circleComment;
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
          <Kakao_StrEnd startLoc={startLoc} endLoc={endLoc} />
        </div>
        <div className="text-wh-100">
          {/* 박스 안 contents start======= */}
          <div className=" border border-da-900 mx-5 my-[35px] rounded-lg p-5">
            <div className="flex mb-[20px] ">
              <img
                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/f035eaf8-f3ad-4c2f-95c8-f113d9088d9e.jpeg`} //{userData.pets[0].pImage}
                className="w-[100px] h-[100px] rounded-full"
              />

              <div className="grid gap-[3px] ml-[20px]">
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">이름 :&nbsp;</p>
                  <p className="nanum">{userData.pets[0].pName}</p>
                </div>
                <div className="flex text-da-800 text-[15px]">
                  <p className="nanum">나이 :&nbsp;</p>
                  <p className="nanum">{userData.pets[0].pAge}살</p>
                </div>
                <div className="flex text-da-800 text-[15px] items-center">
                  <p className="nanum">성별 :&nbsp;</p>
                  <i class=" text-blue-500 fa-solid fa-mars"></i>
                </div>
                <div className="flex text-da-800 text-[15px] ">
                  <p className="nanum">특이사항 :&nbsp;</p>
                  <p className="nanum">{userData.pets[0].pCharOne}</p>
                </div>
              </div>
            </div>
            <div>
              <hr className="mb-[20px] border-da-900" />
              <h2 className="nanumBold text-center">{item?.name}</h2>
            </div>
          </div>
          {/* =======박스 안 contents end */}

          <div className="grid gap-[5px] px-[25px] ">
            <p className="nanumBold text-[18px] mb-3">어서오시개</p>
            <p className="nanum text-[15px] text-da-800 mb-1">
              시작시간 : {item?.DateData} {item?.TimeData}
            </p>
            <p className="nanum text-[15px] text-da-800 mb-1">
              예상 종료시간 : {item?.finishTime.split("T")[1].split(":")[0]}시{" "}
              {item?.finishTime.split("T")[1].split(":")[1]}분
            </p>
            <p className="nanum text-[15px] text-da-800 mb-6">
              출발 장소 : {item?.startAdd}
            </p>
            <hr className="mb-[20px] border-da-900" />
          </div>
          <div className="grid gap-[5px] px-[25px]">
            <p className="nanumBold  text-[18px]">소개말</p>
            <p className="nanum text-[15px] text-da-800 mb-6">{item?.text}</p>
            <hr className="mb-[20px] border-da-900" />

            <p className="nanum text-[15px] text-da-800 mb-[20px]">
              {item?.text}
            </p>
            <hr className="mb-[30px] border-da-900" />
            <div className="w-full grid gap-3 ">
              <p className="nanumBold text-[18px]">
                참석댕명단 {item?.nowUser}/{item?.peoples}
              </p>
              {/* 참석자명단시작! - map돌려야합니다 */}
              {Array.isArray(circleUserData) ? (
                circleUserData.map((user, idx) => (
                  <div
                    key={idx}
                    className="w-full h-auto rounded-[10px] flex items-center px-[15px] py-[5px] gap-3 mb-3 border border-da-900"
                  >
                    <div>
                      <div className="w-[45px] h-[45px] rounded-[50px] bg-slate-300"></div>
                    </div>
                    <div>
                      <p className="text-wh-100 text-[18px] nanumBold pb-[2px]">
                        {user.mainPetName}
                      </p>
                      <p className="text-da-800 text-xs nanum">
                        {user.mainPetAge}세 {user.mainPetBreed}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
              {/* 참석자명단 end - 여기까지 map돌립니다 */}
            </div>
            {/* 글 contents 섹션 완료 */}
            <hr className="my-[20px] border-da-900" />
            {/* 댓글구간 시작============= */}
            <div>
              <p className="nanumBold text-[18px]">할 말이 있개!</p>
            </div>

            {/* 댓글입력창 */}
            <div
              className="w-full flex my-[20px] gap-[10px] text-black"
              onClick={handleInsertComment}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="w-[440px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="댓글입력"
                    className=" border w-full rounded-[5px] px-[10px] py-[5px] nanum pr-10"
                    onChange={textDataChange}
                    value={textData}
                    id="commentText"
                    {...register("commentText", commentText)}
                  />
                  {errors.commentText && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.commentText.message}
                    </div>
                  )}
                  <button
                    onClick={clickListener}
                    className="absolute top-1/2 transform -translate-y-1/2 right-4"
                    // onClick={clickListener}
                    type="submit"
                  >
                    <i class="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
            {commentList
              .slice(0, moreComments ? commentList.length : 1)
              .map((comment, idx) => {
                return (
                  <div
                    className="flex justify-between mb-[20px] gap-[20px] items-center w-full"
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
                          <p className="nanumBold">{comment.user?.nickName}</p>
                        </div>
                      </div>
                      <div className="nanum flex-wrap w-[280px] overflow-wrap">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* 댓글 더보기 */}
            {commentList.length > 1 && (
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

            {/* </div>
            </div> */}
            {/*/!*=============== 댓글구간 끝 *!/*/}
          </div>
          <div className="w-full flex justify-center">
            {}
            {item?.users.includes(userData.user.id) ? (
              <button
                className="fixed bottom-[60px] w-[150px] h-[40px] m-auto text-[13px] text-center rounded-[20px] bg-ye-600 text-black my-4"
                onClick={handleRemoveCircleMember}
              >
                취소하기 {item?.nowUser}/{item?.peoples}
              </button>
            ) : (
              <button
                className="fixed bottom-[60px] w-[150px] h-[40px] m-auto text-[13px] text-center rounded-[20px] bg-ye-600 text-black my-4"
                onClick={handleAddCircleMember}
              >
                참석하기 {item?.nowUser}/{item?.peoples}
              </button>
            )}
            {/* 정원 꽉 차면 버튼색상 #222222 - 정원이 다 찼개... 로 버튼변경  */}
            {/* 참석하기 완료되면 취소하기 버튼으로 버튼 변경 - #313131 */}
            {/* 글작성자의 경우 수정하기 / 삭제하기 버튼으로 노출 - #313131 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CCViewPage;
