import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

// newImageName이 서버에서 받아온 새이미지고 setImage를 통해서 image에 저장 image는 새 이미지 파일을 받아 화면에 표시

// MyPetModifyPage에서 받아온 이미지
function FileFetchOne({ petImage, onImageChange, petData }) {
  const [image, setImage] = useState(null); // 부모한테 받아온 petImage를 초기상태 image로 설정

  // petImage가 변경되면 image도 업데이트
  // image 초기상태를 PetImage(기존 이미지)로 설정하기 때문에 필요
  useEffect(() => {
    setImage(petImage);
  }, [petImage]);

  // Dropzone을 통해 이미지를 업로드 하면 handleDrop 호출
  // 이미지를 서버에 업로드 후 서버에서 반환된 새로운 이미지를 newImageName에 저장
  const handleDrop = async (files) => {
    try {
      // 새 이미지를 서버에 업로드
      const formData = new FormData();
      formData.append("image", files[0]);

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

      const newImageName = uploadResponse.data.newImageName; // 서버 응답에서 이미지 파일명 가져오기

      console.log("업로드된 새 이미지 이름:", newImageName);
      // 새 이미지를 서버에서 받은 후에 이미지 업데이트
      setImage(newImageName); // 새 이미지를 image로 상태 업데이트 newImageName: 새 이미지 파일
      onImageChange(newImageName); // 새 이미지를 onimageChange를 통해 부모 컴포넌트에 전달

      // 새 이미지 파일과 기존 이미지 파일이 다르면 기존 이미지 삭제
      if (newImageName !== petImage) {
        await axiosInstance.delete(`/pet/modify/image/${petImage}`);
        console.log("이미지 삭제 함 petImage", petImage);
      }

      // 성공 메시지 표시
      console.log("이미지 변경 성공 newImageName", newImageName);
    } catch (error) {
      console.log("이미지 변경 에러:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[30px] h-auto">
      {/* {image ? (
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
        </>
      )} */}
      <img
        className="w-[100px] h-[100px] rounded-full overflow-hidden"
        src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
      />
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
