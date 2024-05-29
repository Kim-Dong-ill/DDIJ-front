import React, { useEffect, useState } from "react";
import ButtonYe from "../components/ButtonYe";
import ButtonBl from "../components/ButtonBl";
import axiosInstance from "../utils/axios";
import FileUpload from "../components/FileUpload";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function AppealWritePage() {
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  const navigate = useNavigate();
  const { userId } = useParams();
  const [appealData, setAppealData] = useState({
    text: "",
    images: [],
  });
  console.log("데이터", appealData);
  const [mainPetId, setMainPetId] = useState();
  const [textLength, setTextLength] = useState(0);
  const maxTextLength = 300; // 글자수 제한 설정

  // newImages -> handleImg -> appealData:images -> handleSubmit -> 서버

  // result -> setImages -> images
  // newImages : FileUpload에서 보낸 이미지 파일들
  function handleImg(newImages) {
    setAppealData((prevState) => {
      return {
        ...prevState,
        images: newImages,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      ...appealData,
      mainPetId: mainPetId,
      // img: image,
    };
    try {
      await axiosInstance.post(`/appeal/${userId}`, body);
      navigate(`/appeal/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "text") {
      // 입력된 텍스트 비교
      if (value.length <= maxTextLength) {
        // 화면에 텍스트 길이 표시
        setTextLength(value.length);
      }
      setAppealData((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  }

  useEffect(() => {
    async function findMainPet() {
      try {
        const res = await axiosInstance.get(`/mainpet/${userId}`);
        console.log(res.data);
        setMainPetId(res.data.mainPetId._id);
      } catch (error) {
        console.log(error);
      }
    }
    findMainPet();
  }, []);

  return (
    <>
      {loginState == userId ? (
        <form onSubmit={handleSubmit}>
          {/* <form> */}
          <div className="w-[500px] bg-white border px-12 pb-[80px] pt-[120px]">
            <FileUpload
              images={appealData.images} // 선택된 이미지 FileUpload로 전달
              onImageChange={handleImg} // 이미지 선택시 handleImg 호출
              userId={userId} // 유저 아이디 전달
            />
            {/* 입력 글자 수 표시 */}
            <div className="relative w-[400px] mb-7">
              <textarea
                className="w-full nanum h-[450px] px-[10px] resize-none border border-li-100 rounded-[5px]"
                placeholder="내용을 입력하세요."
                type="text"
                name="text"
                onChange={handleChange}
                value={appealData.text}
                maxLength={maxTextLength}
              />
              <div className="absolute bottom-4 right-3 nanum text-da-500 text-sm">
                {textLength}/{maxTextLength}
              </div>
            </div>
            <div className="flex justify-center h-[50px] gap-2 ">
              <ButtonYe type="submit">
                {/* <button>등록</button> */}
                등록
              </ButtonYe>
              <ButtonBl
                onClick={() => {
                  navigate(-1);
                }}
              >
                취소
              </ButtonBl>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-[500px] bg-white border min-h-screen px-12 pb-[120px] pt-[120px]">
          <img src="/images/errorPage05.svg" alt="" />
        </div>
      )}
    </>
  );
}

export default AppealWritePage;
