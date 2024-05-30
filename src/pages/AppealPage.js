import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import AppealCommentList from "./AppealCommentList";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import "../assets/imageGallery.css";
import { formatDistanceToNow, formatDistance, format } from "date-fns";
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

  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });

  const navigate = useNavigate();

  const [appealData, setAppealData] = useState([]);
  const [appealPostId, setAppealPostId] = useState([]);
  const [mainPet, setMainPet] = useState("");

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
    <div className="relative bg-white w-[500px] h-full">
      <div className="subHeader bg-ye-600 w-[500px] top-0 fixed h-[240px] text-center mb-[35px] border z-50">
        <div className="h-[50px] border mb-3 flex justify-between items-center">
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
          <div className="flex justify-center">
            <p className="text-[20px] nanum">" </p>
            <p className="text-[14px] nanum mt-[3px]">
              {mainPet && mainPet.pCharOne}
            </p>
            <p className="text-[20px] nanum"> "</p>
          </div>
        </div>
      </div>
      {/* {petList.map((item) => {
        return <>{item[0].pName}</>;
      })} */}

      {/* 게시글 시작 */}
      {appealData.length === 0 ? (
        userId === loginState ? (
          <div className="bg-white min-h-screen flex items-center justify-center">
            <div>
              <p className="text-center">
                게시글이 없습니다. 새로운 게시글을 작성해보세요!😘
              </p>
              <Link to={`/appealwrite/${userId}`}>
                <div className="text-center text-lg cursor-pointer bg-ye-700 rounded-[10px] py-[5px]">
                  ❤️🥰우리 강아지도 자랑해보개😎❤️
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white min-h-screen flex items-center justify-center">
            <div>
              <p className="text-center">아직 이 칭구 소식은 알 수 없개...🥲</p>
              <Link to={"/"}>
                <div className="text-center text-lg cursor-pointer bg-ye-700 rounded-[10px] py-[5px]">
                  ❤️다른 댕댕이들도 둘러보러 떠나보개❤️
                </div>
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="w-[500px] mt-[240px] mb-[65px] bg-white justify-center">
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
                className=" bg-white border-[1px] px-[25px] pt-[50px] pb-[60px]"
                key={idx}
              >
                {/* 글+댓글 시작 */}
                <div className="w-[450px]">
                  {/* 사진+텍스트 시작 */}
                  <div className="border border-da-800 p-[25px] shadow">
                    {/* 강아지 아바타 / 닉네임 section 시작 */}
                    <div className="w-full flex gap-[15px] mb-[25px] ml-[2px] border-yellow-500">
                      {/* 강아지 사진 시작 */}

                      {mainPet.image ? (
                        <img
                          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${mainPet.image}`}
                          // alt=""
                          className="w-[50px] h-[50px] rounded-[50px]"
                        />
                      ) : (
                        <img
                          src="/images/dog1.svg"
                          className="w-[50px] h-[50px] rounded-[50px]"
                        />
                      )}
                      {appealData.image}

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
                    <p className="nanum pl-[6px] pb-[10px]">{item.text}</p>
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
      )}
      {/* 게시글 끝 */}

      {userId == loginState ? (
        <div className="w-[490px] flex justify-end fixed bottom-[90px]">
          <Link to={`/appealwrite/${userId}`}>
            <div className="bg-ye-400 text-white navbar py-2 px-3 rounded-[50px]">
              글써보개
            </div>
          </Link>
        </div>
      ) : null}

      <Navbar />
    </div>
  );
}

export default AppealPage;
