import React, { useState,useEffect } from "react";
import { Link,useParams} from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";

function AllCCListPage({}) {
  const [tempArray, setTempArray] = useState([]);
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });

  // -> 이미지 매칭시키기, 약속시간 형식수정하기, 출발장소 띄워주기, 현재 인원수 총인원수 계산해서 띄워주기, 내모임,시간순,거리순 반응하기
  const [AllCircleData, setAllCircleData] = useState([]);
  const [ViewData, setViewData] = useState([{
    name: " ",
    startTime : " "
  }]);
  const [UserCircleData, setUserCircleData] = useState([])

  useEffect(() => {
    const loadCCList = async () => {
      try {
        const res = await axiosInstance.get(`/circles/${loginState}`)
        const body ={

        }
        const resByData = await axiosInstance.post(`/circles/${loginState}`,body)
        console.log("cclist입니다=>>>>>>", res.data.allCircles);
        setAllCircleData(res.data.allCircles);
        setUserCircleData(res.data.userCircles)
        setViewData(res.data.allCircles)
      } catch (error) {}
    };
    loadCCList();
  }, [loginState]);
  // realignment
  return (
    <div className="pt-[90px] pb-[100px] bg-white border-[1px] ">
      {/* 상단버튼section start */}
      <div className=" flex justify-between mb-[25px]">
        <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 "
          onClick={() => setViewData(AllCircleData)}
        >
          전체
        </button>
        <button
          className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800"
          onClick={() => setViewData(UserCircleData)}
        >
          내가 참여 할 모임
        </button>
      </div>
      <div className="flex flex-col items-center ">
        <div className="w-[400px] flex justify-start mb-[10px] gap-[10px]">
          <button className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-200"
                  onClick={ViewData===AllCircleData ? ()=>setViewData(AllCircleData) : ()=>setViewData(UserCircleData)}          >
            <img
              src="/images/icon_filter.svg"
              className="w-[15px] h-[15px] mr-[3px]"
            />
            <span className="text-[15px]">전체보기</span>
          </button>
          <button className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-100">
            <img
              src="/images/icon_alarm.svg"
              className="w-[17px] h-[17px] mt-[3px] mr-[3px]"
            />
            <span className="text-[15px]">시간순</span>
          </button>
          <button className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-100">
            <img
              src="/images/icon_flag.svg"
              className="w-[17px] h-[17px] mt-[3px] mr-[3px]"
            />
            <span className="text-[15px]">거리순</span>
          </button>
        </div>
        버튼 3{/* 모임 리스트 - map돌릴구간 */}
        <div className="w-[500px] px-[18px] flex justify-between">
          <div className="w-[100%] flex flex-col items-center">
            {ViewData.map((item, idx) => {
              const rest = idx % 2;
              return (
                <>
                  {rest === 0 ? (
                    <Link to="/circles/:circleid">
                      <div className="w-[400px] h-auto bg-ye-300 mb-[20px] rounded-lg px-[12px] py-[10px]">
                        <p className="text-right nanumBold text-xs">3/5</p>
                        <div className="flex gap-3 items-center">
                          <div className="w-[80px] h-[80px] bg-slate-400 rounded-[50px] flex-shrink-0 mr-[5px] text-center">
                            <img
                              src="/images/dog4.svg"
                              className="w-[80px] h-[80px] rounded-full m-auto inline-block"
                            />
                          </div>
                          <div>
                            <p className="nanumBold text-[16px] mb-[5px]">
                              {item.name}
                            </p>
                            <div className="flex gap-[7px] ">
                              <p className="nanum text-sm whitespace-nowrap">
                                약속시간{" "}
                              </p>
                              <span className="text-da-200 nanum text-[13px]">
                                {item.startTime}
                              </span>
                            </div>
                            <div className="flex gap-[7px]">
                              <p className="nanum text-sm whitespace-nowrap">
                                출발장소{" "}
                              </p>
                              <span className="text-da-200 nanum text-[13px]">
                                {/*{item.startLoc}*/}
                                {/*{item.endLoc}*/}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/circles/:circleid">
                      <div className="w-[400px] h-auto bg-ye-200 mb-[20px] rounded-lg px-[12px] py-[10px]">
                        <p className="text-right nanumBold text-xs">3/5</p>  {/*user수를 구해와서 연산을붙여야함*/}
                        <div className="flex gap-3 items-center">
                          <div className="w-[80px] h-[80px] bg-slate-400 rounded-[50px] flex-shrink-0 mr-[5px] text-center">
                            <img
                              src="/images/dog5.svg"
                              className="w-[80px] h-[80px] rounded-full m-auto inline-block"
                            />
                          </div>
                          <div>
                            <p className="nanumBold text-[16px] mb-[5px]">
                              {item.name}
                            </p>
                            <div className="flex gap-[7px]">
                              <p className="nanum text-sm whitespace-nowrap">
                                약속시간{" "}
                              </p>
                              <span className="text-da-200 nanum text-[13px]">
                                {item.startTime}
                              </span>
                            </div>
                            <div className="flex gap-[7px]">
                              <p className="nanum text-sm whitespace-nowrap">
                                출발장소{" "}
                              </p>
                              <span className="text-da-200 nanum text-[13px]">
                                 {/*{item.startLoc}*/}
                                {/*{item.endLoc}*/}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              );
            })}
          </div>
        </div>
        {/* <div className="w-[10%]">
          <img src="/images/filter.svg" className="" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default AllCCListPage;
