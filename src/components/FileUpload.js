import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

// images : AppealWritePage에서 받은 이미지
// FileUpload : 이미지 추가 삭제
// AppealWritePage : 이미지들을 서버로 전송
function FileUpload({ images, onImageChange, userId }) {
  console.log("images", images);

  async function handledrop(files) {
    try {
      const formData = new FormData();
      formData.append("image", files[0]); // formData 객체에 드롭된 파일을 image라는 이름으로 추가

      const config = {
        headers: { "content-type": "multipart/form-data" }, // multipart/form-data 타입으로 전달
      };

      const res = await axiosInstance.post(
        `/appeal/${userId}/image`, // 요청 URL
        formData, // 파일
        config
      );
      // abcd(res.data.images);
      console.log("jaeheewiwi", res.data.images); // 서버로부터 받은 이미지 경로

      onImageChange([...images, res.data.images]);
      // ...images : 기존 이미지
      // 서버로부터 받은 새로 업로드 된 이미지 경로
      // 새 이미지 경로 기존 배열에 추가 후 부모 컴포넌트로 전달
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(image) {
    try {
      const res = await axiosInstance.delete(
        `/appeal/${userId}/image/${image}`
      );
      console.log(res.data.images);

      const currentIndex = images.indexOf(image);
      let newImages = [...images];
      newImages.splice(currentIndex, 1);
      onImageChange(newImages);
    } catch (error) {
      console.log("삭제 실패", error);
    }
  }

  const handleClick = (event) => {
    if (images.length >= 3) {
      event.preventDefault();
      alert("최대 이미지 3개까지만 추가 가능합니다.");
    }
  };

  return (
    <div className="flex w-full gap-[20px]">
      <div className=" border-ye-600 mb-[20px]">
        {/* <p> 이미지추가</p> */}
        <Dropzone onDrop={handledrop} noClick={images.length >= 3}>
          {/* 파일이 드롭되면 handledrop 함수 호출 */}
          {({ getRootProps, getInputProps }) => (
            // getInputProps : 파일 선택
            <div
              {...getRootProps({ onClick: handleClick })}
              className="bg-ye-500 w-[80px] h-[80px] p-[10px] rounded-md flex justify-center items-center"
            >
              <input {...getInputProps()} />

              <img
                src="/images/camera1.svg"
                alt=""
                className="w-[45px] h-[45px]"
              />
            </div>
          )}
        </Dropzone>
      </div>
      <div className="flex gap-[25px]">
        {images && // images: 이미지 파일 이름 배열, 파일업로드 선택한 이미지 image: 각 이미지 파일 이름
          images.map((image, index) => {
            const imageUrl = `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`;
            console.log(imageUrl);
            return (
              <div key={index} className="w-[80px] h-[80px] relative">
                <div
                  onClick={() => {
                    handleDelete(image);
                  }}
                  className="w-[20px] h-[20px] flex justify-center items-center absolute bg-white border rounded-[50%] right-[-10px] top-[-10px] text-er-200 cursor-pointer"
                >
                  x
                </div>

                <img
                  src={imageUrl} // ${image} : 이미지의 이름?
                  alt=""
                  className="w-full h-full rounded-md"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FileUpload;
