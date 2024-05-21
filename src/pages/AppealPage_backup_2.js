import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

// import axiosInstance from "../../utils/axios";
// function AppealPage() {
function AppealPage({}) {
  // userId값 어떻게 가져올지 몰라서 일단 임시로 useParams값으로 가져옴..ㅜㅜ
  const { userId, petId } = useParams();
  const [appealComment, setAppealComment] = useState([]); // set함수는 무조건 재랜더링된다!!!
  // const [appealPostId, setAppealPostId] = useState([]);

  const navigate = useNavigate();
  // let [commentList, setCommentList] = useState([]);   // wldnfdPwjd
  let [textData, setTextData] = useState("");

  // function clickListener() {
  //   let copy = [...commentList];
  //   setCommentList([textData, ...copy]);
  //   setTextData("");
  // }
  const [appealData, setAppealData] = useState([]);
  const [appealPostId, setAppealPostId] = useState([]);

  // 댓글 달아주려고 포스트 작성하는중.....ㅜㅜ
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      // appeal
      text: textData,
    };
    try {
      await axiosInstance.post(`appeal/${userId}/comment`, body);
      setTextData("");
    } catch (error) {
      console.log(error);
    }
  }

  function textDataChange(e) {
    setTextData(e.target.value);
  }

  const keyPressListener = (event) => {
    if (event.key === "Enter") {
      // clickListener(); // Enter 키를 누르면 clickListener 함수 호출
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/appeal/:userId");
        console.log(res.data.appealData);
        setAppealData(res.data.appealData);
        // setAppealPostId()
      } catch (error) {
        // res.status(500).send({ error: error.message });
      }
    };
    fetchData();
  }, []);
  // console.log(appealData);

  useEffect(() => {
    async function fetchAppealComment() {
      try {
        const res = await axiosInstance.get(`/appeal/${userId}/comment`);
        // console.log(appealData._id);
        setAppealComment(res.data.appealComment);
        // console.log(res.data.appealComment);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppealComment();
    // console.log("appealComment" + appealComment);
  }, []);

  // // 상태가 업데이트될 때마다 콘솔에 출력
  // useEffect(() => {
  //   console.log("appealComment:", appealComment);
  // }, [appealComment]);
  return (
    <div className="relative">
      {/* subHeader */}
      <div className="subHeader  bg-ye-700 w-[500px] top-0 fixed h-[240px] text-center mb-[35px] ">
        <div className="h-[50px] border-b-2 mb-3 flex justify-between items-center justify-center">
          <h2>
            <img
              src="/images/backicon.svg"
              alt=""
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer"
            />
          </h2>
          <h2>자랑하개</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>
        <div className="h-[100px] w-[100px] bg-ye-100 m-auto rounded-[50px]  my-[5px]"></div>

        <div className="flex justify-center items-center gap-1">
          <div className="nanumBold">뚜비</div>
          <div>
            <i class="fa-solid fa-mars"></i>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[25px] nanum">"</p>
          <p className="nanum">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <p className="text-[25px] nanum">"</p>
        </div>
      </div>
      {/* 자랑하개 mainview _ subheader와 navbar 중간section 전부 */}
      {/* ======================자랑하개 mainview_ 중간섹션 + 사진 + 글 + 댓글까지 한묶음 start */}

      {appealData.map((item, idx) => {
        setAppealPostId(item._id);
        return (
          <>
            <div className="mt-[240px] mb-[65px] p-3 bg-white border-[1px]">
              <div className="py-10 px-5 ">
                {/* 강아지 아바타 / 닉네임 section 시작 */}
                <div className="flex justify-between mb-[20px]">
                  <div className="flex gap-3">
                    <div className="w-[50px] h-[50px] bg-ye-100 rounded-[50px]"></div>
                    <div>
                      <div className="nanumBold">뚜비</div>
                      <p className="nanum">1일전</p>
                    </div>
                  </div>
                  <div>
                    {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}
                  </div>
                </div>
                {/* 사진, 내용 넣는 section */}
                {/* 실질적인 글 구간 start ============ */}

                <div className="w-[430px] h-[320px] bg-ye-100 m-auto mb-[25px]"></div>
                <div className="text-center mb-[20px]">
                  사진 페이지네이션 들어가야 할 구간
                </div>
                <div className="nanum border-b-2">
                  <p className="nanum mb-[5px]">
                    {item.text}

                    {/* {appealData.map((item, idx) => {
                return (
                  <>
                    <div>{item.text}</div>
                  </>
                );
              })} */}
                  </p>
                </div>
                {/* ============ 실질적인 글 구간 end */}
                {/* 구분선 아래, 댓글입력창부터 시작 */}
                <form onSubmit={handleSubmit}>
                  <div className=" flex my-[20px] gap-[10px]">
                    <input
                      type="text"
                      placeholder="댓글입력"
                      className=" border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum"
                      value={textData}
                      onChange={textDataChange}
                    />
                    <button
                      className="w-[50px] bg-da-100 rounded-[50px] "
                      onKeyPress={keyPressListener} // Enter 키 이벤트 추가
                      // onClick={clickListener}
                    >
                      확인
                    </button>
                  </div>
                </form>
                {/* comment section 시작 */}
                {appealComment.map((item) => {
                  return (
                    <>
                      <div className="flex justify-between mb-[20px] gap-[20px] items-center w-full ">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-[1px] ">
                            <img
                              src="/images/commenticon.svg"
                              alt=""
                              className="block"
                            />
                            <div className="flex items-center w-[90px]">
                              <p className="nanumBold">닉네임6글자</p>
                            </div>
                          </div>
                          <div className="nanum flex-wrap w-[280px] overflow-wrap">
                            {item.text}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                {/* <div className="flex mb-[20px] gap-[20px] items-center ">
            <div className="flex items-center">
              <img src="/images/commenticon.svg" alt="" className="block" />
              <div className="flex items-center w-[90px]">
                <p>닉네임6글자</p>
              </div>
            </div>
            <div className="nanum">{commentList}</div>
          </div> */}
                {/* div*2개 남겨놔야해요 */}
              </div>
            </div>
          </>
        );
      })}

      {/* ======================자랑하개 mainview_ 중간섹션 + 사진 + 글 + 댓글까지 한묶음 end */}
      {/* 글써보개 고정하기위한작업 시작 */}
      <div className="w-[490px] flex justify-end fixed bottom-[90px] ">
        <Link to={`/appealwrite/${userId}`}>
          <div className=" bg-ye-400 text-white navbar py-2 px-3 rounded-[50px] ">
            글써보개
          </div>
        </Link>
      </div>
      {/* 글써보개 고정하기위한작업 끝 */}

      <Navbar />
    </div>
  );
}

export default AppealPage;
