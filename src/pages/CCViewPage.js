import React from "react";

function CCViewPage() {
  return (
    <>
      <div className="h-[100vh] bg-da-400">
        <div className="w-[500px] h-[255px] bg-slate-300"></div>
        <div className="text-white">
          <div className=" border m-5 rounded-lg">
            <div className="flex">
              <div className="w-[100px] h-[100px] bg-slate-500 rounded-[50px]"></div>
              <div>
                <div className="flex text-white ">
                  <p className="nanum">이름:&nbsp;</p>
                  <p className="nanum">봄</p>
                </div>
                <div className="flex text-white ">
                  <p className="nanum">나이:&nbsp;</p>
                  <p className="nanum">11살</p>
                </div>
                <div className="flex text-white items-center">
                  <p className="nanum">성별:&nbsp;</p>
                  <i class="fa-solid fa-mars"></i>
                </div>
                <div className="flex text-white ">
                  <p className="nanum">특이사항:&nbsp;</p>
                  <p className="nanum">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="nanum text-center">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CCViewPage;
