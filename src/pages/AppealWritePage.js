import React, { useState } from "react";
import Header from "../components/Header";
import ButtonYe from "../components/ButtonYe";
import ButtonBl from "../components/ButtonBl";
// import axiosInstance from "../utils/axios";
// import { useParams } from "react-router-dom";
import FileUpload from "../components/FileUpload";

function AppealWritePage() {
  // const { petid } = useParams();
  // const [appealData, setAppealData] = useState({
  //   text: "",
  //   // images:[]
  // });
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const body = {
  //     ...appealData,
  //   };
  //   try {
  //     await axiosInstance.post(`/appeal/${petid}`, body);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   console.log(value, name);
  //   setAppealData((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // }

  const [appealData, setAppealData] = useState({
    images: [],
  });

  // const { petid } = useParams();

  function handleImage(newImages) {
    setAppealData((prevState) => {
      return {
        ...prevState,
        images: newImages,
      };
    });
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="w-[450px] m-auto px-5 pb-[80px] pt-[150px]">
          <FileUpload images={appealData.images} onImageChange={handleImage} />

          <textarea
            className="w-full nanum h-[450px] px-[10px] border-b-2 rounded-[10px] resize-none mb-7"
            placeholder="내용을 입력하세요."
            type="text"
            name="text"
            // onChange={handleChange}
            // value={appealData.text}
          />
          <div className="flex justify-center h-[50px] gap-2 ">
            <ButtonYe>등록</ButtonYe>
            <ButtonBl>취소</ButtonBl>
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
