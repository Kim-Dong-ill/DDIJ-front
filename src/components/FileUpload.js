import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addImage } from "../store/actions/addImage";

function FileUpload({ images, onImageChange }) {
  //  const dispatch = useDispatch();
  async function handledrop(files) {
    console.log(files);
    let formData = new FormData();
    formData.append("image", files[0]);

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    try {
      const res = await axiosInstance.post("/appeal/image", formData, config);
      console.log(res.data);
      onImageChange([...images, res.data]);
      // dispatch(addImage(res.data));
      // Redux 상태에 이미지 추가
    } catch (error) {
      console.log(error);
    }
  }

  // function FileUpload({ images, onImageChange }) {
  //   const { userId } = useParams();
  //   const [appealImage, setAppealImage] = useState({
  //     // text: "",
  //     images: [],
  //   });
  //   const [mainPetId, setMainPetId] = useState("");
  //   const [error, setError] = useState(null);

  //   async function handledrop(files) {
  //     let formData = new FormData();
  //     formData.append("image", files[0]);
  //     // formData.append("text", appealImage.text);
  //     formData.append("mainPetId", mainPetId);

  //     const config = {
  //       header: { "content-type": "multipart/form-data" },
  //     };

  //     try {
  //       const res = await axiosInstance.post(
  //         `/appeal/${userId}`,
  //         formData,
  //         config
  //       );
  //       console.log(res.data);
  //       onImageChange([...images, res.data.image]); // res.data에 이미지 URL이 담겨 있다고 가정
  //       setAppealImage((prevState) => ({
  //         ...prevState,
  //         images: [...prevState.images, res.data.image],
  //       }));
  //       setError(null);
  //     } catch (error) {
  //       console.log(error);
  //       setError("파일 업로드 중 오류가 발생했습니다.");
  //     }
  //   }

  //   function handleImage(newImages) {
  //     setAppealImage((prevState) => {
  //       return {
  //         ...prevState,
  //         images: newImages,
  //       };
  //     });
  //   }
  // function handleDelete(image) {
  //   const currentIndex = images.indexOf(image);
  //   let newImages = [...images];
  //   newImages.splice(currentIndex, 1);
  //   onImageChange(newImages);
  // }
  return (
    <div className="flex w-full gap-[20px]">
      <div className=" border-ye-600 mb-[20px]">
        <Dropzone onDrop={handledrop}>
          {({ getRootProps, getInputProps }) => (
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
        {images.map((image) => {
          return (
            <div key={image} className="w-[80px] h-[80px]">
              {/* <div
                onClick={() => {
                  handleDelete(image);
                }}
              >
                x
              </div> */}
              <img
                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
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
