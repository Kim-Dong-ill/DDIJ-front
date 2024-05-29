import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

// newImageName이 서버에서 받아온 새이미지고 setImage를 통해서 image에 저장 image는 새 이미지 파일을 받아 화면에 표시

// MyPetModifyPage에서 받아온 이미지
function FileFetchOne({ petImage, onImageChange, petData }) {
  console.log("재ㅣ재히 petImage", petImage);
  //   const [newImage, setNewImage] = useState(null);
  const [image, setImage] = useState(petImage);
  console.log("이ㅣ미지 image", image);

  const handleDrop = async (files) => {
    try {
      // 새 이미지를 서버에 업로드
      const formData = new FormData();
      formData.append("image", files[0]);
      console.log("펫데이터", petData._id);
      const uploadResponse = await axiosInstance.put(
        `/pet/modify/image/${petData._id}`,
        formData,
        // body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newImageName = uploadResponse.data.newImageName;

      // image:현재 이미지 petImage: 처음에 받아온 이미지
      if (newImageName !== petImage) {
        await axiosInstance.delete(`/pet/modify/image/${petImage}`);
        console.log("이미지 삭제 함 petImage", petImage);
      }

      // 새 이미지로 상태 업데이트 newImageName: 새 이미지 파일
      setImage(newImageName);

      // 부모 컴포넌트로 새로운 이미지를 전달하는 콜백 함수 호출
      onImageChange(newImageName);

      // 성공 메시지 표시
      console.log("이미지 변경 성공 newImageName", newImageName);
    } catch (error) {
      console.log("이미지 변경 에러:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[30px] h-auto">
      {image ? (
        <img
          className="w-[100px] h-[100px] rounded-full overflow-hidden"
          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
        />
      ) : (
        <>
          <img
            className="w-[100px] h-[100px] rounded-full overflow-hidden border"
            src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${petImage}`}
          />
          <span>이미지 없어</span>
        </>
      )}
      <div className="mt-[18px] w-auto">
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="border-black border px-3 text-black rounded-full cursor-pointer hover:shadow-md"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <span class="mr-2 text-[14px]">사진 변경</span>
                <i class="fa-solid fa-camera fa-sm"></i>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default FileFetchOne;

// 사용자가 handleDrop함수를 호출해서 새로운 이미지를 업로드하면  petImage를 받아와서 image랑 비교 한 다음에 다르면 기존 petImage를 삭제하고 newImageName에 새 이미지 파일명을 담아서 setImage를 통해서 image에 새로운 이미지를 업로드
// 사용자가 handleDrop 함수를 통해 업로드한 새로운 이미지를 newImageName의 저장
// 수정페이지에서 받아온 기존 이미지(petImage)를 새로운 이미지(newImageName)랑 비교 후 다르다면 기존 이미지는 삭제
// 새 이미지를 서버에 업로드 -> newImageName
// newImageName을 setImage를 통해 image에 저장
