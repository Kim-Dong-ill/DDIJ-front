import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";

function FileUploadAddPet({ onImageChange, setImage, image }) {
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });

  async function handleDrop(files) {
    console.log(files);
    let formData = new FormData();
    formData.append("image", files[0]);

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log("FileUploadAddPet_이미지", image);
    try {
      const res = await axiosInstance.post(
        `/pet/${loginState}/image`,
        formData,
        config
      );
      console.log(res.data);
      setImage(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete() {
    setImage("");
  }

  return (
    <div className="flex relative justify-center">
      {image ? (
        <div onClick={handleDelete} className=" absolute right-[190px]">
          <i className="rounded-full text-[25px] text-red-500  fa-solid fa-circle-xmark"></i>
        </div>
      ) : null}

      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <>
            <section>
              <div
                className="border border-white border-4 mb-5 w-[100px] h-[100px] rounded-full flex justify-center items-center overflow-hidden"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {image ? (
                  <img
                    className="w-full h-full"
                    src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                  />
                ) : (
                  <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
                    <img
                      src="/images/camera1.svg"
                      className="w-[60px] h-[60px] m-auto"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <div className="w-auto border border-da-300 px-[15px] rounded-xl">
                  <span className="inline-block text-[13px] mr-[3px]">
                    사진추가
                  </span>
                  <img
                    src="/images/plus.svg"
                    className="inline-block align-middle w-[14px] h-[14px]"
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUploadAddPet;
