import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";

function AllCCListPage({}) {
  const [tempArray, setTempArray] = useState([]);
  const userLocation = useSelector((state) => {
    console.log(state);
    return [
      state.user.userData.user.location.coordinates[0],
      state.user.userData.user.location.coordinates[1],
    ];
  });
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  const [FLAG, setFLAG] = useState(0); // 0->전체목록, 1-> 내목록
  // -> 이미지 매칭시키기, 약속시간 형식수정하기, 출발장소 띄워주기, 현재 인원수 총인원수 계산해서 띄워주기, 내모임,시간순,거리순 반응하기
  const [AllCircleData, setAllCircleData] = useState([]);
  const [UserCircleData, setUserCircleData] = useState([]);
  const [AllCircleByDate, setAllCircleByDate] = useState([]);
  const [AllCircleByDist, setAllCircleByDist] = useState([]);
  const [UserCircleByDate, setUserCircleByDate] = useState([]);
  const [UserCircleByDist, setUserCircleByDist] = useState([]);

  const [ViewData, setViewData] = useState([
    {
      name: " ",
      startTime: " ",
    },
  ]);

  useEffect(() => {
    const loadCCList = async () => {
      try {
        const userId = loginState;
        console.log(userId);
        const res = await axiosInstance.get(`/circles/${userId}`);
        const body = {
          userLocation: userLocation,
        };
        const sortRes = await axiosInstance.post(
          `/circles/${loginState}`,
          body
        );

        setAllCircleData(res.data.allCircles);
        setUserCircleData(res.data.userCircles);
        setAllCircleByDate(sortRes.data.byDate);
        setAllCircleByDist(sortRes.data.byDist);
        setUserCircleByDate(sortRes.data.userByDate);
        setUserCircleByDist(sortRes.data.userByDist);
        setViewData(res.data.allCircles);
      } catch (error) {}
    };
    loadCCList();
  }, [loginState]);

  //=============버튼클릭 핸들러=====================
  const AllButtonClick = () => {
    setViewData(AllCircleData);
    setFLAG(0);
  };

  const UserButtonClick = () => {
    setViewData(UserCircleData);
    setFLAG(1);
  };

  // realignment
  return (
    <div className="pt-[90px] pb-[90px] bg-white border-[1px] min-h-screen">
      {/* 상단버튼section start */}
      <div className=" flex justify-between mb-[25px]">
        <button
          className=" w-1/2  border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 "
          onClick={AllButtonClick}
        >
          전체
        </button>
        <button
          className="w-1/2 border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800"
          onClick={UserButtonClick}
        >
          내가 참여 할 모임
        </button>
      </div>
      <div className="flex flex-col items-center ">
        <div className="w-[400px] flex justify-start mb-[10px] gap-[10px]">
          <button
            className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-200"
            onClick={
              FLAG === 0
                ? () => setViewData(AllCircleData)
                : () => setViewData(UserCircleData)
            }
          >
            <img
              src="/images/icon_filter.svg"
              className="w-[15px] h-[15px] mr-[3px]"
            />
            <span className="text-[15px]">전체보기</span>
          </button>
          <button
            className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-100"
            onClick={
              FLAG === 0
                ? () => setViewData(AllCircleByDate)
                : () => setViewData(UserCircleByDate)
            }
          >
            <img
              src="/images/icon_alarm.svg"
              className="w-[17px] h-[17px] mt-[3px] mr-[3px]"
            />
            <span className="text-[15px]">시간순</span>
          </button>
          <button
            className="flex items-center rounded-[10px] h-[27px] p-[5px] border border-da-100"
            onClick={
              FLAG === 0
                ? () => setViewData(AllCircleByDist)
                : () => setViewData(UserCircleByDist)
            }
          >
            <img
              src="/images/icon_flag.svg"
              className="w-[17px] h-[17px] mt-[3px] mr-[3px]"
            />
            <span className="text-[15px]">거리순</span>
          </button>
        </div>
        <div className="w-[500px] px-[18px] flex justify-between">
          <div className="w-[100%] flex flex-col items-center">
            {ViewData.map((item, idx) => {
              const rest = idx % 2;
              const cardClassName = item.complete
                  ? "w-[400px] h-auto bg-gray-400 mb-[20px] rounded-lg px-[12px] py-[10px] opacity-50"
                  : "w-[400px] h-auto bg-ye-300 mb-[20px] rounded-lg px-[12px] py-[10px]";

              return (
                  <>
                    {rest === 0 ? (
                        <Link
                            to={`/circles/${item._id}`}
                            state={{ item }}
                            key={item._id}
                        >
                          <div className={cardClassName}>
                            <p className="text-right nanumBold text-xs">
                              {item.nowUser}/{item.peoples}
                            </p>
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
                                {item.DateData} {item.TimeData}
                              </span>
                                </div>
                                <div className="flex gap-[7px]">
                                  <p className="nanum text-sm whitespace-nowrap">
                                    출발장소{" "}
                                  </p>
                                  <span className="text-da-200 nanum text-[13px]">
                                {item.startAdd}
                              </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                    ) : (
                        <Link
                            to={`/circles/${item._id}`}
                            state={{ item }}
                            key={item._id}
                        >
                          <div className={cardClassName}>
                            <p className="text-right nanumBold text-xs">
                              {item.nowUser}/{item.peoples}
                            </p>
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
                                {item.DateData} {item.TimeData}
                              </span>
                                </div>
                                <div className="flex gap-[7px]">
                                  <p className="nanum text-sm whitespace-nowrap">
                                    출발장소{" "}
                                  </p>
                                  <span className="text-da-200 nanum text-[13px]">
                                {item.startAdd}
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
        {ViewData.length === 0 && (
          <div className="text-center mt-[250px]">
            <p>근처에 생성된 모임이 없습니다..🥲</p>
            <Link to="/newcircle">
              <div className="text-center text-lg cursor-pointer bg-ye-700 rounded-[10px] py-[5px]">
                ❤️🥰 모임 만들러 가기 😎❤️
              </div>
            </Link>
          </div>
        )}
        {/* <div className="w-[10%]">
          <img src="/images/filter.svg" className="" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default AllCCListPage;
