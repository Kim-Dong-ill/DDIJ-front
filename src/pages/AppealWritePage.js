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
  console.log("데이터", appealData);
  const [mainPetId, setMainPetId] = useState();

  // newImages -> handleImg -> appealData:images -> handleSubmit -> 서버

  // const [image, setImage] = useState();
  // function abcd(img) {
  //   setImage(img);
  // }
  // console.log(image);
  // const [images, setImages] = useState([]); // 이미지 저장

  // async function onSubmit(body) {
  //   console.log(body);
  //   body.image = image; // body 객체에 이미지 속성 추가

  //   try {
  //     const res = await axiosInstance.post(`/appeal/${userId}`, body); //appeal로 body 전송 요청 완료 후, 응답 res에 저장
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  // function handleImage(newImages) {
  //   setAppealData((prevState) => {
  //     return {
  //       ...prevState,
  //       images: newImages,
  //     };
  //   });
  // }

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

          {/* 글자수 제한 필요? */}
          <textarea
            className="w-full nanum h-[450px] px-[10px] border-b-2 rounded-[10px] resize-none mb-7"
            placeholder="내용을 입력하세요."
            type="text"
            name="text"
            onChange={handleChange}
            value={appealData.text}
          />
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

            {/* <button className=" w-[82px] h-[30px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
              등록
            </button>
            <button className=" w-[82px] h-[30px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
              취소
            </button> */}
          </div>
        </div>
      </form>
    </>
  );
}

// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus exercitationem alias, debitis similique velit odio amet, incidunt, ut ipsa iste deserunt earum culpa tempora distinctio soluta! Iusto dignissimos iste voluptatibus dicta, ducimus quae perferendis labore totam fugiat cum tempore excepturi laborum tenetur et recusandae laboriosam veritatis doloribus alias, natus aliquam animi. Libero ducimus obcaecati tempore dolorum mollitia incidunt sequi officia doloribus labore fuga quod, at nisi nulla soluta odio debitis modi numquam? Rem dolores quos delectus voluptatem maiores eius ex quisquam, temporibus, cupiditate aliquam mollitia libero. Vel, quod corrupti. Distinctio impedit, quae architecto nemo velit animi sed! Molestiae, suscipit?

export default AppealWritePage;
