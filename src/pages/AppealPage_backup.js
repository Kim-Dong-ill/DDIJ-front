import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

// import axiosInstance from "../../utils/axios";
// function AppealPage() {
function AppealPage({}) {
  const { petId } = useParams();
  // console.log(petId);
  const navigate = useNavigate();
  let [commentList, setCommentList] = useState([]);
  let [textData, setTextData] = useState("");
  function clickListener() {
    let copy = [...commentList];
    setCommentList([textData, ...copy]);
    setTextData("");
  }

  // const appealData = async () => {};

  function textDataChange(e) {
    setTextData(e.target.value);
  }

  const keyPressListener = (event) => {
    if (event.key === "Enter") {
      clickListener(); // Enter 키를 누르면 clickListener 함수 호출
    }
  };

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
            <div>{/* <i class="fa-solid fa-ellipsis-vertical"></i> */}</div>
          </div>
          {/* 사진, 내용 넣는 section */}
          {/* 실질적인 글 구간 start ============ */}

          <div className="w-[430px] h-[320px] bg-ye-100 m-auto mb-[25px]"></div>
          <div className="text-center mb-[20px]">
            사진 페이지네이션 들어가야 할 구간
          </div>
          <div className="nanum border-b-2">
            <p className="nanum mb-[5px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
              minus pariatur repellendus similique omnis velit quas, alias quam
              laboriosam nesciunt?
            </p>
          </div>
          {/* ============ 실질적인 글 구간 end */}
          {/* 구분선 아래, 댓글입력창부터 시작 */}
          <div className=" flex my-[20px] gap-[10px]">
            <input
              type="text"
              placeholder="댓글입력"
              className=" border w-[365px] rounded-[25px] px-[10px] py-[5px] nanum"
              value={textData}
              onChange={textDataChange}
              onKeyPress={keyPressListener} // Enter 키 이벤트 추가
            />
            <button
              className="w-[50px] bg-da-100 rounded-[50px] "
              onClick={clickListener}
            >
              확인
            </button>
          </div>
          {/* comment section 시작 */}
          {commentList.map((item) => {
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
                      {item}
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
      {/* ======================자랑하개 mainview_ 중간섹션 + 사진 + 글 + 댓글까지 한묶음 end */}
      {/* 글써보개 고정하기위한작업 시작 */}
      <div className="w-[490px] flex justify-end fixed bottom-[90px] ">
        <Link to={`/appealwrite/${petId}`}>
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
