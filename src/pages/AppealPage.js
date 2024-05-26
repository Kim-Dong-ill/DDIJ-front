import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import AppealCommentList from "./AppealCommentList";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import "../assets/imageGallery.css";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { original } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// import axiosInstance from "../../utils/axios";
// function AppealPage() {
function AppealPage({}) {
  // userId값 어떻게 가져올지 몰라서 일단 임시로 useParams값으로 가져옴..ㅜㅜ
  const { userId, petId } = useParams();
  // const [appealPostId, setAppealPostId] = useState([]);
  // const petImage = useSelector((state) => {
  //   return state.user.userData.pets[0].image;
  //   // console.log(state);
  // });

  const navigate = useNavigate();

  const [appealData, setAppealData] = useState([]);
  const [appealPostId, setAppealPostId] = useState([]);
  const [mainPet, setMainPet] = useState("");
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
        console.log("재히", res.data);
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
        console.log("resPetList", resPetList.data);
        setMainPet(resPetList.data.myPetList[0]);
        // console.log("댕댕이미지주소!!!!!", resPetList.data.myPetList[2].image);
      } catch (error) {}
    };

    fetchData();
    loadPetList();
  }, []);

  // const formatDistanceToNowKorean = (date) => {
  //   const distance = formatDistanceToNow(date, { locale: ko });
  //   return distance;
  // };

  return (
    <div className="relative">
      {/* 서브헤더 시작*/}
      <div className="subHeader  bg-ye-600 w-[500px] top-0 fixed h-[240px] text-center mb-[35px] z-50 ">
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
            {mainPet.image ? (
              <img
                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${mainPet.image}`}
                // alt=""
                className="w-[100px] h-[100px] rounded-full m-auto"
              />
            ) : (
              <img
                src="/images/dog1.svg"
                className="w-[100px] h-[100px] rounded-full m-auto"
              />
            )}
            {appealData.image}
          </div>
          <div className="flex justify-center items-center gap-1">
            <div className="nanumBold text-[16px]">
              {mainPet && mainPet.pName}
            </div>
            {/* gpt 조건부 랜더링 */}

            <div>
              {(mainPet && mainPet.pGender == "male") ||
              (mainPet && mainPet.pGender == "남") ? (
                <i className="text-blue-600 text-[14px] fa-solid fa-mars"></i>
              ) : (
                <i className="text-pink-600 fa-solid text-[14px] fa-venus"></i>
              )}
              {/* <i className="fa-solid fa-mars"></i> */}
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
      {/* 게시글이 없을 경우 나와야 할 문구 */}
      {appealData.length === 0 ? (
        <div className=" bg-white min-h-screen flex items-center justify-center">
          <div className="">
            <p>게시글이 없습니다. 새로운 게시글을 작성해보세요!😘</p>
            <Link to={`/appealwrite/${userId}`}>
              <div className="text-center text-lg cursor-pointer bg-ye-700 rounded-[10px] py-[5px]">
                ❤️🥰우리 강아지도 자랑해보개😎❤️
              </div>
            </Link>
          </div>
        </div>
      ) : (
        // 게시글 데이터가 있을 경우, 게시글 화면 출력
        <div className="mt-[240px] bg-white">
          {appealData.map((item, idx) => {
            const images = item.images.map((image) => ({
              original: `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`,
            }));
            const timeAgo = formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            });
            // const timeAgo = item.createdAt;
            // const timeAgo = formatDistanceToNowKorean(new Date(item.createdAt));
            console.log("날짜", item.createdAt);
            console.log("날짜에용", timeAgo);
            return (
              <div className="p-3 bg-white border-[1px]" key={idx}>
                <div className="py-10 px-5 ">
                  {/* 강아지 아바타 / 닉네임 section 시작 */}
                  <div className="flex gap-[15px] mb-[20px]">
                    <div className="w-[50px] h-[50px] rounded-[50px]">
                      {/* {mainPet && mainPet.image && (
                      <img
                        src={mainPet.image}
                        alt=""
                        className="h-full w-full rounded-full"
                      />
                    )} */}
                      {mainPet.image ? (
                        <img
                          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${mainPet.image}`}
                          // alt=""
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <img
                          src="/images/dog1.svg"
                          className="h-full w-full rounded-full"
                        />
                      )}
                    </div>
                    <div className="nanumBold text-[15px] mt-[2px]">
                      {mainPet && mainPet.pName}
                      <p className="nanum text-[13px]">{timeAgo}</p>
                    </div>
                  </div>
                  {/* 사진, 내용 넣는 section */}
                  {/* 실질적인 글 구간 start ============ */}

                  {/* <div className="w-[430px] h-[320px] m-auto mb-[25px]"> */}
                  {/* <div className="flex"> */}

                  <div className="flex justify-center ">
                    <div className="w-[430px] h-[320px] m-auto mb-[25px] overflow-hidden">
                      <ReactImageGallery
                        items={images}
                        showBullets={true}
                        showThumbnails={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        additionalClass="custom-image-gallery h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                  {/* <div className="text-center mb-[20px]">
                  사진 페이지네이션 들어가야 할 구간
                </div> */}
                  <div className="nanum border-b-2">
                    <p className="nanum mb-[5px]">{item.text}</p>
                  </div>

                  {/* ============ 실질적인 글 구간 end */}

                  <AppealCommentList
                    keyPressListener={keyPressListener}
                    appealPostId={appealPostId[idx]}
                  />
                  {/* div*2개 남겨놔야해요 */}
                </div>
              </div>
            );
          })}
        </div>
        // 게시글 끝
      )}
      <div></div>

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
