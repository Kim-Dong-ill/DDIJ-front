import React, { useState } from "react";
import { Link } from "react-router-dom";

function AllCCListPage() {
  const [tempArray, setTempArray] = useState([]);
  const [ccData, setCcData] = useState([
    {
      title: "어서오시개",
      meetingTime: "19시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 0,
    },
    {
      title: "같이걸어여",
      meetingTime: "18시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 0,
    },
    {
      title: "가산쪽이신분",
      meetingTime: "20시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 1,
    },
    {
      title: "댕댕이산책가실분",
      meetingTime: "19시20분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 1,
    },
    {
      title: "같이걸어여",
      meetingTime: "18시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 1,
    },
    {
      title: "가산쪽이신분",
      meetingTime: "20시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 0,
    },
    {
      title: "어서오시개",
      meetingTime: "19시00분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 0,
    },
    {
      title: "댕댕이산책가실분",
      meetingTime: "19시20분",
      meetingLocation: "가산 디지털단지역 코드랩 아카데미 건물 앞",
      attend: 0,
    },
  ]);

  // function attendCCList(ccData) {
  //   let temp = [...ccData]
  //   return(

  //     {
  //       temp.attend == 1 ? <div>ok</div> : null;
  //     }
  //   )
  // }
  // const tempArray = []; // 복사 돼서 들어간다.
  // if (ccData[i].attend === 1) {
  //   tempArray.push(ccData[i]);
  //   setTempArray(tempArray);
  // }
  // }
  return (
    <div className="pt-[90px] pb-[100px] bg-white border-[1px] ">
      {/* 상단버튼section start */}
      <div className=" flex justify-between mb-[25px]">
        <button className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
          전체
        </button>
        <button
          className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800"
          // onClick={attendCCList}
        >
          내가 참여 할 모임
        </button>
      </div>
      {/* 상단버튼section end */}
      <div className="flex flex-col items-center ">
        <div className="w-[410px] flex justify-end mb-3">
          <img src="/images/filter.svg" className="" alt="" />
        </div>
        {/* 모임 리스트 - map돌릴구간 */}
        <div className="w-[500px] px-[18px] flex justify-between">
          <div className="w-[100%] flex flex-col items-center">
            {ccData.map((item, idx) => {
              const rest = idx % 2;
              return (
                <>
                  {rest === 0 ? (
                    <Link to="/circles/:circleid">
                      <div className="w-[410px] h-[110px] bg-ye-300 mb-[20px] rounded-lg pl-2 pt-1 pr-2 pb-2">
                        <p className="text-right nanumBold text-xs">3/5</p>
                        <div className="flex gap-3 items-center">
                          <div className="w-[75px] h-[75px] bg-slate-400 rounded-[50px] flex-shrink-0"></div>
                          <div>
                            <p className="text-lg">{item.title}</p>
                            <div className="flex gap-[3px]">
                              <p className="nanumBold text-sm whitespace-nowrap">
                                약속시간{" "}
                              </p>
                              <span className="text-da-200 nanum text-sm">
                                {item.meetingTime}
                              </span>
                            </div>
                            <div className="flex gap-[3px]">
                              <p className="nanumBold text-sm whitespace-nowrap">
                                출발장소{" "}
                              </p>
                              <span className="text-da-200 nanum text-sm">
                                {item.meetingLocation}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/circles/:circleid">
                      <div className="w-[410px] h-[110px] bg-ye-200 mb-[20px] rounded-lg pl-2 pt-1 pr-2 pb-2">
                        <p className="text-right nanumBold text-xs">3/5</p>
                        <div className="flex gap-3 items-center">
                          <div className="w-[75px] h-[75px] bg-slate-400 rounded-[50px] flex-shrink-0"></div>
                          <div>
                            <p className="text-lg">{item.title}</p>
                            <div className="flex gap-[3px]">
                              <p className="nanumBold text-sm whitespace-nowrap">
                                약속시간{" "}
                              </p>
                              <span className="text-da-200 nanum text-sm">
                                {item.meetingTime}
                              </span>
                            </div>
                            <div className="flex gap-[3px]">
                              <p className="nanumBold text-sm whitespace-nowrap">
                                출발장소{" "}
                              </p>
                              <span className="text-da-200 nanum text-sm">
                                {item.meetingLocation}
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
