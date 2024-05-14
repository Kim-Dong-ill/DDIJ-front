import React from "react";
import Header from "../components/Header";
import ButtonYe from "../components/ButtonYe";
import ButtonBl from "../components/ButtonBl";

function AppealWritePage() {
  return (
    <>
      <div className="w-[450px] m-auto px-5 pb-[80px] pt-[150px]">
        <div className="mb-[10px] flex">
          <img src="/images/addPhotoicon.svg" alt="" className="m-auto mb-5" />
          <img
            src="/images/dog1.svg"
            alt=""
            className="m-auto mb-5 w-[87px] h-[86px] rounded-lg"
          />
          <img
            src="/images/dog2.svg"
            alt=""
            className="m-auto mb-5 w-[87px] h-[86px] rounded-lg"
          />
          <img
            src="/images/dog1.svg"
            alt=""
            className="m-auto mb-5 w-[87px] h-[86px] rounded-lg"
          />
          {/* 여기에 온클릭으로 사진 추가할 수 있게끔 기능구현해야함 */}
        </div>

        <textarea
          className="w-full nanum h-[450px] px-[10px] border-b-2 rounded-[10px] resize-none mb-7"
          placeholder="내용을 입력하세요."
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
    </>
  );
}

// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus exercitationem alias, debitis similique velit odio amet, incidunt, ut ipsa iste deserunt earum culpa tempora distinctio soluta! Iusto dignissimos iste voluptatibus dicta, ducimus quae perferendis labore totam fugiat cum tempore excepturi laborum tenetur et recusandae laboriosam veritatis doloribus alias, natus aliquam animi. Libero ducimus obcaecati tempore dolorum mollitia incidunt sequi officia doloribus labore fuga quod, at nisi nulla soluta odio debitis modi numquam? Rem dolores quos delectus voluptatem maiores eius ex quisquam, temporibus, cupiditate aliquam mollitia libero. Vel, quod corrupti. Distinctio impedit, quae architecto nemo velit animi sed! Molestiae, suscipit?

export default AppealWritePage;
