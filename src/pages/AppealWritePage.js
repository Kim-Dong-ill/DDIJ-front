import React from "react";
import Header from "../components/Header";

function AppealWritePage() {
  return (
    <>
      <div className="w-[450px] h-[700px] m-auto py-[15px] px-5 mb-3 ">
        <div className="mb-[10px]">
          <img src="/images/addPhotoicon.svg" alt="" className="m-auto mb-5" />
          {/* 여기에 온클릭으로 사진 추가할 수 있게끔 기능구현해야함 */}
          <input
            type="text"
            className="w-full nanum border-b-2 rounded-[50px] px-[10px] mb-1"
            placeholder="사진 파일이름..."
          />
          <input
            type="text"
            className="w-full nanum border-b-2 rounded-[50px] px-[10px] mb-1"
            placeholder="사진 파일이름..."
          />
          <input
            type="text"
            className="w-full nanum border-b-2 rounded-[50px] px-[10px]"
            placeholder="사진 파일이름..."
          />
        </div>
        <textarea
          className="w-full nanum h-[480px] px-[10px] border-b-2 rounded-[10px]"
          placeholder="내용을 입력하세요."
        />
      </div>
      <div className="flex justify-center  h-[50px] mb-[50px] gap-2 ">
        <button className=" w-[82px] h-[30px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
          등록
        </button>
        <button className=" w-[82px] h-[30px] text-[13px] text-center rounded-2xl bg-da-300 text-white hover:bg-ye-600 hover:text-da-300">
          취소
        </button>
      </div>
    </>
  );
}

// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus exercitationem alias, debitis similique velit odio amet, incidunt, ut ipsa iste deserunt earum culpa tempora distinctio soluta! Iusto dignissimos iste voluptatibus dicta, ducimus quae perferendis labore totam fugiat cum tempore excepturi laborum tenetur et recusandae laboriosam veritatis doloribus alias, natus aliquam animi. Libero ducimus obcaecati tempore dolorum mollitia incidunt sequi officia doloribus labore fuga quod, at nisi nulla soluta odio debitis modi numquam? Rem dolores quos delectus voluptatem maiores eius ex quisquam, temporibus, cupiditate aliquam mollitia libero. Vel, quod corrupti. Distinctio impedit, quae architecto nemo velit animi sed! Molestiae, suscipit?

export default AppealWritePage;
