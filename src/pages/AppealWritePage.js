import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
import ButtonYe from "../components/ButtonYe";
import ButtonBl from "../components/ButtonBl";

// import axiosInstance from "../utils/axios";
// import { useParams } from "react-router-dom";
import FileUpload from "../components/FileUpload";

import axiosInstance from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

function AppealWritePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [appealData, setAppealData] = useState({
    text: "",
    images: [],
  });
  const [mainPetId, setMainPetId] = useState();

  async function onSubmit(body) {
    console.log(body);
    // body.image = image; // body 객체에 이미지 속성 추가

    try {
      const res = await axiosInstance.post(`/appeal/${userId}`, body); //appeal로 body 전송 요청 완료 후, 응답 res에 저장
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // result -> setImages -> images
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
    console.log(value, name);
    setAppealData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
      <form onSubmit={handleSubmit}>
        {/* <form> */}
        <div className="w-[450px] m-auto px-5 pb-[80px] pt-[150px]">
          <FileUpload
            images={appealData.images} // 선택된 이미지 FileUpload로 전달
            onImageChange={handleImg} // 이미지 선택시 handleImg 호출
            userId={userId} // 유저 아이디 전달
          />

          <textarea
            className="w-full nanum h-[450px] px-[10px] border-b-2 rounded-[10px] resize-none mb-7"
            placeholder="내용을 입력하세요."
            type="text"
            name="text"
            onChange={handleChange}
            value={appealData.text}
          />
          <div className="flex justify-center h-[50px] gap-2 ">
            <ButtonYe>
              <button>등록</button>
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
    </>
  );
}

export default AppealWritePage;
