import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import AppealCommentList from "./AppealCommentList";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import "../assets/imageGallery.css";
import { formatDistanceToNow, formatDistance, format } from "date-fns";

// import axiosInstance from "../../utils/axios";
// function AppealPage() {
function AppealPage({}) {
  // userId값 어떻게 가져올지 몰라서 일단 임시로 useParams값으로 가져옴..ㅜㅜ
  const { userId, petId } = useParams();
  // const [appealPostId, setAppealPostId] = useState([]);

  const navigate = useNavigate();

  const [appealData, setAppealData] = useState([]);
  const [appealPostId, setAppealPostId] = useState([]);
  const [mainPet, setMainPet] = useState(null);
  console.log("펫정보에용", mainPet);

  const keyPressListener = (event) => {
    if (event.key === "Enter") {
      // clickListener(); // Enter 키를 누르면 clickListener 함수 호출
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/appeal/${userId}`);
        console.log("재히", res.data.appealData);
        setAppealData(res.data.appealData);

        //gpt
        const postIds = res.data.appealData.map((item) => item._id);
        setAppealPostId(postIds);
      } catch (error) {
        // res.status(500).send({ error: error.message });
      }
    };

    // 펫 리스트 배열화하기????
    const loadPetList = async () => {
      try {
        const resPetList = await axiosInstance.get(`/pet/list/${userId}`);
        // gpt=======
        // console.log("resPetList", resPetList.data.myPetList[0]);
        setMainPet(resPetList.data.myPetList[9]);
        console.log("댕댕이미지주소!!!!!", resPetList.data.myPetList[2].image);
      } catch (error) {}
    };

    fetchData();
    loadPetList();
  }, []);

  return (
    <div className="relative bg-white w-[500px] h-full">
      {/* 서브헤더 시작*/}
      <div className="subHeader  bg-ye-600 w-[500px] top-0 fixed h-[240px] text-center mb-[35px] borde-b z-50 ">
        <div className="h-[50px] border mb-3 flex justify-between items-center ">
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
          <h2 className="text-[20px]">자랑하개</h2>
          <h2 className="invisible">
            <img src="/images/backicon.svg" alt="" />
          </h2>
        </div>
        {/* 헤더 내용 시작 */}
        <div className="grid gap-[3px]">
          <div className="h-[100px] w-[100px] bg-ye-100 m-auto rounded-[50px]  my-[5px]">
            {mainPet && mainPet.image && (
              <img
                src={mainPet.image}
                alt=""
                className="h-full w-full rounded-full"
              />
            )}
          </div>
          <div className="flex justify-center items-center gap-1">
            <div className="nanumBold text-[16px]">
              {mainPet && mainPet.pName}
            </div>
            {/* gpt 조건부 랜더링 */}

            <div>
              {mainPet &&
                (mainPet.pGender === "남" ? (
                  <i className="fa-solid fa-mars"></i>
                ) : mainPet.pGender === "여" ? (
                  <i className="fa-solid fa-venus"></i>
                ) : null)}
            </div>
          </div>
          <div className="flex justify-center ">
            <p className="text-[20px] nanum ">" </p>
            <p className="text-[14px] nanum mt-[3px]">
              {mainPet && mainPet.pCharOne}
            </p>
            <p className="text-[20px] nanum  "> "</p>
          </div>
        </div>
      </div>
      {/* 서브헤더 끝 */}

      {/* {petList.map((item) => {
        return <>{item[0].pName}</>;
      })} */}

      {/* 게시글 시작 */}
      <div className="w-[500px] mt-[240px] bg-white justify-center">
        {appealData.map((item, idx) => {
          const images = item.images.map((image) => ({
            original: `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`,
          }));

          const createdAtDate = new Date(item.createdAt);

          let timeAgo = formatDistance(createdAtDate, new Date(), {
            addSuffix: true,
          });

          timeAgo = timeAgo.replace("about ", "");

          return (
            // 글 내용 묶음 시작
            <div
              className=" bg-white border-[1px] px-[25px] py-[40px]"
              key={idx}
            >
              {/* 글+댓글 시작 */}
              <div className="w-[450px]">
                {/* 사진+텍스트 시작 */}
                <div className="border border-da-800 p-[25px] shadow">
                  {/* 강아지 아바타 / 닉네임 section 시작 */}
                  <div className="w-full flex gap-[15px] mb-[25px] ml-[2px] border-yellow-500">
                    {/* 강아지 사진 시작 */}
                    <div className="w-[50px] h-[50px] rounded-[50px]">
                      {mainPet && mainPet.image && (
                        <img
                          src={mainPet.image}
                          alt=""
                          className="h-full w-full rounded-full"
                        />
                      )}
                    </div>
                    {/* 강아지 사진 끝*/}
                    {/* 강아지 이름 + 날짜 시작*/}
                    <div className="nanumBold text-[15px] mt-[2px]">
                      {mainPet && mainPet.pName}
                      <p className="nanum text-[13px]">{timeAgo}</p>
                    </div>
                    {/* 강아지 이름 + 날짜 끝*/}
                  </div>
                  {/* 강아지 아바타 / 닉네임 section 끝 */}

                  {/* 실질적인 글 구간 start ============ */}
                  <div className="mb-[30px]">
                    <ReactImageGallery
                      items={images}
                      showBullets={true}
                      showThumbnails={false}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      additionalClass="custom-image-gallery"
                    />
                  </div>

                  {/* 글 텍스트 시작 */}
                  {/* 더보기 구현 ㄱ */}
                  <p className="nanumPlus pl-[6px] pb-[10px]">{item.text}</p>
                </div>
                {/* 사진 + 텍스트 */}

                <AppealCommentList
                  keyPressListener={keyPressListener}
                  appealPostId={appealPostId[idx]}
                />
                {/* 댓글 끝 */}
              </div>
              {/* 글 + 댓글 끝 */}
            </div>
            // 글 내용 묶음 끝
          );
        })}
      </div>
      {/* 게시글 끝 */}

      {/* 글써보개 버튼 시작 */}
      <div className="w-[490px] flex justify-end fixed bottom-[90px] ">
        <Link to={`/appealwrite/${userId}`}>
          <div className=" bg-ye-400 text-white navbar py-2 px-3 rounded-[50px] ">
            글써보개
          </div>
        </Link>
      </div>
      {/* 글써보개 버튼 끝 */}
      <Navbar />
    </div>
  );
}

export default AppealPage;
