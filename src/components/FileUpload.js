import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

// images : AppealWritePage에서 받은 이미지
function FileUpload({ images, onImageChange, userId }) {
  const [newImages, setNewImages] = useState([]); // 업로드 이미지 저장
  console.log("images", images);
  //  const dispatch = useDispatch();

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
      console.log("jaeheewiwi", res.data.images); // 서버로부터 받은 이미지 경로

      setNewImages([...images, res.data.images]); // 서버로부터 받은 이미지 경로를 newImages에 추가
      onImageChange([...images, res.data.images]); // 부모 컴포넌트로 이미지 경로 전달

      // onImageChange([...images, res.data.filename]);
      // dispatch(addImage(res.data));
      // Redux 상태에 이미지 추가
    } catch (error) {
      console.log(error);
    }
  }

  // // image :삭제하려는 이미지
  // function handleDelete(image) {
  //   // images 배열에서 image 인덱스를  찾고 currentIndex 변수에 저장
  //   // images : 컴포넌트의 props로 전달된 이미지 배열
  //   const currentIndex = images.indexOf(image);
  //   // images 복사하여 newImages 생성
  //   let newImages = [...images];
  //   // newImages 배열에서 currentIndex 배열 위치에 있는 요소를 제거
  //   newImages.splice(currentIndex, 1);
  //   // newImages 배열을 onImageChange에 전달하여 부모 컴포넌트의 상태를 업데이트
  //   onImageChange(newImages);
  // }

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

  return (
    <div className="flex w-full gap-[20px]">
      <div className=" border-ye-600 mb-[20px]">
        <Dropzone onDrop={handledrop}>
          {/* 파일이 드롭되면 handledrop 함수 호출 */}
          {({ getRootProps, getInputProps }) => (
            // getInputProps : 파일 선택
            <div
              {...getRootProps()}
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
        {images &&
          images.map((images, index) => {
            // image : 이미지 파일이름
            // index : 요소의 인덱스
            const imageUrl = `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${images}`;
            console.log(imageUrl);
            return (
              <div key={index} className="w-[80px] h-[80px] relative">
                <div
                  onClick={() => {
                    handleDelete(images);
                  }}
                  className="w-[20px] h-[20px] flex justify-center items-center bg-red-400 absolute rounded-[50%] right-[-10px] top-[-10px]"
                >
                  x
                </div>

                <img
                  src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${images}`} // ${image} : 이미지의 이름?
                  alt=""
                  className="w-full h-auto rounded-md"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FileUpload;
