import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

function FileUploadOne({ handleImg }) {
  const [image, setImage] = useState(null);
  async function handleDrop(files) {
    let formData = new FormData();
    formData.append("image", files[0]);

    const config = {
      header: { "content-type": "multipart/form-data" },
      //보낼때 헤더에실어서 보낸다.
      //content-type:"text/html; charset=utf-8" 이렇게 로그 찍힌다.
    };

    try {
      const res = await axiosInstance.post(
        "/user/register/image",
        formData,
        config
      );
      setImage(res.data);
      handleImg(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const res = await axiosInstance.delete(`/user/register/image/${image}`);
      console.log(res.data);
      setImage("");
      handleImg("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center py-5">
      <div className="bg-ye-300 w-[200px] h-[200px] rounded-[25px] flex justify-center items-center relative">
        {image ? (
          <div onClick={handleDelete} className=" absolute right-0 top-0">
            <i className="rounded-full text-[25px] text-red-500  fa-solid fa-circle-xmark"></i>
          </div>
        ) : null}

        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="border border-white border-4 w-[150px] h-[150px] rounded-full flex justify-center items-center overflow-hidden"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {image ? (
                  <img
                    className="w-full h-full"
                    src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                  />
                ) : (
                  <img
                    className="w-[70px] h-[70px]"
                    src="./images/camera1.svg"
                  />
                )}
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default FileUploadOne;
