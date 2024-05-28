import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

function FileFetchOne({ petImage }) {
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
        "/pet/modify/image",
        formData,
        config
      );
      setImage(res.data);

      const deletRes = await axiosInstance.delete(
        `/pet/modify/image/${petImage}`
      );
      console.log(deletRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const res = await axiosInstance.delete(`/user/register/image/${image}`);
      console.log(res.data);
      setImage("");
      //   handleImg("");
    } catch (error) {
      console.log(error);
    }
  }
  console.log("이미지", image);
  return (
    <div className="flex flex-col items-center justify-center mt-[30px] h-auto">
      {image ? (
        <img
          className="w-[100px] h-[100px] rounded-full overflow-hidden"
          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image.fetchImage}`}
        />
      ) : (
        <img
          className="w-[100px] h-[100px] rounded-full overflow-hidden"
          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${petImage}`}
        />
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
