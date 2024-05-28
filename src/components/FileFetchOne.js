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

  // async function handleDelete() {
  //   try {
  //     const res = await axiosInstance.delete(`/user/register/image/${image}`);
  //     console.log(res.data);
  //     setImage("");
  //     //   handleImg("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  console.log("이미지", image);
  return (
    <div className="flex justify-center mt-[30px] relative">
      {image ? (
        <img
          className="border border-white border-4 w-[150px] h-[150px] rounded-full overflow-hidden"
          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image.fetchImage}`}
        />
      ) : (
        <img
          className="border border-white border-4 w-[150px] h-[150px] rounded-full overflow-hidden"
          src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${petImage}`}
        />
      )}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              className="border border-white border-2 px-2 text-white py-1 rounded-full absolute top-0 right-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              사진 변경
              {/* {image ? (
                <img
                  className="w-full h-full"
                  src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                />
              ) : (
                <img className="w-[70px] h-[70px]" src="./images/camera1.svg" />
              )} */}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileFetchOne;
